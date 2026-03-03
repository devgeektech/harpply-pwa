// apps/api/src/modules/auth/dto/request/sign-up.dto.ts

import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '@prisma/client';
import { ERROR_MESSAGES } from '../../../../common/constants/error-messages';

export class SignUpDto {
  @IsEmail(
    {},
    { message: ERROR_MESSAGES.VALIDATION.EMAIL_INVALID },
  )
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.EMAIL_REQUIRED })
  email: string;

  @IsString()
  @MinLength(8, { message: ERROR_MESSAGES.VALIDATION.PASSWORD_TOO_SHORT })
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.PASSWORD_REQUIRED })
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}