import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Payload decoded from JWT and set by JwtStrategy.
 * Used by JwtAuthGuard-protected routes; the token is validated and this payload is attached to req.user.
 */
export interface JwtPayload {
  sub: string;   // user id – use this to update the authenticated user's details
  email: string;
  jti: string;  // token id – use for logout
}

/**
 * Extracts the full JWT payload (decoded token) from the request.
 * Use in routes protected by JwtAuthGuard; the guard decodes the Bearer token and validates it.
 */
export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext): JwtPayload | string => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    return data ? user?.[data] : user;
  },
);

/**
 * Extracts the current user's id (from decoded token's sub) for updating that user's details.
 * Use in onboarding and other protected routes: guard validates token → we get userId → update by id.
 */
export const CurrentUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    console.log('user===>>>>',user);
    return user.sub;
  },
);
