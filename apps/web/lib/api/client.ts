/**
 * API client base configuration for backend (Prisma-backed API) requests.
 */

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
};

export const apiBaseUrl = getBaseUrl();
