import { IsString, IsBoolean, IsInt, IsOptional, IsIn, Min, Max } from 'class-validator';

export class FaithLifestyleDto {
  @IsOptional()
  @IsString()
  myFaith?: string;

  @IsOptional()
  @IsString()
  churchInvolvement?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  yearsInFaith?: number;

  @IsOptional()
  @IsString()
  churchAttendance?: string;

  @IsOptional()
  @IsIn(['Active', 'Sometimes', 'Never'])
  exercise?: string;

  @IsOptional()
  @IsBoolean()
  lifestyleSmoking?: boolean;

  @IsOptional()
  @IsBoolean()
  lifestyleDrinking?: boolean;

  @IsOptional()
  @IsBoolean()
  lifestylePartying?: boolean;

  @IsOptional()
  @IsString()
  dietaryPreference?: string;
}
