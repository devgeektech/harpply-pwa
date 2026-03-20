import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OnboardingService } from './onboarding.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { BrevoEmailService } from '../../common/email/brevo-email.service';
import { GoogleOauthExchangeStore } from './google-oauth-exchange.store';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-very-secure-secret-1234567890',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    OnboardingService,
    PrismaService,
    JwtStrategy,
    BrevoEmailService,
    GoogleOauthExchangeStore,
  ],
  exports: [AuthService, JwtModule, JwtStrategy],
})
export class AuthModule {}
