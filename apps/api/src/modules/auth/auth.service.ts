import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../prisma/prisma.service';
import { SignUpDto } from './dto/request/sign-up.dto';
import { SignInDto } from './dto/request/sign-in.dto';
import {
  ConflictException,
  UnauthorizedException,
} from '../../common/exceptions';
import { ERROR_MESSAGES } from '../../common/constants/error-messages';
import { ForgotPasswordDto } from './dto/request/forgot-password.dto';
import { randomBytes } from 'crypto';
import type { Prisma } from '@prisma/client';
import { VerifyOtpDto } from './dto/request/verify-otp.dto';
import { ResetPasswordDto } from './dto/request/reset-password.dto';
import { SUCCESS_MESSAGES } from 'src/common/constants/success-messages';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async signUp(dto: SignUpDto) {
    const { email, password, confirmPassword } = dto;

    // Check password match
    if (password !== confirmPassword) {
      throw new BadRequestException(ERROR_MESSAGES.AUTH.PASSWORD_MISMATCH);
    }

    // Check existing user
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException(ERROR_MESSAGES.AUTH.EMAIL_ALREADY_EXISTS);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    // Generate JWT
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      message: SUCCESS_MESSAGES.AUTH.REGISTER_SUCCESS,
      accessToken: token,
      user,
    };
  }

  async signIn(dto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: { id: true, email: true, password: true, createdAt: true },
    });

    // Always use same error message
    if (!user) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS,
      );
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

    const { password, ...safeUser } = user;
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return { accessToken: token, user: safeUser };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      return { message: ERROR_MESSAGES.AUTH.USER_NOT_FOUND};
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Create secure reset token
    const resetToken = randomBytes(32).toString('hex');

    await this.prisma.user.update({
      where: { email: dto.email },
      data: {
        resetOtp: otp,
        resetOtpExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
        resetToken: resetToken,
        resetTokenExpires: new Date(Date.now() + 15 * 60 * 1000), // 15 mins
      } as Prisma.UserUpdateInput,
    });

    console.log('OTP:', otp);
    console.log('Reset Token:', resetToken);

    return {
      message: SUCCESS_MESSAGES.AUTH.OTP_SENT,
      otp,
      resetToken, // frontend will use this in next API
    };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (
      !user ||
      user.resetOtp !== dto.otp ||
      !user.resetOtpExpires ||
      user.resetOtpExpires < new Date()
    ) {
      throw new BadRequestException(ERROR_MESSAGES.AUTH.INVALID_OR_EXPIRED_OTP);
    }

    return { message: SUCCESS_MESSAGES.AUTH.OTP_VERIFIED };
  }

  async resetPassword(dto: ResetPasswordDto) {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException(  ERROR_MESSAGES.AUTH.PASSWORD_MISMATCH);
    }

    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new BadRequestException(ERROR_MESSAGES.AUTH.USER_NOT_FOUND);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    await this.prisma.user.update({
      where: { email: dto.email },
      data: {
        password: hashedPassword,
        resetOtp: null,
        resetOtpExpires: null,
      },
    });

    return { message: SUCCESS_MESSAGES.AUTH.PASSWORD_RESET_SUCCESS };
  }

}