import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ERROR_MESSAGES } from '../../../common/constants/error-messages';

export class ResetPasswordByTokenDto {
  @IsString()
  @IsNotEmpty({ message: 'Token is required.' })
  token: string;

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
