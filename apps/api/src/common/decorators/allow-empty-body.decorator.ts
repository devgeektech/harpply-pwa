import { SetMetadata } from '@nestjs/common';

export const ALLOW_EMPTY_BODY = 'allowEmptyBody';

/**
 * Use on routes that accept POST with no body (e.g. complete onboarding).
 * By default, PATCH/PUT/POST with an empty body `{}` are rejected.
 */
export const AllowEmptyBody = () => SetMetadata(ALLOW_EMPTY_BODY, true);
