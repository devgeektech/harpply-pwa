import { IsString, IsOptional, MaxLength } from 'class-validator';

export class StoryDto {
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  aboutMe?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  jobTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  company?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  school?: string;
}
