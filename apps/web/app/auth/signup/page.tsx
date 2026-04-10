"use client";

import { Form, Field } from "react-final-form";
import { Button, Card, CardContent, Input, Label } from "@repo/ui";
import { Loader2 } from "lucide-react";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { registerEmail as apiRegisterEmail } from "@/lib/api/auth";
import { ERROR_MESSAGES } from "@/lib/messages";
import { useSignupStore } from "store/useSignupStore";
import { isValidEmail } from "@/lib/validation/regex";

const registerEmailSchema = yup.object({
  email: yup
    .string()
    .required(ERROR_MESSAGES.VALIDATION.EMAIL_REQUIRED)
    .test("is-valid-email", ERROR_MESSAGES.VALIDATION.EMAIL_INVALID, (value) =>
      typeof value === "string" ? isValidEmail(value) : false,
    ),
});

// --- Final-form validator from yup ---
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

const validateEmail = makeYupValidator(registerEmailSchema);

// --- Field wrapper to show error ---
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

export default function SignupPage() {
  const router = useRouter();
  const {
    setEmail,
    setLoading,
    setError,
    loading,
    error: submitError,
  } = useSignupStore();

  const onEmailSubmit = async (values: { email: string }) => {
    setError(null);
    setLoading(true);
    try {
      const result = await apiRegisterEmail(values.email);
      setEmail(values.email);
      if (result?.data?.requiresPassword) {
        router.push(
          `/auth/createpassword?email=${encodeURIComponent(values.email)}`,
        );
      } else {
        router.push(`/auth/verify?email=${encodeURIComponent(values.email)}`);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : ERROR_MESSAGES.GENERAL.REQUEST_FAILED,
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)] border border-[#C8A851]/40  h-[52px] rounded-[12px] md:rounded-[8px] text-[#ffffff] placeholder:text-white/40 focus-visible:border-[#C8A851]/60 focus-visible:ring-0 focus-visible:ring-transparent";

  return (
    <>
      <Card className="md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex items-center flex-col sm:p-10 py-[50px] px-3 text-left">
          <h1 className="w-full text-[24px] font-light text-white font-serif tracking-wider mb-[32px] md:mb-0">
            Create your account
          </h1>

          <Form
            onSubmit={onEmailSubmit}
            validate={validateEmail}
            initialValues={{ email: "" }}
          >
            {({ handleSubmit }) => (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 md:my-[50px] w-full"
              >
                <div className="space-y-2">
                  <Label className="text-gray-300 text-sm font-normal">
                    Email
                  </Label>
                  <Field name="email">
                    {({ input }) => (
                      <Input
                        {...input}
                        type="email"
                        placeholder="Email"
                        className={inputClass}
                      />
                    )}
                  </Field>
                  <FieldError name="email" />
                </div>

                {submitError && (
                  <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
                    {submitError}
                  </div>
                )}

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
                    "Sign up"
                  )}
                </Button>
              </form>
            )}
          </Form>

          <p className="text-center text-sm text-white mt-[20px]">
            Already have an account?{" "}
            <a href="/auth/signin" className="text-yellow-400 underline">
              Sign In
            </a>
          </p>
        </CardContent>
      </Card>
    </>
  );
}
