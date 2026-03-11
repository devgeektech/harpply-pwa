import { create } from "zustand";

interface AuthState {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  login: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  email: "",
  password: "",

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),

  login: () => {
    const { email, password } = get();

    console.log("Login with:", email, password);

    // API call here later
  },
}));
