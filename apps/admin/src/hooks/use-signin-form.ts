"use client";

import { useForm } from "react-hook-form";

export interface SignInFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export function useSigninForm() {
  return useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });
}
