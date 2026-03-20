import { IsString, IsOptional, IsNotEmpty, IsIn } from 'class-validator';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';

export class UpdateLifestyleDto {
  @IsOptional()
  @IsIn(['Never', 'Socially', 'Regularly'])
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.CANNOT_BE_EMPTY_WHEN_PROVIDED.replace('{FIELD}', 'smokingPreference') })
  smokingPreference?: string;

  @IsOptional()
  @IsIn(['Never', 'Socially', 'Regularly'])
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.CANNOT_BE_EMPTY_WHEN_PROVIDED.replace('{FIELD}', 'alcoholPreference') })
  alcoholPreference?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.CANNOT_BE_EMPTY_WHEN_PROVIDED.replace('{FIELD}', 'dietaryPreference') })
  dietaryPreference?: string;
}
