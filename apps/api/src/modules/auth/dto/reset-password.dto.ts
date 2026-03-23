import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ERROR_MESSAGES } from '../../../common/constants/error-messages';

export class ResetPasswordDto {
  /** When resetting via email link, token is provided and email is omitted. */
  @IsOptional()
  @IsString()
  token?: string;

  @IsOptional()
  @IsEmail({}, { message: ERROR_MESSAGES.VALIDATION.EMAIL_INVALID })
  email?: string;

  @IsString()
  @MinLength(8, { message: ERROR_MESSAGES.VALIDATION.PASSWORD_TOO_SHORT })
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.PASSWORD_REQUIRED })
  password: string;

  @IsString()
  @IsNotEmpty({
    message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace(
      '{FIELD}',
      'confirmPassword',
    ),
  })
  confirmPassword: string;
}
