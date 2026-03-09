import { IsArray, IsString, ArrayMaxSize, ArrayMinSize } from 'class-validator';

export class InterestsDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  interests: string[];
}
