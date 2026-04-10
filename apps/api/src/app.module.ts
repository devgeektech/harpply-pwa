import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { PrismaService } from '../prisma/prisma.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { NotEmptyBodyGuard } from './common/guards/not-empty-body.guard';
import { NotEmptyBodyMiddleware } from './common/middleware/not-empty-body.middleware';
import { AwsS3Module } from './common/aws-s3/aws-s3.module';
import { AwsRekognitionModule } from './common/aws-rekognition/aws-rekognition.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // Load apps/api/.env when running from monorepo root (pnpm dev)
      envFilePath: [
        join(process.cwd(), 'apps/api/.env'),
        join(process.cwd(), '.env'),
        '.env',
      ],
    }),
    AwsS3Module,
    AwsRekognitionModule,
    AuthModule,
    ProfileModule,
    // ... other modules
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,

    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true,
          transform: true,
          forbidNonWhitelisted: true,
        }),
    },

    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },

    {
      provide: APP_GUARD,
      useClass: NotEmptyBodyGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NotEmptyBodyMiddleware).forRoutes('auth', 'profile');
  }
}
