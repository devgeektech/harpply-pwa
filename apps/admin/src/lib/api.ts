const apiBaseUrl =
  (import.meta.env.VITE_API_URL as string | undefined)?.trim() ||
  "http://localhost:5000";

export type AdminLoginResponse = {
  data?: {
    accessToken?: string;
    user?: {
      id: string;
      email: string;
      role: "admin" | "user";
    };
  };
  message?: string;
};

function getErrorMessage(data: unknown, fallback: string): string {
  if (!data || typeof data !== "object") return fallback;
  const maybe = data as { message?: unknown; error?: unknown };
  if (typeof maybe.message === "string" && maybe.message.trim()) return maybe.message;
  if (Array.isArray(maybe.message) && maybe.message.length > 0) {
    return String(maybe.message[0]);
  }
  if (typeof maybe.error === "string" && maybe.error.trim()) return maybe.error;
  return fallback;
}

export async function adminLogin(email: string, password: string): Promise<AdminLoginResponse> {
  const res = await fetch(`${apiBaseUrl}/auth/admin/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = (await res.json().catch(() => ({}))) as unknown;
  if (!res.ok) throw new Error(getErrorMessage(data, "Admin login failed."));
  return data as AdminLoginResponse;
}

export async function adminForgotPassword(email: string): Promise<{ resetToken?: string; message?: string }> {
  const res = await fetch(`${apiBaseUrl}/auth/admin/forgot-password`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = (await res.json().catch(() => ({}))) as {
    data?: { resetToken?: string };
    message?: string;
  };
  if (!res.ok) throw new Error(getErrorMessage(data, "Failed to process forgot password."));
  return { resetToken: data?.data?.resetToken, message: data?.message };
}

export async function adminChangePassword(payload: {
  email: string;
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<{ message?: string }> {
  const res = await fetch(`${apiBaseUrl}/auth/admin/change-password`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as { message?: string };
  if (!res.ok) throw new Error(getErrorMessage(data, "Failed to change password."));
  return data;
}

export async function adminLogout(accessToken: string): Promise<void> {
  const res = await fetch(`${apiBaseUrl}/auth/admin/logout`, {
    method: "POST",
    credentials: "include",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (res.status === 401) return;
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as unknown;
    throw new Error(getErrorMessage(data, "Failed to logout."));
  }
}
