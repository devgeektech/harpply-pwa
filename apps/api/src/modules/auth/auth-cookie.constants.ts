export const ACCESS_TOKEN_COOKIE = 'harpply_access_token';

/** 1 day in ms – matches JWT expiresIn: '1d' in auth.module.ts */
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const accessTokenCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: ONE_DAY_MS,
  path: '/',
};
