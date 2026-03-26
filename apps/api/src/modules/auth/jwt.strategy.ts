/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
import { Request } from 'express';
import { ACCESS_TOKEN_COOKIE } from './auth-cookie.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Prefer explicit Authorization header over cookies to avoid
        // cross-session leakage when multiple accounts are used in the same browser.
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: Request) => req?.cookies?.[ACCESS_TOKEN_COOKIE] ?? null,
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string; email: string; jti?: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { token: true },
    });

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    // Token with jti: must match stored token (current session)
    if (payload.jti) {
      if (user.token !== payload.jti) {
        throw new UnauthorizedException(
          'Token has been invalidated. Please log in again.',
        );
      }
    } else {
      // Legacy token (no jti): allow if user exists and has a token set (session exists)
      if (!user.token) {
        throw new UnauthorizedException(
          'Token is invalid or expired. Please log in again.',
        );
      }
    }

    return {
      sub: payload.sub,
      email: payload.email,
      jti: payload.jti ?? '',
    };
  }
}
