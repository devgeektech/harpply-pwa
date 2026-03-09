import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ERROR_MESSAGES } from '../../../../common/constants/error-messages';

export class StoryDto {
  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'aboutMe') })
  @MaxLength(2000)
  aboutMe: string;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'jobTitle') })
  @MaxLength(200)
  jobTitle: string;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'company') })
  @MaxLength(200)
  company: string;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'school') })
  @MaxLength(200)
  school: string;
}
