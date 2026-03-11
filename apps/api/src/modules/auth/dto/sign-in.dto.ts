import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ERROR_MESSAGES } from '../../../common/constants/error-messages';

export class SignInDto {
  @IsEmail({}, { message: ERROR_MESSAGES.VALIDATION.EMAIL_INVALID })
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'EMAIL') })
  email: string;

  @IsString({ message: ERROR_MESSAGES.VALIDATION.PASSWORD_MUST_BE_STRING })
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'PASSWORD') })
  password: string;
}
