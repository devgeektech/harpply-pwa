"use client";

import { useState, Suspense } from "react";
import { Form, Field } from "react-final-form";
import { Button, Card, CardContent, Input, Label } from "@repo/ui";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import * as yup from "yup";
import { setPassword as apiSetPassword, AUTH_STORAGE_KEYS } from "@/lib/api/auth";
import { useSignupStore } from "store/useSignupStore";

const MIN_PASSWORD_LENGTH = 8;

const setPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Password is required.")
    .min(MIN_PASSWORD_LENGTH, "Password must be at least 8 characters long."),
  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password")], "Passwords do not match."),
});

function makeYupValidator<T extends yup.AnyObjectSchema>(schema: T) {
  return (values: Record<string, unknown>) => {
    try {
      schema.validateSync(values, { abortEarly: false });
      return {};
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const inner = err.inner?.length ? err.inner : [err];
        return inner.reduce<Record<string, string>>((acc, e) => {
          const path = e.path ?? "unknown";
          acc[path] = e.message ?? "Invalid";
          return acc;
        }, {});
      }
      throw err;
    }
  };
}

const validatePassword = makeYupValidator(setPasswordSchema);

function FieldError({ name }: { name: string }) {
  return (
    <Field name={name} subscription={{ error: true, touched: true }}>
      {({ meta }) =>
        meta.touched && meta.error ? (
          <div className="text-sm text-red-400 mt-1">{meta.error}</div>
        ) : null
      }
    </Field>
  );
}

const inputClass =
  "bg-white border-white/10 h-[52px] border border-[#E7ECF2] rounded-[12px] md:rounded-[8px] text-[#3B3B3B] placeholder:text-[#3B3B3B] focus-visible:ring-0 pr-10 w-full";

function CreatePasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") ?? "";

  const { email: emailFromStore, setError, setLoading, loading, error: submitError, reset } =
    useSignupStore();
  const email = emailFromStore || emailFromUrl;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onPasswordSubmit = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    setError(null);
    if (!email.trim()) {
      setError("Email is missing. Please go back and complete signup.");
      return;
    }

    setLoading(true);
    try {
      const result = await apiSetPassword(email.trim(), values.password, values.confirmPassword);
      reset();
      if (typeof window !== "undefined" && result?.data) {
        window.localStorage.setItem(
          AUTH_STORAGE_KEYS.ONBOARDING_COMPLETED,
          String(result.data.user?.onboardingCompleted ?? false)
        );
      }
      router.push("/auth/registrationsuccess");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const backHref = email
    ? `/auth/verify?email=${encodeURIComponent(email)}`
    : "/auth/signup";

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-3 sm:p-10 px-3 text-left">
          <div className="text-left text-white w-full md:hidden">
            <Link href={backHref}>
              <ChevronLeft />
            </Link>
          </div>

          <h2 className="text-[24px] font-serif text-white font-normal text-left w-full">
            Create new password
          </h2>

          <p className="text-base text-gray-300 text-left w-full">
            Enter and confirm your new password (min {MIN_PASSWORD_LENGTH}{" "}
            characters)
          </p> 

          <Form
            onSubmit={onPasswordSubmit}
            validate={validatePassword}
            initialValues={{ password: "", confirmPassword: "" }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5 w-full">
                {submitError && (
                  <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
                    {submitError}
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-white">New Password</Label>
                  <Field name="password">
                    {({ input }) => (
                      <div className="relative">
                        <Input
                          {...input}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          className={inputClass}
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    )}
                  </Field>
                  <FieldError name="password" />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Confirm new password</Label>
                  <Field name="confirmPassword">
                    {({ input }) => (
                      <div className="relative">
                        <Input
                          {...input}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          className={inputClass}
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((s) => !s)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          aria-label={
                            showConfirmPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    )}
                  </Field>
                  <FieldError name="confirmPassword" />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full text-base h-[52px] mt-[12px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating...
                    </span>
                  ) : (
                    "Create password"
                  )}
                </Button>
              </form>
            )}
          </Form>

          <p className="text-center text-sm text-white mt-4 w-full">
            Already have an account?{" "}
            <a href="/auth/signin" className="text-yellow-400 underline">
              Sign In
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function CreatePasswordFallback() {
  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-3 sm:p-10 px-3 text-left">
          <p className="text-white">Loading...</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CreatePasswordPage() {
  return (
    <Suspense fallback={<CreatePasswordFallback />}>
      <CreatePasswordForm />
    </Suspense>
  );
}
