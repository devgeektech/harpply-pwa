import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DetectModerationLabelsCommand,
  DetectModerationLabelsCommandOutput,
  RekognitionClient,
} from '@aws-sdk/client-rekognition';
import { ERROR_MESSAGES } from '../constants/error-messages';

export interface RekognitionModerationResult {
  isAppropriate: boolean;
  blockedLabels: string[];
}

/**
 * Shared Rekognition helper for image moderation.
 * Reuse this service anywhere we accept user images before persisting to S3/DB.
 */
@Injectable()
export class AwsRekognitionService {
  private readonly client: RekognitionClient;
  private readonly region: string;

  /**
   * Conservative defaults for dating-app profile photos.
   * We block either by label name or by parent category.
   */
  private readonly blockedTaxonomy = new Set<string>([
    'Explicit Nudity',
    'Nudity',
    'Graphic Male Nudity',
    'Graphic Female Nudity',
    'Sexual Activity',
    'Illustrated Explicit Nudity',
    'Violence',
    'Graphic Violence Or Physical Injury',
    'Physical Violence',
    'Weapons',
    'Drugs',
    'Drug Products',
    'Tobacco',
    'Alcohol',
    'Gambling',
    'Hate Symbols',
    'Rude Gestures',
    'Visually Disturbing',
  ]);

  constructor(private readonly config: ConfigService) {
    const region = this.config.get<string>('AWS_REGION');
    const accessKeyId = this.config.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.config.get<string>('AWS_SECRET_ACCESS_KEY');
    this.region = region ?? 'us-east-1';

    this.client = new RekognitionClient({
      region: this.region,
      ...(accessKeyId && secretAccessKey
        ? { credentials: { accessKeyId, secretAccessKey } }
        : {}),
    });
  }

  isConfigured(): boolean {
    const accessKeyId = this.config.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.config.get<string>('AWS_SECRET_ACCESS_KEY');
    return Boolean(this.region && accessKeyId && secretAccessKey);
  }

  async moderateImage(
    imageBytes: Buffer,
    minConfidence = Number(process.env.AWS_REKOGNITION_MIN_CONFIDENCE ?? 75),
  ): Promise<RekognitionModerationResult> {
    let res: DetectModerationLabelsCommandOutput;
    try {
      res = await this.client.send(
        new DetectModerationLabelsCommand({
          Image: { Bytes: imageBytes },
          MinConfidence: Number.isFinite(minConfidence) ? minConfidence : 75,
        }),
      );
    } catch (error: unknown) {
      const err = (error ?? {}) as {
        name?: string;
        $metadata?: { httpStatusCode?: number };
      };

      // Keep users away from raw AWS exception strings.
      if (
        err?.name === 'AccessDeniedException' ||
        err?.name === 'UnrecognizedClientException' ||
        err?.name === 'InvalidSignatureException' ||
        err?.$metadata?.httpStatusCode === 403
      ) {
        throw new ServiceUnavailableException(
          ERROR_MESSAGES.GENERAL.CONTENT_MODERATION_UNAVAILABLE,
        );
      }

      throw new BadRequestException(
        ERROR_MESSAGES.GENERAL.CONTENT_MODERATION_UNAVAILABLE,
      );
    }

    const blocked = new Set<string>();
    for (const item of res.ModerationLabels ?? []) {
      const name = item.Name?.trim();
      const parent = item.ParentName?.trim();
      if (name && this.blockedTaxonomy.has(name)) blocked.add(name);
      if (parent && this.blockedTaxonomy.has(parent)) blocked.add(parent);
    }

    const blockedLabels = Array.from(blocked);
    return {
      isAppropriate: blockedLabels.length === 0,
      blockedLabels,
    };
  }
}
