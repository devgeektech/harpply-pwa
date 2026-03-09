import { IsArray, IsString, IsNotEmpty, ArrayMaxSize, ArrayMinSize } from 'class-validator';
import { ERROR_MESSAGES } from '../../../../common/constants/error-messages';

export class InterestsDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.INTERESTS_REQUIRED })
  @ArrayMinSize(1, { message: ERROR_MESSAGES.VALIDATION.INTERESTS_MIN_ONE })
  @ArrayMaxSize(50)
  interests: string[];
}
