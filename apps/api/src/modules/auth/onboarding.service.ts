import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../../../prisma/prisma.service';
import { IdentityDto } from './dto/identity.dto';
import type { Prisma } from '@prisma/client';
import { LocationDto } from './dto/location.dto';
import { StoryDto } from './dto/story.dto';
import { FaithLifestyleDto } from './dto/faith-lifestyle.dto';
import { InterestsDto } from './dto/interests.dto';
import { successResponse } from '../../common/response/api-response';
import { SUCCESS_MESSAGES } from "src/common/constants/success-messages";
import { ERROR_MESSAGES } from "src/common/constants/error-messages";

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
        locationEnabled: dto.locationEnabled,
      } as Prisma.UserUpdateInput,
    });
    return successResponse(SUCCESS_MESSAGES.ONBOARDING.LOCATION);
  }

  async saveStory(userId: string, dto: StoryDto) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        bio: dto.bio
      } as Prisma.UserUpdateInput,
    });
    return successResponse(SUCCESS_MESSAGES.ONBOARDING.STORY);
  }

  async saveFaithLifestyle(userId: string, dto: FaithLifestyleDto) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        churchInvolvement: dto.myFaith ?? dto.churchInvolvement,
        yearsInFaith: dto.yearsInFaith,
        churchAttendance: dto.churchAttendance,
        exercise: dto.exercise,
        lifestyleSmoking: dto.lifestyleSmoking,
        lifestyleDrinking: dto.lifestyleDrinking,
        lifestylePartying: dto.lifestylePartying,
        dietaryPreference: dto.dietaryPreference,
      } as Prisma.UserUpdateInput,
    });
    return successResponse(SUCCESS_MESSAGES.ONBOARDING.FAITH_LIFESTYLE);
  }

  async saveInterests(userId: string, dto: InterestsDto) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        interests: dto.interests as Prisma.InputJsonValue,
      } as Prisma.UserUpdateInput,
    });
    return successResponse(SUCCESS_MESSAGES.ONBOARDING.INTEREST);
  }

  async completeOnboarding(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { onboardingCompleted: true } as Prisma.UserUpdateInput,
    });
    return successResponse(SUCCESS_MESSAGES.ONBOARDING.ONBOARDING_COMPLETED);
  }

  async getOnboardingReview(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        fullName: true,
        age: true,
        location: true,
        profilePhoto: true,
        bio: true,

        churchInvolvement: true,
        yearsInFaith: true,
        churchAttendance: true,

        myFaithValues: true,
        partnerValues: true,

        lifestyleSmoking: true,
        lifestyleDrinking: true,
        lifestylePartying: true,
        dietaryPreference: true,
      },
    });

    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER.USER_NOT_FOUND);
    }

    return successResponse(SUCCESS_MESSAGES.ONBOARDING.REVIEW_DATA, {
      data: user,
    });
  }
}
