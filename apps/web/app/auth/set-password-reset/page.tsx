"use client";

import { useState, Suspense, useEffect } from "react";
import { Form, Field } from "react-final-form";
import { Button, Card, CardContent, Input, Label } from "@repo/ui";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import * as yup from "yup";
import {
  validateResetToken,
  resetPasswordByToken,
} from "@/lib/api/auth";
import { MIN_PASSWORD_LENGTH } from "@/lib/constants";
import { ERROR_MESSAGES } from "@/lib/messages";
import { PASSWORD_REGEX } from "@/lib/validation/regex";

const setPasswordSchema = yup.object({
  password: yup
    .string()
    .required(ERROR_MESSAGES.VALIDATION.PASSWORD_REQUIRED)
    .matches(PASSWORD_REGEX, ERROR_MESSAGES.VALIDATION.PASSWORD_WEAK),
  confirmPassword: yup
    .string()
    .required(ERROR_MESSAGES.VALIDATION.CONFIRM_PASSWORD_REQUIRED)
    .oneOf(
      [yup.ref("password")],
      ERROR_MESSAGES.VALIDATION.PASSWORDS_DO_NOT_MATCH
    ),
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
          acc[path] = e.message ?? ERROR_MESSAGES.VALIDATION.INVALID;
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
  "bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)] border border-[#C8A851]/40  h-[52px] rounded-[12px] md:rounded-[8px] text-[#ffffff] placeholder:text-white/40 focus-visible:border-[#C8A851]/60 focus-visible:ring-0 focus-visible:ring-transparent";

function SetPasswordResetContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const errorParam = searchParams.get("error");

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (errorParam === "invalid_token" || !token?.trim()) {
      setTokenValid(false);
      return;
    }
    validateResetToken(token.trim())
      .then(() => setTokenValid(true))
      .catch(() => setTokenValid(false));
  }, [token, errorParam]);

  const onSubmit = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    if (!token?.trim()) return;
    setSubmitError(null);
    setLoading(true);
    try {
      await resetPasswordByToken(
        token.trim(),
        values.password,
        values.confirmPassword
      );
      setResetSuccess(true);
      // setTimeout(() => {
      //   router.push("/auth/signin?reset=success");
      // }, 2000);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : ERROR_MESSAGES.GENERAL.REQUEST_FAILED
      );
    } finally {
      setLoading(false);
    }
  };

  if (tokenValid === null && !errorParam) {
    return (
      <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
        <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
          <CardContent className="flex items-center flex-col gap-3 sm:p-10 px-3 text-left">
            <p className="text-white flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Checking link...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (tokenValid === false || errorParam === "invalid_token") {
    return (
      <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
        <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
          <CardContent className="flex items-center flex-col gap-3 sm:p-10 px-3 text-left">
            <div className="text-left text-white w-full md:hidden">
              <Link href="/auth/forgotpassword">
                <ChevronLeft />
              </Link>
            </div>
            <h1 className="text-[24px] font-serif text-white font-normal text-left w-full">
              Link invalid or expired
            </h1>
            <p className="text-base text-gray-300 text-left w-full flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              This reset link is invalid or has expired. Request a new link below.
            </p>
            <div className="mt-6 w-full">
              <Link href="/auth/forgotpassword" className="block w-full">
                <Button
                  type="button"
                  className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition"
                >
                  Request new link
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (resetSuccess) {
    return (
      <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
        <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
          <CardContent className="flex items-center flex-col gap-3 sm:p-10 px-3 text-left">
            <h1 className="text-[24px] font-serif text-white font-normal text-left w-full">
              Password updated
            </h1>
            <p className="text-base text-gray-300 text-left w-full">
              You can now sign in with your new password.
               {/* Redirecting... */}
            </p>
            <Link href="/auth/signin" className="text-yellow-400 underline mt-4">
              Sign in now
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col gap-3 sm:p-10 px-3 text-left">
          <div className="text-left text-white w-full md:hidden">
            <Link href="/auth/forgotpassword">
              <ChevronLeft />
            </Link>
          </div>

          <h2 className="text-[24px] font-serif text-white font-normal text-left w-full">
            Set new password
          </h2>
          <p className="text-base text-gray-300 text-left w-full">
            Enter and confirm your new password (min {MIN_PASSWORD_LENGTH}{" "}
            characters).
          </p>

          <Form
            onSubmit={onSubmit}
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
                  <Label className="text-white">New password</Label>
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
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
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
                          onClick={() =>
                            setShowConfirmPassword((s) => !s)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
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
                      Updating...
                    </span>
                  ) : (
                    "Set password"
                  )}
                </Button>
              </form>
            )}
          </Form>

          <p className="text-center text-sm text-white mt-4 w-full">
            Remember your password?{" "}
            <Link href="/auth/signin" className="text-yellow-400 underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SetPasswordResetPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
          <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
            <CardContent className="flex items-center flex-col gap-3 sm:p-10 px-3 text-left">
              <p className="text-white">Loading...</p>
            </CardContent>
          </Card>
        </div>
      }
    >
      <SetPasswordResetContent />
    </Suspense>
  );
}
