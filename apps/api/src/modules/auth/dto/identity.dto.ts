import { IsString, IsNumber, IsIn, IsNotEmpty, Min, Max } from 'class-validator';
import { ERROR_MESSAGES } from '../../../common/constants/error-messages';

export class IdentityDto {
  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'fullName') })
  fullName: string;

  @IsNumber()
  @Min(1)
  @Max(120)
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'age') })
  age: number;

  @IsIn(['male', 'female', 'other'])
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'gender') })
  gender: 'male' | 'female' | 'other';
}
