import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MulterModule.register({
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService],
  exports: [ProfileService],
})
export class ProfileModule {}
