import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/request/sign-up.dto';
import { SignInDto } from './dto/request/sign-in.dto';
import { ForgotPasswordDto } from './dto/request/forgot-password.dto';
import { VerifyOtpDto } from './dto/request/verify-otp.dto';
import { ResetPasswordDto } from './dto/request/reset-password.dto';
import { IdentityDto } from './dto/request/Identity.dto';
import { LocationDto } from './dto/request/location.dto';
import { StoryDto } from './dto/request/story.dto';
import { FaithLifestyleDto } from './dto/request/faith-lifestyle.dto';
import { InterestsDto } from './dto/request/interests.dto';
import { OnboardingService } from './onboarding.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUserId, CurrentUser } from './decorators/current-user.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly onboardingService: OnboardingService,
  ) { }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout – removes token from DB; client should discard it' })
  async logout(
    @CurrentUser('jti') jti: string,
    @CurrentUserId() userId: string,
  ) {
    return this.authService.logout(jti, userId);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Post('onboarding/identity')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Save identity – auth by token, update user by decoded sub' })
  async saveIdentity(
    @CurrentUserId() userId: string,
    @Body() dto: IdentityDto,
  ) {
    return this.onboardingService.saveIdentity(userId, dto);
  }

  @Post('onboarding/location')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Save location – auth by token, update user by decoded sub' })
  async saveLocation(
    @CurrentUserId() userId: string,
    @Body() dto: LocationDto,
  ) {
    return this.onboardingService.saveLocation(userId, dto);
  }

  @Post('onboarding/story')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Save story – auth by token, update user by decoded sub' })
  async saveStory(
    @CurrentUserId() userId: string,
    @Body() dto: StoryDto,
  ) {
    return this.onboardingService.saveStory(userId, dto);
  }

  @Post('onboarding/faith-lifestyle')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Save faith & lifestyle – auth by token, update user by decoded sub' })
  async saveFaithLifestyle(
    @CurrentUserId() userId: string,
    @Body() dto: FaithLifestyleDto,
  ) {
    return this.onboardingService.saveFaithLifestyle(userId, dto);
  }

  @Post('onboarding/interests')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Save interests – auth by token, update user by decoded sub' })
  async saveInterests(
    @CurrentUserId() userId: string,
    @Body() dto: InterestsDto,
  ) {
    return this.onboardingService.saveInterests(userId, dto);
  }

  @Post('onboarding/complete')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Complete onboarding – auth by token, update user by decoded sub' })
  async completeOnboarding(@CurrentUserId() userId: string) {
    return this.onboardingService.completeOnboarding(userId);
  }

}