import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { successResponse } from '../../common/response/api-response';
import { NotFoundException } from '../../common/exceptions';
import type { Prisma } from '@prisma/client';
import { UpdateBasicDto } from './dto/update-basic.dto';
import { UpdateFaithLifestyleDto } from './dto/update-faith-lifestyle.dto';
import { UpdateFaithValuesDto } from './dto/update-faith-values.dto';
import { UpdateLifestyleDto } from './dto/update-lifestyle.dto';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import { SUCCESS_MESSAGES } from 'src/common/constants/success-messages';

const profileSelect = {
  id: true,
  email: true,
  fullName: true,
  age: true,
  gender: true,
  profilePhoto: true,
  latitude: true,
  longitude: true,
  location: true,
  locationEnabled: true,
  bio: true,
  jobTitle: true,
  company: true,
  school: true,
  spiritualJourney: true,
  churchInvolvement: true,
  yearsInFaith: true,
  churchAttendance: true,
  myFaithValues: true,
  partnerValues: true,
  lifestyleSmoking: true,
  lifestyleDrinking: true,
  smokingPreference: true,
  alcoholPreference: true,
  dietaryPreference: true,
  exercise: true,
  interests: true,
  onboardingCompleted: true,
  createdAt: true,
} as const;

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) { }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: profileSelect,
    });
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER.PROFILE_NOT_FOUND);
    }
    return successResponse(SUCCESS_MESSAGES.PROFILE.PROFILE_RETRIEVED, { data: user });
  }

  async updateBasic(userId: string, dto: UpdateBasicDto) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        fullName: dto.fullName,
        age: dto.age,
        location: dto.location,
        gender: dto.gender,
        profilePhoto: dto.profilePhoto,
      } as Prisma.UserUpdateInput,
    });
    return successResponse(SUCCESS_MESSAGES.PROFILE.PROFILE_UPDATED);
  }

  async updateFaithLifestyle(userId: string, dto: UpdateFaithLifestyleDto) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        spiritualJourney: dto.denomination,
        yearsInFaith: dto.yearsInFaith,
        churchInvolvement: dto.churchInvolvement,
        churchAttendance: dto.churchAttendance,
      } as Prisma.UserUpdateInput,
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
}
