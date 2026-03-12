import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ERROR_MESSAGES } from '../../../common/constants/error-messages';

export class VerifyOtpDto {
  @IsEmail({}, { message: ERROR_MESSAGES.VALIDATION.EMAIL_INVALID })
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.EMAIL_REQUIRED })
  email: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}
