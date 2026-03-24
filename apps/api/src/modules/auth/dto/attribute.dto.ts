import {
  IsArray,
  IsString,
  IsNotEmpty,
  ArrayMaxSize,
  ArrayMinSize,
} from 'class-validator';
import { ERROR_MESSAGES } from '../../../common/constants/error-messages';

export class AttributeDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.ATTRIBUTES_REQUIRED })
  @ArrayMinSize(1, { message: ERROR_MESSAGES.VALIDATION.ATTRIBUTES_MIN_ONE })
  @ArrayMaxSize(50)
  attribute: string[];
}
