/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IdentityDto } from './dto/identity.dto';
import type { Prisma } from '@prisma/client';
import { LocationDto } from './dto/location.dto';
import { StoryDto } from './dto/story.dto';
import { FaithLifestyleDto } from './dto/faith-lifestyle.dto';
import { successResponse } from '../../common/response/api-response';
import { SUCCESS_MESSAGES } from 'src/common/constants/success-messages';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import { AttributeDto } from './dto/attribute.dto';
import {
  EVERYDAY_LIFE_ALLOWED_ID_SET,
  EVERYDAY_LIFE_MULTI_MAX3_IDS,
} from './constants/everyday-life-questions';
import { EverydayLifeProfileDto } from './dto/everyday-life-profile.dto';

@Injectable()
export class OnboardingService {
  constructor(private readonly prisma: PrismaService) { }

  async saveIdentity(userId: string, dto: IdentityDto) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        fullName: dto.fullName,
        age: dto.age,
        gender: dto.gender,
      } as Prisma.UserUpdateInput,
    });
    return successResponse(SUCCESS_MESSAGES.ONBOARDING.IDENTITY_SAVED);
  }

  async saveLocation(userId: string, dto: LocationDto) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        latitude: dto.latitude,
        longitude: dto.longitude,
        location: dto.location ?? null,
        locationEnabled: dto.locationEnabled,
      } as Prisma.UserUpdateInput,
    });
    return successResponse(SUCCESS_MESSAGES.ONBOARDING.LOCATION);
  }

  async saveStory(userId: string, dto: StoryDto) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        bio: dto.bio,
      } as Prisma.UserUpdateInput,
    });
    return successResponse(SUCCESS_MESSAGES.ONBOARDING.STORY);
  }

  async saveFaithLifestyle(userId: string, dto: FaithLifestyleDto) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        churchInvolvement: dto.churchInvolvement,
        yearsInFaith: dto.yearsInFaith,
        churchAttendance: dto.churchAttendance,
        smokingPreference: dto.smokingPreference,
        alcoholPreference: dto.alcoholPreference,
        dietaryPreference: dto.dietaryPreference,
      } as Prisma.UserUpdateInput,
    });
    return successResponse(SUCCESS_MESSAGES.ONBOARDING.FAITH_LIFESTYLE);
  }

  async saveMyFaithValues(userId: string, dto: AttributeDto) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        myFaithValues: dto.attribute as Prisma.InputJsonValue,
      } as Prisma.UserUpdateInput,
    });
    return successResponse(SUCCESS_MESSAGES.ONBOARDING.ATTRIBUTES);
  }

  async savePartnerValues(userId: string, dto: AttributeDto) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        partnerValues: dto.attribute as Prisma.InputJsonValue,
      } as Prisma.UserUpdateInput,
    });
    return successResponse(SUCCESS_MESSAGES.ONBOARDING.PARTNER_ATTRIBUTES);
  }

  private normalizeEverydayLifeAnswers(
    raw: Record<string, unknown>,
  ): Record<string, string[]> {
    const out: Record<string, string[]> = {};
    for (const key of Object.keys(raw)) {
      if (!EVERYDAY_LIFE_ALLOWED_ID_SET.has(key)) {
        throw new BadRequestException(
          ERROR_MESSAGES.VALIDATION.EVERYDAY_LIFE_INVALID,
        );
      }
      const val = raw[key];
      if (!Array.isArray(val)) {
        throw new BadRequestException(
          ERROR_MESSAGES.VALIDATION.EVERYDAY_LIFE_INVALID,
        );
      }
      const strings: string[] = [];
      for (const item of val) {
        if (typeof item !== 'string') {
          throw new BadRequestException(
            ERROR_MESSAGES.VALIDATION.EVERYDAY_LIFE_INVALID,
          );
        }
        const trimmed = item.trim();
        if (trimmed.length > 120) {
          throw new BadRequestException(
            ERROR_MESSAGES.VALIDATION.EVERYDAY_LIFE_INVALID,
          );
        }
        strings.push(trimmed);
      }
      const max = EVERYDAY_LIFE_MULTI_MAX3_IDS.has(key) ? 3 : 1;
      if (strings.length > max) {
        throw new BadRequestException(
          ERROR_MESSAGES.VALIDATION.EVERYDAY_LIFE_INVALID,
        );
      }
      const seen = new Set<string>();
      const deduped = strings.filter((s) => {
        if (seen.has(s)) return false;
        seen.add(s);
        return true;
      });
      out[key] = deduped;
    }
    return out;
  }

  async saveEverydayLife(userId: string, body: EverydayLifeProfileDto) {
    const normalized = this.normalizeEverydayLifeAnswers(
      body as Record<string, unknown>,
    );
    console.log("normalized >>>>>>>>>>> ", normalized);

    await this.prisma.user.update({
      where: { id: userId },
      data: normalized as Prisma.UserUpdateInput,
    });

    return successResponse(SUCCESS_MESSAGES.ONBOARDING.EVERYDAY_LIFE);
  }

  async completeOnboarding(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { onboardingCompleted: true } as Prisma.UserUpdateInput,
    });
    return successResponse(SUCCESS_MESSAGES.ONBOARDING.ONBOARDING_COMPLETED);
  }

  /** Select for all onboarding screens (identity, location, story, faith). */
  private readonly onboardingDataSelect = {
    fullName: true,
    age: true,
    gender: true,
    profilePhotos: true,
    latitude: true,
    longitude: true,
    location: true,
    locationEnabled: true,
    bio: true,
    churchInvolvement: true,
    yearsInFaith: true,
    churchAttendance: true,
    myFaithValues: true,
    partnerValues: true,
    smokingPreference: true,
    alcoholPreference: true,
    dietaryPreference: true,

    relationshipHistory: true,
    haveChildren: true,
    wantChildren: true,
    openToPartnerWithChildren: true,
    freeTime: true,
    musicTaste: true,
    sportsPlayOrFollow: true,
    fitnessLifestyle: true,
    recharge: true,
    communicationStyle: true,
    favoriteFood: true,
    travelerType: true,
    travelStyle: true,
    perfectNightIn: true,
    showsOrMovies: true,
    dayToDay: true,

  } as const;

  /**
   * Returns all onboarding screen values for pre-fill and review.
   * Used by GET onboarding/review and included in login/setPassword responses.
   */
  async getOnboardingData(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: this.onboardingDataSelect,
    });
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER.USER_NOT_FOUND);
    }
    return user;
  }

  async getOnboardingReview(userId: string) {
    const data = await this.getOnboardingData(userId);
    return successResponse(SUCCESS_MESSAGES.ONBOARDING.REVIEW_DATA, {
      data,
    });
  }
}
