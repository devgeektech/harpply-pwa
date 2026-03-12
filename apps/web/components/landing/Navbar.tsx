"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type NavbarProps = {
  onOpenModal: () => void;
};

export function Navbar({ onOpenModal }: NavbarProps) {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] border-b border-[rgba(201,149,42,0.14)] bg-[rgba(12,5,32,0.9)] backdrop-blur-[16px]">
      <div className="mx-auto flex h-[66px] max-w-[1180px] items-center justify-between px-8">
        <Link
          className="flex items-center gap-1.5 no-underline"
          href="#"
        >
          <Image
            src="/images/logo.svg"
            alt="Harpply"
            className="block h-auto w-full max-w-[140px] object-contain sm:max-w-[160px]"
            width={140}
            height={40}
            priority
          />
        </Link>
        <nav className="hidden items-center gap-9 md:flex">
          <Link
            href="#how"
            className="text-[0.78rem] font-medium uppercase tracking-[0.06em] text-white/75 no-underline transition-colors duration-200 hover:text-white"
          >
            How It Works
          </Link>
          <Link
            href="#why"
            className="text-[0.78rem] font-medium uppercase tracking-[0.06em] text-white/75 no-underline transition-colors duration-200 hover:text-white"
          >
            Why Harpply
          </Link>
          <Link
            href="#stories"
            className="text-[0.78rem] font-medium uppercase tracking-[0.06em] text-white/75 no-underline transition-colors duration-200 hover:text-white"
          >
            Testimonials
          </Link>
          <Link
            href="#community"
            className="text-[0.78rem] font-medium uppercase tracking-[0.06em] text-white/75 no-underline transition-colors duration-200 hover:text-white"
          >
            Community
          </Link>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            className="inline-block rounded border border-white/20 px-4 py-1.5 text-[0.78rem] font-medium uppercase tracking-[0.06em] text-white/75 no-underline transition-all duration-200 hover:border-[#c8952a] hover:text-[#e6b645]"
            onClick={() => router.push("/auth/signupemail")}
          >
            Sign In
          </button>
          <button
            type="button"
            className="inline-block cursor-pointer rounded border-none bg-gradient-to-br from-[#e6b645] to-[#c8952a] px-5 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-[#0c0520] no-underline transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
            onClick={() => router.push("/auth/signupemail")}
          >
            Get Started
          </button>
        </div>
        <button
          type="button"
          id="hamburger"
          className="flex flex-col gap-1.5 border-none bg-transparent p-1 md:hidden"
          onClick={onOpenModal}
          aria-label="Open menu"
        >
          <span className="block h-0.5 w-[22px] rounded-sm bg-white/75" />
          <span className="block h-0.5 w-[22px] rounded-sm bg-white/75" />
          <span className="block h-0.5 w-[22px] rounded-sm bg-white/75" />
        </button>
      </div>
    </header>
  );
}
