import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(201,149,42,0.12)] bg-[#0c0520] px-8 pb-10 pt-16">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-12 max-[480px]:grid-cols-1 max-[900px]:grid-cols-2 min-[901px]:grid-cols-[2.2fr_1fr_1fr_1fr]">
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
            <p className="mt-4 max-w-[240px] text-[0.84rem] font-light leading-[1.8] text-white/45">
              Where Christian singles meet. A faith-centred platform committed
              to meaningful, God-honouring connection across 140 countries.
            </p>
            <div className="mt-5 flex gap-2.5">
              <a
                className="flex h-8 w-8 items-center justify-center rounded border border-white/10 text-[0.7rem] font-semibold text-white/45 no-underline transition-all duration-200 hover:border-[#c8952a] hover:text-[#e6b645]"
                href="#"
                aria-label="Instagram"
              >
                In
              </a>
              <a
                className="flex h-8 w-8 items-center justify-center rounded border border-white/10 text-[0.7rem] font-semibold text-white/45 no-underline transition-all duration-200 hover:border-[#c8952a] hover:text-[#e6b645]"
                href="#"
                aria-label="X"
              >
                X
              </a>
              <a
                className="flex h-8 w-8 items-center justify-center rounded border border-white/10 text-[0.7rem] font-semibold text-white/45 no-underline transition-all duration-200 hover:border-[#c8952a] hover:text-[#e6b645]"
                href="#"
                aria-label="Facebook"
              >
                Fb
              </a>
              <a
                className="flex h-8 w-8 items-center justify-center rounded border border-white/10 text-[0.7rem] font-semibold text-white/45 no-underline transition-all duration-200 hover:border-[#c8952a] hover:text-[#e6b645]"
                href="#"
                aria-label="YouTube"
              >
                Yt
              </a>
            </div>
          </div>
          <div>
            <span className="mb-5 block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/45">
              Platform
            </span>
            <Link
              href="#how"
              className="mb-2.5 block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              How It Works
            </Link>
            <Link
              href="#why"
              className="mb-2.5 block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Features
            </Link>
            <Link
              href="#"
              className="mb-2.5 block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Pricing{" "}
              <span className="ml-1.5 inline-block rounded border border-[rgba(201,149,42,0.4)] px-1.5 py-0.5 align-middle text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-[#c8952a]">
                Soon
              </span>
            </Link>
          </div>
          <div>
            <span className="mb-5 block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/45">
              Community
            </span>
            <Link
              href="#stories"
              className="mb-2.5 block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Testimonials
            </Link>
            <Link
              href="#community"
              className="mb-2.5 block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Devotionals
            </Link>
            <Link
              href="#community"
              className="mb-2.5 block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Prayer Circles
            </Link>
            <Link
              href="#"
              className="mb-2.5 block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Blog{" "}
              <span className="ml-1.5 inline-block rounded border border-[rgba(201,149,42,0.4)] px-1.5 py-0.5 align-middle text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-[#c8952a]">
                Soon
              </span>
            </Link>
            <Link
              href="#"
              className="mb-2.5 block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Newsletter{" "}
              <span className="ml-1.5 inline-block rounded border border-[rgba(201,149,42,0.4)] px-1.5 py-0.5 align-middle text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-[#c8952a]">
                Soon
              </span>
            </Link>
          </div>
          <div>
            <span className="mb-5 block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/45">
              Company
            </span>
            <Link
              href="#"
              className="mb-2.5 block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              About Us{" "}
              <span className="ml-1.5 inline-block rounded border border-[rgba(201,149,42,0.4)] px-1.5 py-0.5 align-middle text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-[#c8952a]">
                Soon
              </span>
            </Link>
            <Link
              href="#"
              className="mb-2.5 block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Our Mission{" "}
              <span className="ml-1.5 inline-block rounded border border-[rgba(201,149,42,0.4)] px-1.5 py-0.5 align-middle text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-[#c8952a]">
                Soon
              </span>
            </Link>
            <Link
              href="#"
              className="mb-2.5 block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Safety Centre{" "}
              <span className="ml-1.5 inline-block rounded border border-[rgba(201,149,42,0.4)] px-1.5 py-0.5 align-middle text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-[#c8952a]">
                Soon
              </span>
            </Link>
            <Link
              href="#"
              className="mb-2.5 block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Privacy Policy{" "}
              <span className="ml-1.5 inline-block rounded border border-[rgba(201,149,42,0.4)] px-1.5 py-0.5 align-middle text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-[#c8952a]">
                Soon
              </span>
            </Link>
            <Link
              href="#"
              className="mb-2.5 block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Terms of Service{" "}
              <span className="ml-1.5 inline-block rounded border border-[rgba(201,149,42,0.4)] px-1.5 py-0.5 align-middle text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-[#c8952a]">
                Soon
              </span>
            </Link>
            <Link
              href="#"
              className="mb-2.5 block text-[0.84rem] font-light text-white/75 no-underline transition-colors duration-200 hover:text-white"
            >
              Contact{" "}
              <span className="ml-1.5 inline-block rounded border border-[rgba(201,149,42,0.4)] px-1.5 py-0.5 align-middle text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-[#c8952a]">
                Soon
              </span>
            </Link>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[0.76rem] font-light text-white/45">
            &copy; {new Date().getFullYear()} Harpply Inc. All rights reserved.
          </p>
          <p className="font-[var(--font-cormorant),'Cormorant_Garamond',serif] text-[0.88rem] italic text-[#c8952a]">
            &quot;He who finds a wife finds a good thing.&quot; — Proverbs 18:22
          </p>
        </div>
      </div>
    </footer>
  );
}
