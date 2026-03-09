import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUserId } from '../auth/decorators/current-user.decorator';
import { ProfileService } from './profile.service';
import { UpdateBasicDto } from './dto/update-basic.dto';
import { UpdateFaithLifestyleDto } from './dto/update-faith-lifestyle.dto';
import { UpdateFaithValuesDto } from './dto/update-faith-values.dto';
import { UpdateLifestyleDto } from './dto/update-lifestyle.dto';

@ApiTags('Profile & Photos')
@Controller('profile')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Get my profile (view)' })
  getProfile(@CurrentUserId() userId: string) {
    return this.profileService.getProfile(userId);
  }

  @Patch('basic')
  @ApiOperation({ summary: 'Edit profile: basic info (name, age, location, gender, photo)' })
  updateBasic(
    @CurrentUserId() userId: string,
    @Body() dto: UpdateBasicDto,
  ) {
    return this.profileService.updateBasic(userId, dto);
  }

  @Patch('faith-lifestyle')
  @ApiOperation({ summary: 'Edit profile: faith & lifestyle (spiritual journey, church)' })
  updateFaithLifestyle(
    @CurrentUserId() userId: string,
    @Body() dto: UpdateFaithLifestyleDto,
  ) {
    return this.profileService.updateFaithLifestyle(userId, dto);
  }

  @Patch('faith-values')
  @ApiOperation({ summary: 'Edit profile: faith values & partner values' })
  updateFaithValues(
    @CurrentUserId() userId: string,
    @Body() dto: UpdateFaithValuesDto,
  ) {
    return this.profileService.updateFaithValues(userId, dto);
  }

  @Patch('lifestyle')
  @ApiOperation({ summary: 'Edit profile: lifestyle basics (smoking, alcohol, diet)' })
  updateLifestyle(
    @CurrentUserId() userId: string,
    @Body() dto: UpdateLifestyleDto,
  ) {
    return this.profileService.updateLifestyle(userId, dto);
  }
}
