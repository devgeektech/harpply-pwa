/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
import { successResponse } from '../../common/response/api-response';
import { NotFoundException } from '../../common/exceptions';
import type { Prisma } from '@prisma/client';
import { UpdateBasicDto } from './dto/update-basic.dto';
import { UpdateFaithLifestyleDto } from './dto/update-faith-lifestyle.dto';
import { UpdateFaithValuesDto } from './dto/update-faith-values.dto';
import { UpdateLifestyleDto } from './dto/update-lifestyle.dto';
import { ERROR_MESSAGES } from '../../common/constants/error-messages';
import { SUCCESS_MESSAGES } from '../../common/constants/success-messages';
import { decodeEmailSafe } from '../../common/utils/email-encode';
import { AwsS3Service } from '../../common/aws-s3/aws-s3.service';

const PHOTO_MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_PHOTO_MIMES = ['image/jpeg', 'image/png', 'image/webp'];
const MIN_PHOTOS_REQUIRED = 3;

// `user.profilePhotos` is stored as an array of S3 object keys (strings).
// The web client then builds public URLs using your S3 public base URL.
export type ProfilePhotoKey = string;

const profileSelect = {
  id: true,
  email: true,
  fullName: true,
  age: true,
  gender: true,
  profilePhotos: true,
  latitude: true,
  longitude: true,
  location: true,
  locationEnabled: true,
  bio: true,
  denomination: true,
  churchInvolvement: true,
  yearsInFaith: true,
  churchAttendance: true,
  myFaithValues: true,
  partnerValues: true,
  smokingPreference: true,
  alcoholPreference: true,
  dietaryPreference: true,
  onboardingCompleted: true,
  createdAt: true,
} as const;

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly awsS3: AwsS3Service,
    private readonly config: ConfigService,
  ) { }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: profileSelect,
    });
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER.PROFILE_NOT_FOUND);
    }
    const data = user.email
      ? { ...user, email: decodeEmailSafe(user.email) }
      : user;
    return successResponse(SUCCESS_MESSAGES.PROFILE.PROFILE_RETRIEVED, { data });
  }

  async updateBasic(
    userId: string,
    dto: UpdateBasicDto,
  ) {
    const hasField =
      dto.fullName !== undefined ||
      dto.age !== undefined ||
      dto.location !== undefined ||
      dto.gender !== undefined ||
      dto.bio !== undefined;
    if (!hasField) {
      throw new BadRequestException(
        'Provide at least one field to update (fullName, age, location, gender, bio).',
      );
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        fullName: dto.fullName,
        age: dto.age,
        location: dto.location,
        gender: dto.gender,
        ...(dto.bio !== undefined && { bio: dto.bio }),
      },
    });

    return successResponse(SUCCESS_MESSAGES.PROFILE.PROFILE_UPDATED);
  }

  async updateFaithLifestyle(userId: string, dto: UpdateFaithLifestyleDto) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        denomination: dto.denomination,
        yearsInFaith: dto.yearsInFaith,
        churchInvolvement: dto.churchInvolvement,
        churchAttendance: dto.churchAttendance,
      },
    });
    return successResponse(SUCCESS_MESSAGES.PROFILE.FAITH_LIFESTYLE_UPDATED);
  }

  async updateFaithValues(userId: string, dto: UpdateFaithValuesDto) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        myFaithValues: dto.myFaithValues as Prisma.InputJsonValue | undefined,
        partnerValues: dto.partnerValues as Prisma.InputJsonValue | undefined,
      } as Prisma.UserUpdateInput,
    });
    return successResponse(SUCCESS_MESSAGES.PROFILE.FAITH_UPDATED);
  }

  async updateLifestyle(userId: string, dto: UpdateLifestyleDto) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        smokingPreference: dto.smokingPreference,
        alcoholPreference: dto.alcoholPreference,
        dietaryPreference: dto.dietaryPreference,
      } as Prisma.UserUpdateInput,
    });
    return successResponse(SUCCESS_MESSAGES.PROFILE.LIFESTYLE_UPDATED);
  }

  /** Get current user's profile photos (S3 keys + URLs). */
  async getPhotos(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { profilePhotos: true },
    });
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER.PROFILE_NOT_FOUND);
    }
    const photos = (user.profilePhotos as ProfilePhotoKey[] | null) ?? [];
    const meetsMinimum = photos.length >= MIN_PHOTOS_REQUIRED;
    return successResponse(SUCCESS_MESSAGES.PROFILE.PHOTOS_RETRIEVED, {
      data: { photos, meetsMinimum, minPhotosRequired: MIN_PHOTOS_REQUIRED },
    });
  }

  /** Upload one photo to S3 (bucket: profile-photos) and append to user's profilePhotos. */
  async addPhoto(userId: string, file: Express.Multer.File): Promise<{ photos: string[] }> {
    const bucket = this.config.get<string>('AWS_S3_BUCKET_PROFILE_PHOTOS');
    if (!this.awsS3.isConfigured() || !bucket) {
      throw new BadRequestException(ERROR_MESSAGES.PHOTOS.UPLOAD_FAILED);
    }
    if (!file?.buffer) {
      throw new BadRequestException(ERROR_MESSAGES.PHOTOS.UPLOAD_FAILED);
    }
    if (!ALLOWED_PHOTO_MIMES.includes(file.mimetype)) {
      throw new BadRequestException(ERROR_MESSAGES.PHOTOS.INVALID_FILE_TYPE);
    }
    if (file.size > PHOTO_MAX_SIZE_BYTES) {
      throw new BadRequestException(ERROR_MESSAGES.PHOTOS.FILE_TOO_LARGE);
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { profilePhotos: true },
    });
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER.PROFILE_NOT_FOUND);
    }
    console.log('file==>>', file)
    const keyPrefix = this.config.get<string>('AWS_S3_KEY_PREFIX_PROFILE_PHOTOS') ?? 'profile-photos';
    const ext = file.mimetype === 'image/png' ? 'png' : file.mimetype === 'image/webp' ? 'webp' : 'jpg';
    const key = `${keyPrefix}/${userId}/${Date.now()}.${ext}`;

    const publicBaseUrl = this.config.get<string>('AWS_S3_PUBLIC_URL_PROFILE_PHOTOS') ?? null;
    const { key: uploadedKey, url } = await this.awsS3.upload(
      bucket,
      key,
      file.buffer,
      file.mimetype,
      { publicBaseUrl },
    );
    console.log('===>>>', uploadedKey)
    console.log('===>>>url', url)
    const current = (user.profilePhotos as string[] | null) ?? [];
    const updated: string[] = [...current, uploadedKey];

    await this.prisma.user.update({
      where: { id: userId },
      data: { profilePhotos: updated as Prisma.InputJsonValue },
    });

    return {
      photos: updated,
    };
  }

  /** Delete photo by index (0-based) and remove from S3. */
  async deletePhoto(userId: string, index: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { profilePhotos: true },
    });
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER.PROFILE_NOT_FOUND);
    }
    const photos = (user.profilePhotos as ProfilePhotoKey[] | null) ?? [];
    if (index < 0 || index >= photos.length) {
      throw new BadRequestException(ERROR_MESSAGES.PHOTOS.PHOTO_NOT_FOUND);
    }

    const key = photos[index];
    const bucket = this.config.get<string>('AWS_S3_BUCKET_PROFILE_PHOTOS');
    if (this.awsS3.isConfigured() && bucket) {
      await this.awsS3.delete(bucket, key);
    }
    const updated = photos.filter((_, i) => i !== index);
    await this.prisma.user.update({
      where: { id: userId },
      data: { profilePhotos: updated as Prisma.InputJsonValue },
    });

    return successResponse(SUCCESS_MESSAGES.PROFILE.PHOTO_DELETED, {
      data: { photos: updated, meetsMinimum: updated.length >= MIN_PHOTOS_REQUIRED },
    });
  }

  /** Permanently delete user + all profile photo objects in S3. */
  async deleteAccount(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { profilePhotos: true },
    });
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER.PROFILE_NOT_FOUND);
    }

    const photos = (user.profilePhotos as ProfilePhotoKey[] | null) ?? [];
    const bucket = this.config.get<string>('AWS_S3_BUCKET_PROFILE_PHOTOS');
    if (photos.length > 0 && this.awsS3.isConfigured() && bucket) {
      await Promise.allSettled(
        photos.map((key) => this.awsS3.delete(bucket, key)),
      );
    }

    await this.prisma.user.delete({ where: { id: userId } });

    return successResponse('Account deleted successfully.');
  }
}
