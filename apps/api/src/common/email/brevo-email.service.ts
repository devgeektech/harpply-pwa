import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BrevoClient } from '@getbrevo/brevo';

@Injectable()
export class BrevoEmailService {
  private readonly logger = new Logger(BrevoEmailService.name);
  private readonly client: BrevoClient | null;
  private readonly senderEmail: string;
  private readonly senderName: string;
  private readonly verifyBaseUrl: string;
  private readonly appName: string;

  constructor(private readonly config: ConfigService) {
    const apiKey = this.config.get<string>('BREVO_API_KEY');
    this.senderEmail =
      this.config.get<string>('BREVO_SENDER_EMAIL') ?? 'no-reply@harpply.com';
    this.senderName = this.config.get<string>('BREVO_SENDER_NAME') ?? 'Harpply';
    // Link in email must point to the frontend verify-email page.
    // On live server: set FRONTEND_APP_URL to your live frontend (e.g. https://harpply.com).
    const frontendUrl = this.config.get<string>('FRONTEND_APP_URL');
    const isProduction = this.config.get<string>('NODE_ENV') === 'production';
    this.verifyBaseUrl =
      frontendUrl ??
      (isProduction ? 'https://harpply.com' : 'http://localhost:3000');
    // this.verifyBaseUrl = 'https://harpply.com';
    this.appName = this.config.get<string>('APP_NAME') ?? 'Harpply';

    if (apiKey?.trim()) {
      this.client = new BrevoClient({ apiKey: apiKey.trim() });
    } else {
      this.client = null;
      this.logger.warn(
        'Brevo SDK is not initialized. Set BREVO_API_KEY in apps/api/.env to send verification emails.',
      );
    }
  }

  async sendEmailVerificationLink(email: string, token: string): Promise<void> {
    if (!this.client) {
      this.logger.warn(
        `Skipping verification email – Brevo API client not initialized. Email: ${email}`,
      );
      return;
    }

    const verifyUrl = `${this.verifyBaseUrl}/auth/verify-email?token=${encodeURIComponent(token)}`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Verify your email</title></head>
<body style="font-family: system-ui, sans-serif; background:#f5f5f5; padding:24px; margin:0;">
  <div style="max-width:480px; margin:0 auto; background:#fff; border-radius:12px; padding:24px; box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <h1 style="margin:0 0 16px; font-size:20px; color:#333;">Confirm your email</h1>
    <p style="margin:0 0 24px; font-size:14px; line-height:1.6; color:#555;">
      Welcome to ${this.appName}. Click the button below to verify your email and create your password.
    </p>
    <p style="margin:0 0 24px;">
      <a href="${verifyUrl}" style="display:inline-block; padding:12px 24px; background:#1976d2; color:#fff; text-decoration:none; border-radius:8px; font-weight:600;">Verify email</a>
    </p>
    <p style="margin:0; font-size:12px; color:#888;">
      If the button doesn't work, copy and paste this link into your browser:<br/>
      <span style="word-break:break-all;">${verifyUrl}</span>
    </p>
  </div>
</body>
</html>`;

    try {
      await this.client.transactionalEmails.sendTransacEmail({
        sender: { email: this.senderEmail, name: this.senderName },
        to: [{ email }],
        subject: `Verify your email for ${this.appName}`,
        htmlContent,
      });
    } catch (err) {
      this.logger.error(
        `Failed to send verification email to ${email}`,
        err instanceof Error ? err.stack : String(err),
      );
    }
  }

  /** Send password reset link (same pattern as email verification). */
  async sendPasswordResetLink(email: string, token: string): Promise<void> {
    if (!this.client) {
      this.logger.warn(
        `Skipping password reset email – Brevo API client not initialized. Email: ${email}`,
      );
      return;
    }

    const resetUrl = `${this.verifyBaseUrl.replace(/\/$/, '')}/auth/set-password-reset?token=${encodeURIComponent(token)}`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Reset your password</title></head>
<body style="font-family: system-ui, sans-serif; background:#f5f5f5; padding:24px; margin:0;">
  <div style="max-width:480px; margin:0 auto; background:#fff; border-radius:12px; padding:24px; box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <h1 style="margin:0 0 16px; font-size:20px; color:#333;">Reset your password</h1>
    <p style="margin:0 0 24px; font-size:14px; line-height:1.6; color:#555;">
      You requested a password reset for your ${this.appName} account. Click the button below to set a new password.
    </p>
    <p style="margin:0 0 24px;">
      <a href="${resetUrl}" style="display:inline-block; padding:12px 24px; background:#1976d2; color:#fff; text-decoration:none; border-radius:8px; font-weight:600;">Set new password</a>
    </p>
    <p style="margin:0; font-size:12px; color:#888;">
      If you didn't request this, you can ignore this email. The link expires in 1 hour.
    </p>
    <p style="margin:16px 0 0; font-size:12px; color:#888;">
      If the button doesn't work, copy and paste this link into your browser:<br/>
      <span style="word-break:break-all;">${resetUrl}</span>
    </p>
  </div>
</body>
</html>`;

    try {
      await this.client.transactionalEmails.sendTransacEmail({
        sender: { email: this.senderEmail, name: this.senderName },
        to: [{ email }],
        subject: `Reset your password for ${this.appName}`,
        htmlContent,
      });
    } catch (err) {
      this.logger.error(
        `Failed to send password reset email to ${email}`,
        err instanceof Error ? err.stack : String(err),
      );
    }
  }
}
