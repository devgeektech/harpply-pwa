"use client";

import { useSigninForm, type SignInFormValues } from "../hooks/use-signin-form";
import {
  FormField,
  Input,
  PasswordField,
  CheckboxField,
  SubmitButton,
  cn,
} from "@repo/ui";

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export interface SignInFormProps {
  onSubmit: (values: SignInFormValues) => void | Promise<void>;
  submitLabel?: string;
  className?: string;
  idPrefix?: string;
}

export type { SignInFormValues } from "../hooks/use-signin-form";

export function SignInForm({
  onSubmit,
  submitLabel = "Sign in",
  className,
  idPrefix = "signin",
}: SignInFormProps) {
  const form = useSigninForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const emailId = `${idPrefix}-email`;
  const passwordId = `${idPrefix}-password`;
  const rememberId = `${idPrefix}-remember`;

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(values);
      })}
      className={cn("space-y-4", className)}
      noValidate
    >
      <FormField label="Email" id={emailId} error={errors.email?.message}>
        <Input
          id={emailId}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: EMAIL_PATTERN,
              message: "Please enter a valid email address",
            },
          })}
        />
      </FormField>

      <FormField label="Password" id={passwordId} error={errors.password?.message}>
        <PasswordField
          id={passwordId}
          autoComplete="current-password"
          placeholder="••••••••"
          aria-invalid={Boolean(errors.password)}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
      </FormField>

      <CheckboxField
        id={rememberId}
        label="Remember me"
        error={Boolean(errors.remember)}
        {...register("remember")}
      />

      <SubmitButton loading={isSubmitting} loadingLabel="Signing in...">
        {submitLabel}
      </SubmitButton>
    </form>
  );
}
