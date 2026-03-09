import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OnboardingService } from './onboarding.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-very-secure-secret-1234567890',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, OnboardingService, PrismaService,JwtStrategy],
  exports: [AuthService,JwtModule],
})
export class AuthModule {}