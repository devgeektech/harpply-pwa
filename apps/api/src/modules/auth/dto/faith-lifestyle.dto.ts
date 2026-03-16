import { IsString, IsInt, IsNotEmpty, IsIn, Min, Max } from 'class-validator';
import { ERROR_MESSAGES } from '../../../common/constants/error-messages';

export class FaithLifestyleDto {
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

  @IsString()
  @IsIn(['Never', 'Socially', 'Regularly'], { message: 'Smoking preference must be Never, Socially, or Regularly.' })
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'smokingPreference') })
  smokingPreference: string;

  @IsString()
  @IsIn(['Never', 'Socially', 'Regularly'], { message: 'Alcohol preference must be Never, Socially, or Regularly.' })
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'alcoholPreference') })
  alcoholPreference: string;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'dietaryPreference') })
  dietaryPreference: string;
}
