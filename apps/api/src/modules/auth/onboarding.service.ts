import { Injectable } from "@nestjs/common";
import { PrismaService } from '../../../prisma/prisma.service';
import { IdentityDto } from "./dto/request/Identity.dto";
import type { Prisma } from '@prisma/client';
import { LocationDto } from "./dto/request/location.dto";
import { StoryDto } from "./dto/request/story.dto";
import { FaithLifestyleDto } from "./dto/request/faith-lifestyle.dto";
import { InterestsDto } from "./dto/request/interests.dto";
import { successResponse } from '../../common/response/api-response';

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
    return successResponse('Identity saved successfully.');
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
    return successResponse('Location saved successfully.');
  }

  async saveStory(userId: string, dto: StoryDto) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        bio: dto.aboutMe,
        jobTitle: dto.jobTitle,
        company: dto.company,
        school: dto.school,
      } as Prisma.UserUpdateInput,
    });
    return successResponse('Story saved successfully.');
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
    return successResponse('Faith & lifestyle saved successfully.');
  }

  async saveInterests(userId: string, dto: InterestsDto) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        interests: dto.interests as Prisma.InputJsonValue,
      } as Prisma.UserUpdateInput,
    });
    return successResponse('Interests saved successfully.');
  }

  async completeOnboarding(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { onboardingCompleted: true } as Prisma.UserUpdateInput,
    });
    return successResponse('Onboarding completed successfully.');
  }
}