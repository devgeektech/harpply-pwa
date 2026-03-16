# How to Add HttpOnly Cookies for Auth (Step-by-Step)

You already did **Step 1** (install cookie-parser) and **Step 2** (use it in `main.ts`). Below are the remaining steps with exact changes so you can do them yourself and understand each one.

---

## Step 3: Backend – Define cookie name and options

**Why:** The API will set a cookie with a fixed name and safe options (HttpOnly, Secure in prod, etc.). Centralizing this avoids typos and keeps behaviour consistent.

**What to do:**

1. Create a new file: **`apps/api/src/modules/auth/auth-cookie.constants.ts`**
2. Put this in it:

```ts
/**
 * Cookie name for the access token. The browser sends this automatically;
 * the frontend never reads or writes it.
 */
export const ACCESS_TOKEN_COOKIE = 'harpply_access_token';

/** 1 day in ms – matches JWT expiresIn: '1d' in auth.module.ts */
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const accessTokenCookieOptions = {
  httpOnly: true,        // JS cannot read this cookie (XSS-safe)
  secure: process.env.NODE_ENV === 'production',  // HTTPS only in prod
  sameSite: 'lax' as const,  // sent on same-site and top-level navigations
  maxAge: ONE_DAY_MS,
  path: '/',
};
```

You will import `ACCESS_TOKEN_COOKIE` and `accessTokenCookieOptions` in the auth controller and in the JWT strategy.

---

## Step 4: Backend – Set the cookie on login and set-password

**Why:** After a successful login or set-password, the API returns a token in the JSON body. We also set that same token in an HttpOnly cookie so the browser stores it and sends it on later requests. We use Nest’s “passthrough” response so we can both set the cookie and return the normal JSON.

**What to do in `apps/api/src/modules/auth/auth.controller.ts`:**

1. **Add imports** at the top:
   - `Res` from `@nestjs/common`
   - `Response` from `'express'`
   - `ACCESS_TOKEN_COOKIE` and `accessTokenCookieOptions` from `'./auth-cookie.constants'`

2. **Change `setPassword`** so it:
   - Has a second parameter: `@Res({ passthrough: true }) res: Response`
   - Calls the service as usual: `const result = await this.authService.setPassword(dto);`
   - Gets the token: `const token = result?.data?.accessToken;`
   - If token exists, sets the cookie: `if (token) { res.cookie(ACCESS_TOKEN_COOKIE, token, accessTokenCookieOptions); }`
   - Returns: `return result;`

3. **Change `login`** the same way:
   - Add `@Res({ passthrough: true }) res: Response`
   - `const result = await this.authService.signIn(dto);`
   - `const token = result?.data?.accessToken;`
   - `if (token) { res.cookie(ACCESS_TOKEN_COOKIE, token, accessTokenCookieOptions); }`
   - `return result;`

So the controller only *adds* the cookie; it does not change the response body. The frontend can still read the token from the body until you switch it to cookie-only (Step 8).

---

## Step 5: Backend – Clear the cookie on logout

**Why:** When the user logs out, we invalidate the token in the DB and we also remove the cookie so the browser stops sending it.

**What to do in the same `auth.controller.ts`:**

1. In the **`logout`** method, add a third parameter: `@Res({ passthrough: true }) res: Response`
2. After `return this.authService.logout(jti, userId);` you need to clear the cookie and then return. So change it to:
   - `const result = await this.authService.logout(jti, userId);`
   - `res.clearCookie(ACCESS_TOKEN_COOKIE, { path: '/' });`  
     (Use the same `path` as when you set the cookie.)
   - `return result;`

---

## Step 6: Backend – Read the token from the cookie in the JWT strategy

**Why:** Right now the JWT is taken only from the `Authorization: Bearer <token>` header. We want to accept the token from the **cookie** first (for the browser), and still support the **Bearer** header (e.g. for mobile or other API clients).

**What to do in `apps/api/src/modules/auth/jwt.strategy.ts`:**

1. **Add imports:** `Request` from `'express'` and `ACCESS_TOKEN_COOKIE` from `'./auth-cookie.constants'`.

2. **Replace** the single extractor:
   - From: `jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),`
   - To:  
     `jwtFromRequest: ExtractJwt.fromExtractors([`  
       `(req: Request) => req?.cookies?.[ACCESS_TOKEN_COOKIE] ?? null,`  
       `ExtractJwt.fromAuthHeaderAsBearerToken(),`  
     `]),`

