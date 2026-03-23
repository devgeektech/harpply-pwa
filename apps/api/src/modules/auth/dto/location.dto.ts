import { IsNumber, IsBoolean, IsNotEmpty, Min, Max } from 'class-validator';
import { ERROR_MESSAGES } from '../../../common/constants/error-messages';

export class LocationDto {
  @IsNumber()
  @Min(-90)
  @Max(90)
  @IsNotEmpty({
    message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace(
      '{FIELD}',
      'latitude',
    ),
  })
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  @IsNotEmpty({
    message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace(
      '{FIELD}',
      'longitude',
    ),
  })
  longitude: number;

  @IsBoolean()
  @IsNotEmpty({
    message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace(
      '{FIELD}',
      'locationEnabled',
    ),
  })
  locationEnabled: boolean;
}
