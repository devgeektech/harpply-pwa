/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IdentityDto } from './dto/identity.dto';
import type { Prisma } from '@prisma/client';
import { LocationDto } from './dto/location.dto';
import { StoryDto } from './dto/story.dto';
import { FaithLifestyleDto } from './dto/faith-lifestyle.dto';
import { InterestsDto } from './dto/interests.dto';
import { successResponse } from '../../common/response/api-response';
import { SUCCESS_MESSAGES } from 'src/common/constants/success-messages';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import { AttributeDto } from './dto/attribute.dto';

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

  async saveInterests(userId: string, dto: InterestsDto) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        interests: dto.interests as Prisma.InputJsonValue,
      } as Prisma.UserUpdateInput,
    });
    return successResponse(SUCCESS_MESSAGES.ONBOARDING.INTEREST);
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

  async completeOnboarding(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { onboardingCompleted: true } as Prisma.UserUpdateInput,
    });
    return successResponse(SUCCESS_MESSAGES.ONBOARDING.ONBOARDING_COMPLETED);
  }

  /** Select for all onboarding screens (identity, location, story, faith, interests). */
  private readonly onboardingDataSelect = {
    fullName: true,
    age: true,
    gender: true,
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
    interests: true,
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
