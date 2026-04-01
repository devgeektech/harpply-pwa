import { create } from "zustand";
import { ADMIN_STORAGE_KEYS } from "../constants/storage";
import { adminLogin, adminLogout } from "../lib/api";

function getFromStorage(key: string): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(key) ?? "";
}

function setInStorage(key: string, value: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, value);
}

function removeFromStorage(key: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
}

interface AdminAuthState {
  accessToken: string;
  email: string;
  loading: boolean;
  error: string | null;

  hydrate: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>((set, get) => ({
  accessToken: getFromStorage(ADMIN_STORAGE_KEYS.ACCESS_TOKEN),
  email: getFromStorage(ADMIN_STORAGE_KEYS.EMAIL),
  loading: false,
  error: null,

  hydrate: () => {
    set({
      accessToken: getFromStorage(ADMIN_STORAGE_KEYS.ACCESS_TOKEN),
      email: getFromStorage(ADMIN_STORAGE_KEYS.EMAIL),
    });
  },

  clearError: () => set({ error: null }),

  login: async (email, password) => {
    const trimmedEmail = (email ?? "").trim();
    set({ loading: true, error: null });
    try {
      const res = await adminLogin(trimmedEmail, password);
      const token = res?.data?.accessToken ?? "";
      if (!token) throw new Error("Access token missing in response.");

      setInStorage(ADMIN_STORAGE_KEYS.ACCESS_TOKEN, token);
      setInStorage(ADMIN_STORAGE_KEYS.EMAIL, trimmedEmail);

      set({ accessToken: token, email: trimmedEmail });
    } catch (e) {
      set({ error: e instanceof Error ? e.message : "Login failed." });
      throw e;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    const token = get().accessToken;
    set({ loading: true, error: null });
    try {
      if (token) await adminLogout(token);
    } catch (e) {
      set({ error: e instanceof Error ? e.message : "Logout failed." });
      throw e;
    } finally {
      removeFromStorage(ADMIN_STORAGE_KEYS.ACCESS_TOKEN);
      removeFromStorage(ADMIN_STORAGE_KEYS.EMAIL);
      set({ accessToken: "", email: "", loading: false });
    }
  },
}));

