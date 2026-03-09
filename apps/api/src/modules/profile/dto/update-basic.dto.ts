import { IsString, IsNumber, IsIn, IsOptional, IsNotEmpty, IsUrl, Min, Max } from 'class-validator';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';

export class UpdateBasicDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.CANNOT_BE_EMPTY_WHEN_PROVIDED.replace('{FIELD}', 'fullName') })
  fullName?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(120)
  age?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.CANNOT_BE_EMPTY_WHEN_PROVIDED.replace('{FIELD}', 'location') })
  location?: string;

  @IsOptional()
  @IsIn(['male', 'female', 'other'])
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.CANNOT_BE_EMPTY_WHEN_PROVIDED.replace('{FIELD}', 'gender') })
  gender?: string;

  @IsOptional()
  @IsUrl()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.CANNOT_BE_EMPTY_WHEN_PROVIDED.replace('{FIELD}', 'profilePhoto') })
  profilePhoto?: string;
}
