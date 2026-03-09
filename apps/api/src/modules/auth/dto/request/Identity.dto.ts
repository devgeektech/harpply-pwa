import { IsString, IsNumber, IsIn, IsOptional, Min, Max } from 'class-validator';

export class IdentityDto {
  @IsString()
  fullName: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(120)
  age?: number;

  @IsIn(['MALE', 'FEMALE', 'OTHER'])
  gender: 'MALE' | 'FEMALE' | 'OTHER';
}