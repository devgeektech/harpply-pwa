import { IsString, IsBoolean, IsInt, IsNotEmpty, IsIn, Min, Max } from 'class-validator';
import { ERROR_MESSAGES } from '../../../../common/constants/error-messages';

export class FaithLifestyleDto {
  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'myFaith') })
  myFaith: string;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'churchInvolvement') })
  churchInvolvement: string;

  @IsInt()
  @Min(0)
  @Max(100)
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'yearsInFaith') })
  yearsInFaith: number;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'churchAttendance') })
  churchAttendance: string;

  @IsIn(['Active', 'Sometimes', 'Never'])
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'exercise') })
  exercise: string;

  @IsBoolean()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'lifestyleSmoking') })
  lifestyleSmoking: boolean;

  @IsBoolean()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'lifestyleDrinking') })
  lifestyleDrinking: boolean;

  @IsBoolean()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'lifestylePartying') })
  lifestylePartying: boolean;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'dietaryPreference') })
  dietaryPreference: string;
}
