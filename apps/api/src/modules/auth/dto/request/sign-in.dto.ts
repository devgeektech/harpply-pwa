import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ERROR_MESSAGES } from '../../../../common/constants/error-messages'; // adjust path as needed

export class SignInDto {
  @IsEmail(
    {},
    {
      message: ERROR_MESSAGES.VALIDATION.EMAIL_INVALID,
    },
  )
  @IsNotEmpty({
    message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'EMAIL'),
  })
  email: string;

  @IsString({
    message: 'PASSWORD MUST BE A VALID STRING', // can also be moved to constant if needed
  })
  @IsNotEmpty({
    message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'PASSWORD'),
  })
  password: string;
}