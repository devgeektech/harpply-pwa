/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export interface UploadOptions {
  /** Base URL for public read (e.g. https://bucket.s3.region.amazonaws.com). If not set, returns signed URL. */
  publicBaseUrl?: string | null;
}

export interface UploadResult {
  key: string;
  url: string;
}

/**
 * Common S3 service. Use different bucket names per module (e.g. profile photos, future modules).
 * Pass bucket and optional publicBaseUrl per call.
 */
@Injectable()
export class AwsS3Service {
  private readonly s3: S3Client;
  private readonly region: string;

  constructor(private readonly config: ConfigService) {
    const region = this.config.get<string>('AWS_REGION');
    const accessKeyId = this.config.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.config.get<string>('AWS_SECRET_ACCESS_KEY');
    this.region = region ?? 'us-east-1';

    this.s3 = new S3Client({
      region: this.region,
      ...(accessKeyId && secretAccessKey
        ? { credentials: { accessKeyId, secretAccessKey } }
        : {}),
    });
  }

  /** True if AWS credentials and region are configured (buckets are passed per call). */
  isConfigured(): boolean {
    const accessKeyId = this.config.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.config.get<string>('AWS_SECRET_ACCESS_KEY');
    return Boolean(this.region && accessKeyId && secretAccessKey);
  }

  /** Upload to the given bucket. Returns key and URL (public or signed). */
  async upload(
    bucket: string,
    key: string,
    body: Buffer,
    contentType: string,
    options?: UploadOptions,
  ): Promise<UploadResult> {
    await this.s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );
    const publicBaseUrl = options?.publicBaseUrl ?? null;
    const url = publicBaseUrl
      ? `${publicBaseUrl.replace(/\/$/, '')}/${key}`
      : await this.getSignedUrl(bucket, key);
    return { key, url };
  }

  /** Delete object from the given bucket. */
  async delete(bucket: string, key: string): Promise<void> {
    await this.s3.send(
      new DeleteObjectCommand({ Bucket: bucket, Key: key }),
    );
  }

  /** Get a signed URL for the given bucket and key (e.g. 1 hour). */
  async getSignedUrl(bucket: string, key: string, expiresIn = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });
    return getSignedUrl(this.s3, command, { expiresIn });
  }
}
