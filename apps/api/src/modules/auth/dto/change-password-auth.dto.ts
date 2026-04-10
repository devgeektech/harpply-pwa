import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ERROR_MESSAGES } from '../../../common/constants/error-messages';

export class ChangePasswordAuthDto {
  @IsString({ message: ERROR_MESSAGES.VALIDATION.PASSWORD_MUST_BE_STRING })
  @IsNotEmpty({ message: 'Current password is required.' })
  currentPassword: string;

  @IsString({ message: ERROR_MESSAGES.VALIDATION.PASSWORD_MUST_BE_STRING })
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.PASSWORD_REQUIRED })
  @MinLength(8, { message: ERROR_MESSAGES.VALIDATION.PASSWORD_TOO_SHORT })
  newPassword: string;

  @IsString({ message: ERROR_MESSAGES.VALIDATION.PASSWORD_MUST_BE_STRING })
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.CONFIRM_PASSWORD_REQUIRED })
  confirmPassword: string;
}