So: first try the cookie, then the header. The rest of the strategy (validate, secretOrKey) stays the same.

---

## Step 7: Frontend – Send cookies on every request to the API

**Why:** When the frontend (e.g. localhost:3000) calls the API (e.g. localhost:5000), that’s “cross-origin”. By default the browser does **not** send cookies on cross-origin requests. Adding `credentials: "include"` tells the browser to send the HttpOnly cookie with every request to your API.

**What to do:**

1. In **`apps/web/lib/api/auth.ts`**, add `credentials: "include"` to **every** `fetch` that calls your API. For example:
   - `fetch(url, { method: "POST", headers: {...}, body: ..., credentials: "include" })`
   Do this for: `registerEmail`, `setPassword`, and `signIn`.

2. In **`apps/web/store/onboardingStore.ts`**, the `fetch` to `/auth/onboarding/identity` must also include `credentials: "include"` so the cookie is sent with that request too.

You can define something like `const authFetchOptions = { credentials: "include" as RequestCredentials }` and spread it: `...authFetchOptions`, or add the property manually to each `fetch` call.

---

## Step 8: Frontend – Stop storing and sending the token yourself

**Why:** The token will live only in the HttpOnly cookie. The frontend must not store it in localStorage and must not send it in the `Authorization` header; the browser will send the cookie automatically when `credentials: "include"` is set.

**What to do:**

1. **After login (e.g. in `useAuthStoreLogin`):**  
   Remove the line that does `localStorage.setItem(..., result.data.accessToken)`.  
   Keep storing `onboardingCompleted` in localStorage if you use it for redirects.

2. **After set-password (e.g. in the create-password page):**  
   Same: remove `localStorage.setItem` for the access token; keep anything you need for onboarding/redirect.

3. **Authenticated requests (e.g. onboarding identity in `onboardingStore`):**  
   Remove the `Authorization: Bearer ${token}` header and any code that reads the token from localStorage for that request.  
   Keep `credentials: "include"` (from Step 7). The API will get the token from the cookie (Step 6).

4. Optionally you can remove `ACCESS_TOKEN` from `AUTH_STORAGE_KEYS` in `lib/api/auth.ts` if nothing else uses it.

---

## Step 9: CORS (already done)

**Why:** For cross-origin requests with cookies, the server must allow the frontend origin and set `credentials: true`.

Your **`apps/api/src/main.ts`** already has:
- `credentials: true`
- `origin` including `http://localhost:3000` (and `127.0.0.1:3000`)

So you don’t need to change anything for local dev. For production, set `CORS_ORIGIN` to your real frontend URL (e.g. `https://yourapp.com`).

---

## Step 10 (optional): Stop returning the token in the response body

**Why:** Once the frontend uses only the cookie (Steps 7 and 8 done), the token in the JSON body is redundant. Removing it reduces the chance of someone accidentally using it in JS.

**What to do:** In **`apps/api/src/modules/auth/auth.service.ts`**, in `setPassword` and `signIn`, you can remove `accessToken` from the object you return in `data` (so the response still has `message`, `data.user`, etc., but not `data.accessToken`). The frontend should no longer read `result.data.accessToken` after Step 8.

---

## Quick checklist (steps 3–10)

| Step | Where | What you add/change |
|------|--------|----------------------|
| 3 | New file `auth-cookie.constants.ts` | Cookie name + options (httpOnly, secure, sameSite, maxAge, path) |
| 4 | `auth.controller.ts` | In `setPassword` and `login`: inject `res`, then `res.cookie(...)` after success |
| 5 | `auth.controller.ts` | In `logout`: inject `res`, then `res.clearCookie(...)` before return |
| 6 | `jwt.strategy.ts` | Use `fromExtractors`: first cookie, then Bearer header |
| 7 | `lib/api/auth.ts` + `onboardingStore.ts` | Add `credentials: "include"` to every API `fetch` |
| 8 | Login store, create-password page, onboarding store | No localStorage for token; no `Authorization` header on auth requests |
| 9 | `main.ts` | Already OK (CORS origin + credentials) |
| 10 | `auth.service.ts` (optional) | Omit `accessToken` from login/set-password response |

If you do steps 3–8, login/set-password will set the cookie, and all subsequent authenticated requests will work via the cookie. Steps 9 and 10 are checks/cleanups.
