import { Global, Module } from '@nestjs/common';
import { AwsRekognitionService } from './aws-rekognition.service';

@Global()
@Module({
  providers: [AwsRekognitionService],
  exports: [AwsRekognitionService],
})
export class AwsRekognitionModule {}
