import { IsString, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';
import { ERROR_MESSAGES } from '../../../common/constants/error-messages';

export class StoryDto {
  @IsString()
  @IsNotEmpty({
    message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace(
      '{FIELD}',
      'aboutMe',
    ),
  })
  @MaxLength(2000)
  bio: string;
}
