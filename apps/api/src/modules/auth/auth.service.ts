import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../prisma/prisma.service';
import { RegisterEmailDto } from './dto/register-email.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { SignInDto } from './dto/sign-in.dto';
import {
  ConflictException,
  UnauthorizedException,
} from '../../common/exceptions';
import { ERROR_MESSAGES } from '../../common/constants/error-messages';
import { encodeEmail, decodeEmail, decodeEmailSafe } from '../../common/utils/email-encode';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { randomUUID } from 'crypto';
import type { Prisma } from '@prisma/client';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SUCCESS_MESSAGES } from '../../common/constants/success-messages';
import { successResponse } from '../../common/response/api-response';
import { OnboardingService } from './onboarding.service';
import { BrevoEmailService } from '../../common/email/brevo-email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly onboardingService: OnboardingService,
    private readonly brevoEmailService: BrevoEmailService,
  ) { }

  /** Step 1: Register email only. User must call set-password to complete signup. */
  async registerEmail(dto: RegisterEmailDto) {
    const emailEncoded = encodeEmail(dto.email);
    const existingUser = await this.prisma.user.findUnique({
      where: { email: emailEncoded },
      select: { email: true, password: true, emailVerified: true },
    });
    const emailVerificationToken = randomUUID();
    if (existingUser) {
      if (existingUser.emailVerified && existingUser.password == null) {
        return successResponse(
          SUCCESS_MESSAGES.AUTH.COMPLETE_SIGNUP_SET_PASSWORD,
          {
            statusCode: 200,
            data: { email: dto.email, requiresPassword: true },
          },
        );
      }
      if (existingUser.password != null) {
        throw new ConflictException(ERROR_MESSAGES.AUTH.EMAIL_ALREADY_EXISTS);
      }

      if (existingUser && existingUser.emailVerified && existingUser.password) {
        throw new ConflictException(
          ERROR_MESSAGES.AUTH.EMAIL_REGISTERED_VERIFY_FIRST,
        );
      }
    } else {
      await this.prisma.user.create({
        data: {
          email: emailEncoded,
          password: null,
          emailVerified: false,
          emailVerificationToken,
        },
      });
    }

    // Fire-and-forget verification email; do not block signup on failures.
    this.brevoEmailService
      .sendEmailVerificationLink(dto.email, emailVerificationToken)
      .catch(() => undefined);

    return successResponse(SUCCESS_MESSAGES.AUTH.EMAIL_REGISTERED, {
      statusCode: 201,
      data: { email: dto.email },
    });
  }

  /** Resend verification email. Does not reveal whether email exists (always 200 with generic/specific message). */
  async resendVerificationEmail(email: string) {
    const emailEncoded = encodeEmail(email);
    const user = await this.prisma.user.findUnique({
      where: { email: emailEncoded },
      select: {
        emailVerified: true,
        password: true,
        emailVerificationToken: true,
      },
    });

    if (!user) {
      return successResponse(SUCCESS_MESSAGES.AUTH.VERIFICATION_EMAIL_SENT, {
        data: { email },
      });
    }

    if (user.emailVerified) {
      return successResponse(SUCCESS_MESSAGES.AUTH.EMAIL_ALREADY_VERIFIED, {
        data: {
          email,
          requiresPassword: user.password == null,
        },
      });
    }

    const newToken = randomUUID();
    await this.prisma.user.update({
      where: { email: emailEncoded },
      data: { emailVerificationToken: newToken },
    });

    this.brevoEmailService
      .sendEmailVerificationLink(email, newToken)
      .catch(() => undefined);

    return successResponse(SUCCESS_MESSAGES.AUTH.VERIFICATION_EMAIL_SENT, {
      data: { email },
    });
  }

  /** Step 2: Set password (and optionally log in) for a user who registered email only. */
  async setPassword(dto: SetPasswordDto) {
    const { email, password, confirmPassword } = dto;

    if (password !== confirmPassword) {
      throw new BadRequestException(ERROR_MESSAGES.AUTH.PASSWORD_MISMATCH);
    }

    const emailEncoded = encodeEmail(email);
    const user = await this.prisma.user.findUnique({
      where: { email: emailEncoded },
      select: {
        id: true,
        email: true,
        password: true,
        createdAt: true,
        onboardingCompleted: true,
        emailVerified: true,
      },
    });

    if (!user || user.password != null) {
      throw new BadRequestException(ERROR_MESSAGES.AUTH.SIGNUP_NOT_PENDING);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    const emailDecoded = decodeEmail(user.email);
    const jti = randomUUID();
    const token = this.jwtService.sign({
      sub: user.id,
      email: emailDecoded,
      jti,
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { token: jti },
    });

    const { password: _p, ...rest } = user;
    const onboarding = await this.onboardingService.getOnboardingData(user.id);
    return successResponse(SUCCESS_MESSAGES.AUTH.REGISTER_SUCCESS, {
      statusCode: 200,
      data: {
        accessToken: token,
        user: { ...rest, email: emailDecoded },
        onboarding,
      },
    });
  }

  async signIn(dto: SignInDto) {
    const emailEncoded = encodeEmail(dto.email);
    const user = await this.prisma.user.findUnique({
      where: { email: emailEncoded },
      select: {
        id: true,
        email: true,
        password: true,
        createdAt: true,
        onboardingCompleted: true,
        emailVerified: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS,
      );
    }

    if (user.password == null) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.AUTH.COMPLETE_SIGNUP
      );
    }

    if (!user.emailVerified) {
      throw new UnauthorizedException(ERROR_MESSAGES.AUTH.EMAIL_NOT_VERIFIED);
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS,
      );
    }

    const emailDecoded = decodeEmail(user.email);
    const { password, ...rest } = user;
    const safeUser = { ...rest, email: emailDecoded };
    const jti = randomUUID();
    const token = this.jwtService.sign({
      sub: user.id,
      email: emailDecoded,
      jti,
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { token: jti },
    });

    const onboarding = await this.onboardingService.getOnboardingData(user.id);
    return successResponse(SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS, {
      data: { accessToken: token, user: safeUser, onboarding },
    });
  }

  async logout(jti: string, userId?: string) {
    if (jti) {
      await this.prisma.user.updateMany({
        where: { token: jti },
        data: { token: null },
      });
    } else if (userId) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { token: null },
      });
    }
    return successResponse(SUCCESS_MESSAGES.AUTH.LOGOUT_SUCCESS);
  }

  /** Forgot password: send verification email with link to set new password (same process as signup). */
  async forgotPassword(dto: ForgotPasswordDto) {
    const emailEncoded = encodeEmail(dto.email);
    const user = await this.prisma.user.findUnique({
      where: { email: emailEncoded },
      select: { id: true, password: true },
    });

    if (!user) {
      return successResponse(SUCCESS_MESSAGES.AUTH.FORGOT_PASSWORD_GENERIC, {
        data: { email: dto.email },
      });
    }

    if (user.password == null) {
      return successResponse(SUCCESS_MESSAGES.AUTH.FORGOT_PASSWORD_GENERIC, {
        data: { email: dto.email },
      });
    }

    const resetToken = randomUUID();
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.prisma.user.update({
      where: { email: emailEncoded },
      data: {
        resetToken,
        resetTokenExpires,
        resetOtp: null,
        resetOtpExpires: null,
      } as Prisma.UserUpdateInput,
    });

    this.brevoEmailService
      .sendPasswordResetLink(dto.email, resetToken)
      .catch(() => undefined);

    return successResponse(SUCCESS_MESSAGES.AUTH.FORGOT_PASSWORD_GENERIC, {
      data: { email: dto.email },
    });
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const emailEncoded = encodeEmail(dto.email);
    const user = await this.prisma.user.findUnique({
      where: { email: emailEncoded },
    });

    if (
      !user ||
      user.resetOtp !== dto.otp ||
      !user.resetOtpExpires ||
      user.resetOtpExpires < new Date()
    ) {
      throw new BadRequestException(ERROR_MESSAGES.AUTH.INVALID_OR_EXPIRED_OTP);
    }

    return successResponse(SUCCESS_MESSAGES.AUTH.OTP_VERIFIED);
  }

  /** Reset password by token (from email link) or by email (legacy). */
  async resetPassword(dto: ResetPasswordDto) {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException(ERROR_MESSAGES.AUTH.PASSWORD_MISMATCH);
    }
    if (!dto.token?.trim() && !dto.email?.trim()) {
      throw new BadRequestException(ERROR_MESSAGES.AUTH.EMAIL_MISSING);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    if (dto.token?.trim()) {
      const user = await this.prisma.user.findFirst({
        where: {
          resetToken: dto.token,
          resetTokenExpires: { gt: new Date() },
        },
      });
      if (!user) {
        throw new BadRequestException(ERROR_MESSAGES.AUTH.TOKEN_INVALID);
      }
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          token: null,
          resetToken: null,
          resetTokenExpires: null,
          resetOtp: null,
          resetOtpExpires: null,
        },
      });
      return successResponse(SUCCESS_MESSAGES.AUTH.PASSWORD_RESET_SUCCESS);
    }

    const emailEncoded = encodeEmail(dto.email!);
    const user = await this.prisma.user.findUnique({
      where: { email: emailEncoded },
    });
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGES.AUTH.USER_NOT_FOUND);
    }
    await this.prisma.user.update({
      where: { email: emailEncoded },
      data: {
        password: hashedPassword,
        token: null,
        resetOtp: null,
        resetOtpExpires: null,
      },
    });
    return successResponse(SUCCESS_MESSAGES.AUTH.PASSWORD_RESET_SUCCESS);
  }

  /** Validate reset token (from email link); returns email for pre-fill. */
  async validateResetToken(token: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: { gt: new Date() },
      },
      select: { email: true },
    });
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGES.AUTH.TOKEN_INVALID);
    }
    return successResponse(SUCCESS_MESSAGES.AUTH.EMAIL_VERIFIED, {
      data: { email: decodeEmailSafe(user.email) },
    });
  }

  /** Mark email as verified when user clicks link from Brevo. */
  async verifyEmailByToken(token: string) {
    const user = await this.prisma.user.findFirst({
      where: { emailVerificationToken: token },
    });

    if (!user) {
      throw new BadRequestException(ERROR_MESSAGES.AUTH.TOKEN_INVALID);
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerificationToken: null,
      },
    });

    return successResponse(SUCCESS_MESSAGES.AUTH.EMAIL_VERIFIED, {
      data: { email: decodeEmailSafe(user.email) },
    });
  }
}
