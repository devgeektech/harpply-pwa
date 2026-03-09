import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/** Routes that may have an empty body (e.g. POST with no payload). */
const ALLOW_EMPTY_BODY_PATHS: { method: string; path: string }[] = [
  { method: 'POST', path: '/auth/onboarding/complete' },
];

@Injectable()
export class NotEmptyBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const method = req.method;
    if (method !== 'PATCH' && method !== 'PUT' && method !== 'POST') {
      return next();
    }

    const path = (req.originalUrl || req.url || '').split('?')[0];
    const allowed = ALLOW_EMPTY_BODY_PATHS.some(
      (p) => p.method === method && (path === p.path || path.endsWith(p.path)),
    );
    if (allowed) return next();

    const body = req.body;
    // Reject when body is missing or not an object (e.g. no JSON sent)
    if (body == null || typeof body !== 'object' || Array.isArray(body)) {
      throw new BadRequestException(
        'Request body is required and must be a JSON object with at least one field.',
      );
    }
    if (Object.keys(body).length === 0) {
      throw new BadRequestException(
        'Request body cannot be empty. Provide at least one field.',
      );
    }
    next();
  }
}
