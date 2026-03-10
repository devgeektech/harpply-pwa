import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service'; // adjust path

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-very-secure-secret-1234567890', // ← use .env!
      signOptions: { expiresIn: '1d' }, // or '7d', '30m', etc.
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}