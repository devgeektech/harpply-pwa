import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from '../prisma/prisma.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// ← Import here
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    // ... other modules
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,

    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    },

    // Global exception filter
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}