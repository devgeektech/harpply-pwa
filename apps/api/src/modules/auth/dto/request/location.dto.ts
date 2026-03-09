import { IsNumber, IsBoolean, IsOptional, Min, Max } from 'class-validator';

export class LocationDto {
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @IsBoolean()
  locationEnabled: boolean;
}