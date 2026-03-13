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
import { encodeEmail, decodeEmail } from '../../common/utils/email-encode';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { randomBytes, randomUUID } from 'crypto';
import type { Prisma } from '@prisma/client';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SUCCESS_MESSAGES } from '../../common/constants/success-messages';
import { successResponse } from '../../common/response/api-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  /** Step 1: Register email only. User must call set-password to complete signup. */
  async registerEmail(dto: RegisterEmailDto) {
    const emailEncoded = encodeEmail(dto.email);

    const existingUser = await this.prisma.user.findUnique({
      where: { email: emailEncoded },
    });

    if (existingUser) {
      throw new ConflictException(ERROR_MESSAGES.AUTH.EMAIL_ALREADY_EXISTS);
    }

    await this.prisma.user.create({
      data: {
        email: emailEncoded,
        password: null,
      },
    });

    return successResponse(SUCCESS_MESSAGES.AUTH.EMAIL_REGISTERED, {
      statusCode: 201,
      data: { email: dto.email },
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
      select: { id: true, email: true, password: true, createdAt: true, onboardingCompleted: true },
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
    return successResponse(SUCCESS_MESSAGES.AUTH.REGISTER_SUCCESS, {
      statusCode: 200,
      data: {
        accessToken: token,
        user: { ...rest, email: emailDecoded },
      },
    });
  }

  async signIn(dto: SignInDto) {
    const emailEncoded = encodeEmail(dto.email);
    const user = await this.prisma.user.findUnique({
      where: { email: emailEncoded },
      select: { id: true, email: true, password: true, createdAt: true, onboardingCompleted: true },
    });

    if (!user) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS,
      );
    }

    if (user.password == null) {
      throw new UnauthorizedException(ERROR_MESSAGES.AUTH.COMPLETE_SIGNUP);
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

    return successResponse(SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS, {
      data: { accessToken: token, user: safeUser },
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

  async forgotPassword(dto: ForgotPasswordDto) {
    const emailEncoded = encodeEmail(dto.email);
    const user = await this.prisma.user.findUnique({
      where: { email: emailEncoded },
    });

    if (!user) {
      return successResponse(ERROR_MESSAGES.AUTH.USER_NOT_FOUND, {
        data: {},
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Create secure reset token
    const resetToken = randomBytes(32).toString('hex');

    await this.prisma.user.update({
      where: { email: emailEncoded },
      data: {
        resetOtp: otp,
        resetOtpExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
        resetToken: resetToken,
        resetTokenExpires: new Date(Date.now() + 15 * 60 * 1000), // 15 mins
      } as Prisma.UserUpdateInput,
    });

    console.log('OTP:', otp);
    console.log('Reset Token:', resetToken);

    return successResponse(SUCCESS_MESSAGES.AUTH.OTP_SENT, {
      data: { resetToken, otp },
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

  async resetPassword(dto: ResetPasswordDto) {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException(ERROR_MESSAGES.AUTH.PASSWORD_MISMATCH);
    }

    const emailEncoded = encodeEmail(dto.email);
    const user = await this.prisma.user.findUnique({
      where: { email: emailEncoded },
    });

    if (!user) {
      throw new BadRequestException(ERROR_MESSAGES.AUTH.USER_NOT_FOUND);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

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

}
