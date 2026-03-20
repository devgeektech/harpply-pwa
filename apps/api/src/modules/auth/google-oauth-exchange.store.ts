import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

type Entry = {
  accessToken: string;
  onboardingCompleted: boolean;
  expiresAt: number;
};

/** One-time codes so the browser can fetch tokens without relying on URL #fragments (often dropped on redirects). */
@Injectable()
export class GoogleOauthExchangeStore {
  private readonly store = new Map<string, Entry>();
  private readonly ttlMs = 5 * 60 * 1000;

  create(accessToken: string, onboardingCompleted: boolean): string {
    const code = randomUUID();
    this.store.set(code, {
      accessToken,
      onboardingCompleted,
      expiresAt: Date.now() + this.ttlMs,
    });
    this.prune();
    return code;
  }

  consume(code: string): Entry | null {
    if (!code?.trim()) return null;
    const entry = this.store.get(code);
    this.store.delete(code);
    if (!entry || Date.now() > entry.expiresAt) return null;
    return entry;
  }

  private prune(): void {
    const now = Date.now();
    for (const [k, v] of this.store) {
      if (now > v.expiresAt) this.store.delete(k);
    }
  }
}
