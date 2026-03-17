import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterEmailDto } from './dto/register-email.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { IdentityDto } from './dto/identity.dto';
import { LocationDto } from './dto/location.dto';
import { StoryDto } from './dto/story.dto';
import { FaithLifestyleDto } from './dto/faith-lifestyle.dto';
import { InterestsDto } from './dto/interests.dto';
import { OnboardingService } from './onboarding.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUserId, CurrentUser } from './decorators/current-user.decorator';
import { AllowEmptyBody } from '../../common/decorators/allow-empty-body.decorator';
import { ACCESS_TOKEN_COOKIE, accessTokenCookieOptions } from './auth-cookie.constants';
import * as Express from 'express';
import { ConfigService } from '@nestjs/config';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly onboardingService: OnboardingService,
    private readonly config: ConfigService,
  ) {}


  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async registerEmail(@Body() dto: RegisterEmailDto) {
    return this.authService.registerEmail(dto);
  }

  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resend verification email for the given email' })
  async resendVerification(@Body() dto: ResendVerificationDto) {
    return this.authService.resendVerificationEmail(dto.email);
  }

  @Post('set-password')
  @HttpCode(HttpStatus.OK)
  async setPassword(
    @Body() dto: SetPasswordDto,
    @Res({ passthrough: true }) res: Express.Response,
  ) {
    const result = await this.authService.setPassword(dto);
    const token = result?.data?.accessToken;
    if (token) {
      res.cookie(ACCESS_TOKEN_COOKIE, token, accessTokenCookieOptions);
    }
     return result;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) res: Express.Response,
  ) {
    const result = await this.authService.signIn(dto);
    const token = result?.data?.accessToken;
    if (token) {
      res.cookie(ACCESS_TOKEN_COOKIE, token, accessTokenCookieOptions);
    }
    return result;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout – removes token from DB; clears HttpOnly cookie' })
  async logout(
    @CurrentUser('jti') jti: string,
    @CurrentUserId() userId: string,
    @Res({ passthrough: true }) res: Express.Response,
  ) {
    const result = await this.authService.logout(jti, userId);
    res.clearCookie(ACCESS_TOKEN_COOKIE, { path: '/' });
    return result;
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

  @Get('verify-email')
  @ApiOperation({
    summary:
      'Verify email from link in email (query token); redirects to set-password page',
  })
  async verifyEmailFromLink(
    @Query('token') token: string,
    @Res() res: Express.Response,
  ) {
    const setPasswordUrl =
      this.config.get<string>('FRONTEND_SET_PASSWORD_URL') ??
      'https://app.harpply.com/auth/set-password';
    try {
      await this.authService.verifyEmailByToken(token);
      return res.redirect(302, setPasswordUrl);
    } catch {
      return res.redirect(302, `${setPasswordUrl}?error=invalid_token`);
    }
  }

  @Get('verify-email/:token')
  @ApiOperation({ summary: 'Verify email (path token); returns JSON' })
  async verifyEmail(@Param('token') token: string) {
    return this.authService.verifyEmailByToken(token);
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

  @Get('onboarding/review')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get onboarding review data' })
  getOnboardingReview(@CurrentUserId() userId: string) {
    return this.onboardingService.getOnboardingReview(userId);
  }

  @Post('onboarding/complete')
  @AllowEmptyBody()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Complete onboarding – auth by token, update user by decoded sub' })
  async completeOnboarding(@CurrentUserId() userId: string) {
    return this.onboardingService.completeOnboarding(userId);
  }

}
