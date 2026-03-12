"use client";

import { useRouter } from "next/navigation";

type SignupModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function GoogleIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x={2} y={4} width={20} height={16} rx={2} />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

export function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const router = useRouter();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleContinueWithEmail = () => {
    onClose();
    router.push("/auth/signin");
  };

  return (
    <div
      className={`fixed inset-0 z-[300] flex items-end justify-center bg-black/75 ${isOpen ? "flex" : "hidden"}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Sign up"
    >
      <div
        className="relative w-full max-w-[430px] rounded-t-[20px] border-t border-[rgba(201,149,42,0.2)] bg-gradient-to-b from-[#1b0b42] to-[#0d0622] px-8 pb-14 pt-9"
        style={{
          animation: "harpply-panelUp 0.32s cubic-bezier(0.22, 1, 0.36, 1) both",
        }}
      >
        <button
          type="button"
          className="absolute right-6 top-5 flex h-[30px] w-[30px] items-center justify-center rounded-full border-none bg-white/[0.07] text-base text-white/75 transition-colors duration-200 hover:bg-white/[0.14]"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <div className="mx-auto mb-9 h-0.5 w-9 rounded-sm bg-white/20" />
        <div className="mb-1.5 text-center">
          <span className="font-[var(--font-cormorant),'Cormorant_Garamond',serif] text-[2.2rem] font-bold text-white [&_em]:font-normal [&_em]:bg-gradient-to-br [&_em]:from-[#f3d88a] [&_em]:to-[#c8952a] [&_em]:bg-clip-text [&_em]:[-webkit-text-fill-color:transparent]">
            <em>H</em>arpply
          </span>
        </div>
        <p className="mb-8 text-center text-[0.88rem] font-light text-white/75">
          Where Christian Singles Meet
        </p>

        <button
          type="button"
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border-none bg-white/[0.96] px-4 py-4 font-[var(--font-inter),'Inter',sans-serif] text-[0.88rem] font-semibold text-[#18182a] transition-colors duration-200 hover:bg-[#efefef]"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="my-4 flex items-center gap-4">
          <span className="h-px flex-1 bg-white/10" />
          <p className="text-[0.74rem] text-white/45">or</p>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <button
          onClick={() => handleContinueWithEmail()}
          type="button"
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border-none bg-white/[0.96] px-4 py-4 font-[var(--font-inter),'Inter',sans-serif] text-[0.88rem] font-semibold text-[#18182a] transition-colors duration-200 hover:bg-[#efefef]"
        >
          <EmailIcon />
          Continue with Email
        </button>

        <p className="mt-5 text-center text-[0.7rem] font-light leading-[1.7] text-white/45">
          By continuing, you agree to our{" "}
          <a href="#" className="text-white/75 underline underline-offset-2">
            Terms of Service
          </a>
          . Please review our{" "}
          <a href="#" className="text-white/75 underline underline-offset-2">
            Privacy Policy
          </a>{" "}
          to understand how we handle your information.
        </p>
        <div className="mt-5 rounded-lg bg-[#2563eb] px-4 py-2.5 text-center text-[0.7rem] tracking-[0.02em] text-white/80">
          Two-finger long press anywhere to open menu
        </div>
      </div>
    </div>
  );
}
