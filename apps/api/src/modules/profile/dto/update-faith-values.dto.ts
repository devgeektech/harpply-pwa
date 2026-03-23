import {
  IsArray,
  IsString,
  IsOptional,
  IsNotEmpty,
  ArrayMaxSize,
} from 'class-validator';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';

export class UpdateFaithValuesDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({
    message: ERROR_MESSAGES.VALIDATION.CANNOT_BE_EMPTY_WHEN_PROVIDED.replace(
      '{FIELD}',
      'myFaithValues',
    ),
  })
  @ArrayMaxSize(50)
  myFaithValues?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({
    message: ERROR_MESSAGES.VALIDATION.CANNOT_BE_EMPTY_WHEN_PROVIDED.replace(
      '{FIELD}',
      'partnerValues',
    ),
  })
  @ArrayMaxSize(50)
  partnerValues?: string[];
}
