/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { OAuth2Client } from 'google-auth-library';

import { AuthService } from './auth.service';
import { GoogleOauthExchangeStore } from './google-oauth-exchange.store';
import { RegisterEmailDto } from './dto/register-email.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { AdminSignInDto } from './dto/admin-sign-in.dto';
import { AdminForgotPasswordDto } from './dto/admin-forgot-password.dto';
import { AdminChangePasswordDto } from './dto/admin-change-password.dto';
import { AdminChangePasswordAuthDto } from './dto/admin-change-password-auth.dto';
import { ChangePasswordAuthDto } from './dto/change-password-auth.dto';
import { IdentityDto } from './dto/identity.dto';
import { LocationDto } from './dto/location.dto';
import { StoryDto } from './dto/story.dto';
import { FaithLifestyleDto } from './dto/faith-lifestyle.dto';
import { OnboardingService } from './onboarding.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  CurrentUserId,
  CurrentUser,
} from './decorators/current-user.decorator';
import { AllowEmptyBody } from '../../common/decorators/allow-empty-body.decorator';
import {
  ACCESS_TOKEN_COOKIE,
  accessTokenCookieOptions,
} from './auth-cookie.constants';
import * as Express from 'express';
import { ConfigService } from '@nestjs/config';
import { successResponse } from '../../common/response/api-response';
import { AttributeDto } from './dto/attribute.dto';
import type  { EverydayLifeProfileDto } from './dto/everyday-life-profile.dto';
import { BiblicalPreferencesDto } from './dto/biblical-preferences.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly onboardingService: OnboardingService,
    private readonly config: ConfigService,
    private readonly googleOauthExchange: GoogleOauthExchangeStore,
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

  /** Redirect to sign-in after Google OAuth failure. In non-production, `reason` helps debug (check API logs too). */
  private googleSignInErrorRedirect(reason: string): string {
    const base = (
      this.config.get<string>('FRONTEND_APP_URL') ?? 'http://localhost:3000'
    ).replace(/\/$/, '');
    
    const q = new URLSearchParams({ error: 'google_signin_failed' });
    // Include `reason` so the frontend can show a friendly message.
    q.set('reason', reason);
    return `${base}/auth/signupemail?${q.toString()}`;
  }

  /** Google OAuth: same Client ID/Secret/Callback must be used for redirect and token exchange. */
  private getGoogleOAuthConfig(): {
    clientId: string;
    clientSecret: string;
    callbackUri: string;
  } | null {
    const clientId = this.config.get<string>('GOOGLE_CLIENT_ID')?.trim() ?? '';
    const clientSecret =
      this.config.get<string>('GOOGLE_CLIENT_SECRET')?.trim() ?? '';
    const callbackUri =
      this.config.get<string>('GOOGLE_CALLBACK_URI')?.trim() ?? '';
    if (!clientId || !clientSecret || !callbackUri) return null;
    return { clientId, clientSecret, callbackUri };
  }

  @Get('google/redirect')
  @ApiOperation({
    summary:
      'Redirect to Google OAuth (server-side flow); avoids Firebase handler',
  })
  async googleRedirect(
    @Query('returnTo') returnTo: string,
    @Req() req: Request,
    @Res() res: Express.Response,
  ) {
    const oauth = this.getGoogleOAuthConfig();
    console.log('oauth 151 ============ ', oauth);
    
    if (!oauth) {
      throw new BadRequestException(
        'Google OAuth not configured. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_CALLBACK_URI in apps/api/.env (same Web client for all three) and restart the API.',
      );
    }
    const { clientId: clientIdStr, callbackUri: callbackUriStr } = oauth;
    const safeReturnTo = this.sanitizeReturnTo(returnTo);
    const state = Buffer.from(
      JSON.stringify({ returnTo: safeReturnTo }),
      'utf8',
    ).toString('base64url');
    const params = new URLSearchParams({
      client_id: clientIdStr,
      redirect_uri: callbackUriStr,
      response_type: 'code',
      scope: 'openid email profile',
      state,
      access_type: 'offline',
      prompt: 'consent',
    });
    return res.redirect(
      302,
      `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
    );
  }

  @Get('google/callback')
  @ApiOperation({
    summary:
      'Google OAuth callback; exchanges code for session, redirects to frontend',
  })
  async googleCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Query('error') error: string,
    @Res() res: Express.Response,
  ) {
    if (error) {
      this.logger.warn(
        `Google callback: error from Google query param: ${error}`,
      );
      // Map common cancellation/denial values to a clearer reason so frontend
      // can show a friendly message.
      const cancelledErrorCodes = new Set([
        "access_denied",
        "user_cancelled",
        "popup_closed",
        "popup_closed_by_user",
        "cancelled",
        "consent_denied",
      ]);
      const reason = cancelledErrorCodes.has(error) ? "google_cancelled" : error;
      return res.redirect(
        302,
        this.googleSignInErrorRedirect(reason),
      );
    }
    if (!code || !state) {
      this.logger.warn('Google callback: missing code or state');
      return res.redirect(
        302,
        this.googleSignInErrorRedirect('missing_code_or_state'),
      );
    }

    let returnTo: string;
    try {
      const decoded = JSON.parse(
        Buffer.from(state, 'base64url').toString('utf8'),
      );
      returnTo = this.sanitizeReturnTo(decoded?.returnTo);
    } catch (e) {
      this.logger.warn('Google callback: invalid state', (e as Error)?.message);
      return res.redirect(302, this.googleSignInErrorRedirect('invalid_state'));
    }

    const oauth = this.getGoogleOAuthConfig();
    console.log('oauth 230 ========== ', oauth);
    
    if (!oauth) {
      this.logger.warn(
        'Google callback: missing GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, or GOOGLE_CALLBACK_URI',
      );
      return res.redirect(
        302,
        this.googleSignInErrorRedirect('oauth_not_configured'),
      );
    }
    const { clientId, clientSecret, callbackUri } = oauth;

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: callbackUri,
        grant_type: 'authorization_code',
      }),
    });
    if (!tokenRes.ok) {
      const body = await tokenRes.text();
      this.logger.warn(
        `Google callback: token exchange failed ${tokenRes.status}: ${body.slice(0, 200)}`,
      );
      return res.redirect(
        302,
        this.googleSignInErrorRedirect('token_exchange_failed'),
      );
    }
    const tokens = (await tokenRes.json()) as { id_token?: string };
    const idToken = tokens?.id_token;
    if (!idToken) {
      this.logger.warn('Google callback: no id_token in token response');
      return res.redirect(302, this.googleSignInErrorRedirect('no_id_token'));
    }

    let payload: {
      email?: string;
      name?: string;
      picture?: string;
      sub?: string;
    };
    try {
      const oauth2Client = new OAuth2Client(clientId);
      const ticket = await oauth2Client.verifyIdToken({
        idToken,
        audience: clientId,
      });
      payload = ticket.getPayload() ?? {};
    } catch (e) {
      this.logger.warn(
        'Google callback: verifyIdToken failed',
        (e as Error)?.message,
      );
      return res.redirect(
        302,
        this.googleSignInErrorRedirect('verify_id_token_failed'),
      );
    }
    if (!payload?.email || !payload?.sub) {
      this.logger.warn('Google callback: payload missing email or sub');
      return res.redirect(
        302,
        this.googleSignInErrorRedirect('missing_email_or_sub'),
      );
    }

    try {
      const result = await this.authService.googleLoginWithPayload({
        email: payload.email,
        name: payload.name ?? null,
        picture: payload.picture ?? null,
        sub: payload.sub,
      });
      const accessToken = result?.data?.accessToken;
      const onboardingCompleted =
        result?.data?.user?.onboardingCompleted ?? false;
      if (!accessToken) {
        this.logger.warn('Google callback: no accessToken in result');
        return res.redirect(
          302,
          this.googleSignInErrorRedirect('no_session_token'),
        );
      }
      const exchangeCode = this.googleOauthExchange.create(
        accessToken,
        onboardingCompleted,
      );
      const base = returnTo.replace(/#.*$/, '').replace(/\?$/, '');
      const sep = base.includes('?') ? '&' : '?';
      const target = `${base}${sep}exchange=${encodeURIComponent(exchangeCode)}`;
      return res.redirect(302, target);
    } catch (e) {
      this.logger.error(
        'Google callback: googleLoginWithPayload failed',
        (e as Error)?.stack ?? (e as Error)?.message,
      );
      const err = e as any;
      const reason =
        (typeof err?.response?.code === 'string' ? err.response.code : undefined) ??
        (typeof err?.response?.message === 'string'
          ? err.response.message
          : undefined) ??
        'login_with_payload_failed';
      return res.redirect(
        302,
        this.googleSignInErrorRedirect(String(reason)),
      );
    }
  }

  @Get('google/session')
  @ApiOperation({
    summary:
      'Exchange one-time code from Google redirect for access token (avoids URL fragment issues)',
  })
  googleSession(@Query('exchange') exchange: string) {
    const entry = this.googleOauthExchange.consume(exchange);
    if (!entry) {
      throw new UnauthorizedException(
        'Invalid or expired Google session. Try signing in again.',
      );
    }
    return successResponse('OK', {
      data: {
        accessToken: entry.accessToken,
        onboardingCompleted: entry.onboardingCompleted,
      },
    });
  }

  private sanitizeReturnTo(returnTo: string | undefined): string {
    const frontendUrl =
      this.config.get<string>('FRONTEND_APP_URL') ?? 'http://localhost:3000';
    const base = frontendUrl.replace(/\/$/, '');
    const allowedOrigins = new Set([
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://harpply.com',
      'https://www.harpply.com',
    ]);
    try {
      const baseOrigin = new URL(base).origin;
      allowedOrigins.add(baseOrigin);
    } catch {
      // ignore
    }
    if (!returnTo || typeof returnTo !== 'string') {
      return `${base}/auth/google/done`;
    }
    try {
      const u = new URL(returnTo);
      if (allowedOrigins.has(u.origin)) return returnTo;
    } catch {
      // ignore
    }
    return `${base}/auth/google/done`;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Logout – removes token from DB; clears HttpOnly cookie',
  })
  async logout(
    @CurrentUser('jti') jti: string,
    @CurrentUserId() userId: string,
    @Res({ passthrough: true }) res: Express.Response,
  ) {
    const result = await this.authService.logout(jti, userId);
    res.clearCookie(ACCESS_TOKEN_COOKIE, { path: '/' });
    return result;
  }

  @Post('admin/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin login' })
  async adminLogin(
    @Body() dto: AdminSignInDto,
    @Res({ passthrough: true }) res: Express.Response,
  ) {
    const result = await this.authService.adminLogin(dto.email, dto.password);
    const token = result?.data?.accessToken;
    if (token) {
      res.cookie(ACCESS_TOKEN_COOKIE, token, accessTokenCookieOptions);
    }
    return result;
  }

  @Post('admin/forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin forgot password (issues reset token)' })
  async adminForgotPassword(@Body() dto: AdminForgotPasswordDto) {
    return this.authService.adminForgotPassword(dto.email);
  }

  @Post('admin/change-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin change password using reset token' })
  async adminChangePassword(@Body() dto: AdminChangePasswordDto) {
    return this.authService.adminChangePassword(dto);
  }

  @Post('admin/change-password-auth')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin change password (authenticated)' })
  async adminChangePasswordAuth(
    @CurrentUserId() userId: string,
    @Body() dto: AdminChangePasswordAuthDto,
  ) {
    return this.authService.adminChangePasswordAuth(userId, dto);
  }

  @Post('admin/logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin logout' })
  async adminLogout(
    @CurrentUser('jti') jti: string,
    @CurrentUserId() userId: string,
    @Res({ passthrough: true }) res: Express.Response,
  ) {
    const result = await this.authService.adminLogout(jti, userId);
    res.clearCookie(ACCESS_TOKEN_COOKIE, { path: '/' });
    return result;
  }

  @Post('change-password-auth')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User change password (authenticated)' })
  async changePasswordAuth(
    @CurrentUserId() userId: string,
    @Body() dto: ChangePasswordAuthDto,
  ) {
    return this.authService.changePasswordAuth(userId, dto);
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

  @Get('verify-reset')
  @ApiOperation({
    summary:
      'Validate reset token from email link; redirects to frontend set-password page',
  })
  async verifyResetFromLink(
    @Query('token') token: string,
    @Res() res: Express.Response,
  ) {
    const resetPasswordUrl =
      this.config.get<string>('FRONTEND_RESET_PASSWORD_URL') ??
      this.config.get<string>('FRONTEND_APP_URL') ??
      'https://app.harpply.com';
    const setPasswordResetPath = '/auth/set-password-reset';
    const fullUrl = resetPasswordUrl.replace(/\/$/, '') + setPasswordResetPath;
    try {
      await this.authService.validateResetToken(token);
      return res.redirect(302, `${fullUrl}?token=${encodeURIComponent(token)}`);
    } catch {
      return res.redirect(302, `${fullUrl}?error=invalid_token`);
    }
  }

  @Get('validate-reset-token/:token')
  @ApiOperation({
    summary: 'Validate reset token; returns email for pre-fill (JSON)',
  })
  async validateResetToken(@Param('token') token: string) {
    return this.authService.validateResetToken(token);
  }

  @Post('onboarding/identity')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Save identity – auth by token, update user by decoded sub',
  })
  async saveIdentity(
    @CurrentUserId() userId: string,
    @Body() dto: IdentityDto,
  ) {
    return this.onboardingService.saveIdentity(userId, dto);
  }

  @Post('onboarding/location')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Save location – auth by token, update user by decoded sub',
  })
  async saveLocation(
    @CurrentUserId() userId: string,
    @Body() dto: LocationDto,
  ) {
    return this.onboardingService.saveLocation(userId, dto);
  }

  @Post('onboarding/story')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Save story – auth by token, update user by decoded sub',
  })
  async saveStory(@CurrentUserId() userId: string, @Body() dto: StoryDto) {
    return this.onboardingService.saveStory(userId, dto);
  }

  @Post('onboarding/faith-lifestyle')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Save faith & lifestyle – auth by token, update user by decoded sub',
  })
  async saveFaithLifestyle(
    @CurrentUserId() userId: string,
    @Body() dto: FaithLifestyleDto,
  ) {
    return this.onboardingService.saveFaithLifestyle(userId, dto);
  }

  @Post('onboarding/my-attributes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Save my-attributes – auth by token, update user by decoded sub',
  })
  async saveMyFaithValues(
    @CurrentUserId() userId: string,
    @Body() dto: AttributeDto,
  ) {
    return this.onboardingService.saveMyFaithValues(userId, dto);
  }

  @Post('onboarding/partner-attributes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Save partner-attributes – auth by token, update user by decoded sub',
  })
  async savePartnerValues(
    @CurrentUserId() userId: string,
    @Body() dto: AttributeDto,
  ) {
    return this.onboardingService.savePartnerValues(userId, dto);
  }

  @Post('onboarding/everyday-life')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Save or update everyday life profile answers – auth by token, update user by decoded sub',
  })
  async saveEverydayLife(
    @CurrentUserId() userId: string,
    @Body() body: EverydayLifeProfileDto,
  ) {
    return this.onboardingService.saveEverydayLife(userId, body);
  }

  @Post('onboarding/biblical-preferences')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Save biblical preferences quiz answers – auth by token, update user by decoded sub',
  })
  async saveBiblicalPreferences(
    @CurrentUserId() userId: string,
    @Body() dto: BiblicalPreferencesDto,
  ) {
    return this.onboardingService.saveBiblicalPreferences(userId, dto);
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
  @ApiOperation({
    summary: 'Complete onboarding – auth by token, update user by decoded sub',
  })
  async completeOnboarding(@CurrentUserId() userId: string) {
    return this.onboardingService.completeOnboarding(userId);
  }
}
