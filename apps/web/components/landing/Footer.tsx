import Image from "next/image";
import Link from "next/link";


const goldGradientLogo =
  "bg-gradient-to-br from-[#f3d88a] to-[#c8952a] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(201,149,42,0.12)] bg-[#0c0520] px-8 pb-10 pt-16">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid grid-cols-1 gap-10 border-b border-white/[0.06] pb-12 min-[421px]:grid-cols-2 min-[641px]:grid-cols-3 min-[1101px]:grid-cols-[1.6fr_1fr_1fr_1fr_1.3fr]">
          <div>
            <Link
              className="flex items-center gap-1.5 no-underline"
              href="#"
            >
              <Image
                src="/images/logo.svg"
                alt="Harpply"
                className="block h-auto w-full max-w-[140px] object-contain"
                width={140}
                height={40}
                priority
              />
            </Link>
            <p className="font-[var(--font-inter),'Inter',sans-serif] mt-4 max-w-[240px] text-[0.84rem] font-light leading-[1.8] text-white/45">
              Where Christian singles meet. A faith-centred platform committed
              to meaningful, God-honouring connection.
            </p>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-[var(--font-inter),'Inter',sans-serif] mb-[1.2rem] block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/45">
              Platform
            </span>
            <Link
              href="#how"
              className="font-[var(--font-inter),'Inter',sans-serif] mb-[0.6rem] block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              How It Works
            </Link>
            <Link
              href="#"
              className="font-[var(--font-inter),'Inter',sans-serif] mb-[0.6rem] block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Pricing
            </Link>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-[var(--font-inter),'Inter',sans-serif] mb-[1.2rem] block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/45">
              Community
            </span>
            <Link
              href="#"
              className="font-[var(--font-inter),'Inter',sans-serif] mb-[0.6rem] block whitespace-nowrap text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Newsletter
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[var(--font-inter),'Inter',sans-serif] mb-[0.6rem] block whitespace-nowrap text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Instagram
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[var(--font-inter),'Inter',sans-serif] mb-[0.6rem] block whitespace-nowrap text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              TikTok
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[var(--font-inter),'Inter',sans-serif] mb-[0.6rem] block whitespace-nowrap text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Facebook
            </Link>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-[var(--font-inter),'Inter',sans-serif] mb-[1.2rem] block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/45">
              Company
            </span>
            <Link
              href="#"
              className="font-[var(--font-inter),'Inter',sans-serif] mb-[0.6rem] block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              About Us
            </Link>
            <Link
              href="#"
              className="font-[var(--font-inter),'Inter',sans-serif] mb-[0.6rem] block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Our Mission
            </Link>
            <Link
              href="#"
              className="font-[var(--font-inter),'Inter',sans-serif] mb-[0.6rem] block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Contact
            </Link>
            <Link
              href="#"
              className="font-[var(--font-inter),'Inter',sans-serif] mb-[0.6rem] block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Help Desk Ticket
            </Link>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-[var(--font-inter),'Inter',sans-serif] mb-[1.2rem] block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/45">
              Policies
            </span>
            <Link
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[var(--font-inter),'Inter',sans-serif] mb-[0.6rem] block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Terms and Conditions
            </Link>
            <Link
              href="https://app.termly.io/policy-viewer/policy.html?policyUUID=907a765b-ecbd-42f8-8270-fdc29aa73491"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[var(--font-inter),'Inter',sans-serif] mb-[0.6rem] block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="https://app.termly.io/policy-viewer/policy.html?policyUUID=9d357e10-c829-4d48-b795-ac504dc32250"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[var(--font-inter),'Inter',sans-serif] mb-[0.6rem] block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Disclaimer
            </Link>
            <Link
              href="https://app.termly.io/policy-viewer/policy.html?policyUUID=d6998107-6366-425a-829d-dd7a596ba0c3"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[var(--font-inter),'Inter',sans-serif] mb-[0.6rem] block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Cookie Policy
            </Link>
            <Link
              href="https://app.termly.io/policy-viewer/policy.html?policyUUID=e5689572-5aaa-472c-9ad3-197e3c7709c0"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[var(--font-inter),'Inter',sans-serif] mb-[0.6rem] block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Acceptable Use Policy
            </Link>
            <Link
              href="#"
              className="font-[var(--font-inter),'Inter',sans-serif] mb-[0.6rem] block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Online Dating Safety Policy
            </Link>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="font-[var(--font-inter),'Inter',sans-serif] text-[0.76rem] font-light text-white/45">
            &copy; 2026 Harpply LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
