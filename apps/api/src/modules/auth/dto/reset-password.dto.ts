import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ERROR_MESSAGES } from '../../../common/constants/error-messages';

export class ResetPasswordDto {
  @IsEmail({}, { message: ERROR_MESSAGES.VALIDATION.EMAIL_INVALID })
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.EMAIL_REQUIRED })
  email: string;

  @IsString()
  @MinLength(8, { message: ERROR_MESSAGES.VALIDATION.PASSWORD_TOO_SHORT })
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.PASSWORD_REQUIRED })
  password: string;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'confirmPassword') })
  confirmPassword: string;
}
