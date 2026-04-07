import { IsObject } from 'class-validator';

export class BiblicalPreferencesDto {
  @IsObject()
  preferences!: Record<string, string>;
}
