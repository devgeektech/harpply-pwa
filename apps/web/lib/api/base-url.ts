/** Live backend URL (harpply.com, admin.harpply.com). */
const LIVE_API_URL = "https://api.harpply.com";

/**
 * API base URL for backend requests.
 * - Use NEXT_PUBLIC_API_URL when set (build env for local or production).
 * - On live (non-localhost): fallback to https://api.harpply.com.
 * - On local: fallback to http://localhost:5000.
 * Always returns URL without trailing slash.
 */
export function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL?.trim()?.replace(/\/+$/, "");
  if (envUrl) return envUrl;

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host !== "localhost" && host !== "127.0.0.1") {
      return LIVE_API_URL;
    }
  }

  return "http://localhost:5000";
}
