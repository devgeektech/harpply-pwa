import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ERROR_MESSAGES } from '../../../common/constants/error-messages';

export class AdminSignInDto {
  @IsEmail({}, { message: ERROR_MESSAGES.VALIDATION.EMAIL_INVALID })
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.EMAIL_REQUIRED })
  email: string;

  @IsString({ message: ERROR_MESSAGES.VALIDATION.PASSWORD_MUST_BE_STRING })
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.PASSWORD_REQUIRED })
  password: string;
}
