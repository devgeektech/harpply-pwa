import { signIn as apiSignIn, AUTH_STORAGE_KEYS } from "@/lib/api/auth";
import { hydrateOnboardingStores } from "@/store/onboardingStore";
import { create } from "zustand";

interface AuthState {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setError: (error: string | null) => void;
  /** Calls API, stores token and onboarding status; returns redirect path. Throws on error. */
  login: () => Promise<string>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  email: "",
  password: "",
  loading: false,
  error: null,

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setError: (error) => set({ error }),

  login: async () => {
    const { email, password } = get();
    set({ loading: true, error: null });
    try {
      const result = await apiSignIn(email.trim(), password);
      if (typeof window !== "undefined" && result?.data) {
        window.localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, result.data.accessToken);
        window.localStorage.setItem(
          AUTH_STORAGE_KEYS.ONBOARDING_COMPLETED,
          String(result.data.user?.onboardingCompleted ?? false)
        );
        if (result.data.onboarding) {
          hydrateOnboardingStores(result.data.onboarding);
        }
      }
      const onboardingCompleted = result?.data?.user?.onboardingCompleted ?? false;
      return onboardingCompleted ? "/" : "/auth/onboarding/identity";
    } finally {
      set({ loading: false });
    }
  },
}));
