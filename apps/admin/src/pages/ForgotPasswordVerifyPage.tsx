import { Button, Card, CardContent } from "@repo/ui";
import { Mail } from "lucide-react";

export function ForgotPasswordVerifyPage({
  email,
  onBackToLogin,
}: {
  email: string;
  onBackToLogin: () => void;
}) {
  return (
    <Card className="w-full max-w-[720px] bg-white/10 border border-white/15 rounded-2xl backdrop-blur-xl shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)]">
      <CardContent className="p-10 text-white text-center">
        <div className="w-full flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center">
            <Mail className="w-7 h-7 text-green-400" />
          </div>
        </div>

        <h1 className="text-[28px] font-serif font-normal text-white mb-4">
          Check your email
        </h1>

        <p className="text-base text-gray-300 mb-5">
          If an account exists with{" "}
          <span className="text-white font-medium">{email || "this email"}</span>, we sent a link
          to set a new password. Click the link in the email to continue.
        </p>

        <p className="text-sm text-gray-400 mb-8">
          The link expires in 1 hour. If you don&apos;t see the email, check your spam folder or
          try again.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-[420px] mx-auto">
          <Button
            type="button"
            onClick={onBackToLogin}
            className="cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition"
          >
            Back to sign in
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

