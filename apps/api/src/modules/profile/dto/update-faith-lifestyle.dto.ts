import { IsString, IsInt, IsOptional, IsNotEmpty, IsIn, Min, Max } from 'class-validator';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';

export class UpdateFaithLifestyleDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.CANNOT_BE_EMPTY_WHEN_PROVIDED.replace('{FIELD}', 'denomination') })
  denomination?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  yearsInFaith?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.CANNOT_BE_EMPTY_WHEN_PROVIDED.replace('{FIELD}', 'churchInvolvement') })
  churchInvolvement?: string;

  @IsOptional()
  // @IsIn(['Never', 'Monthly', 'Bi-Annually', 'Regularly'])
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.CANNOT_BE_EMPTY_WHEN_PROVIDED.replace('{FIELD}', 'churchAttendance') })
  churchAttendance?: string;
}
