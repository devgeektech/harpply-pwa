"use client";

import { useState } from "react";
import { useAuthStore } from "store/useAuthStore";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from "@repo/ui";
import { Loader2 } from "lucide-react";
import Link from "next/link";
export default function SignupPage() {
  const { email, setEmail, reset, loading, setLoading, error, setError } =
    useAuthStore();

  const [open, setOpen] = useState(false); // ✅ modal state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    // validation
    if (!email) {
      setError("Email field is required.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log({ email });

      reset();

      setOpen(true); // ✅ open modal after success
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center px-4">
        <Card className="md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
          <CardContent className="flex items-center flex-col sm:p-10 px-3 text-left">
            <h1 className="w-full text-[24px] font-light text-white font-serif tracking-wider mb-[32px] md:mb-0">
              Create your account
            </h1>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 md:my-[50px] w-full"
            >
              {/* Email */}
              <div className="space-y-2">
                <Label className="text-gray-300 text-sm font-normal">
                  Email
                </Label>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white h-[52px] border border-[#E7ECF2] rounded-[12px] md:rounded-[8px] text-[#3B3B3B] placeholder:text-[#3B3B3B] focus-visible:ring-0"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
                  {error}
                </div>
              )}

              {/* Submit */}
              <Button
                onClick={() => setOpen(true)}
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

            <p className="text-center text-sm text-white mt-[20px]">
              Already have an account?{" "}
              <a href="/auth/signin" className="text-yellow-400 underline">
                Sign In
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[550px] ">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-center text-[24px] font-normal font-serif">
              Verify your email
            </DialogTitle>

            <DialogDescription className="text-center text-[18px] text-gray-500 mt-2">
              OTP sent to your email
              <span className="ms-2 font-medium text-black">
                abc***@*****.com
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="cursor-pointer text-center flex items-center justify-center w-full text-base h-[52px] mt-[12px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60">
            <Link href={"/"}>Resend</Link>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
