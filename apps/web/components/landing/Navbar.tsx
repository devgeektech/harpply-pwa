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
    <header className="harpply-navbar">
      <div className="harpply-nav-inner">
        <Link className="harpply-logo-wrap" href="#">
          <Image
            src="/images/logo.svg"
            alt="Harpply"
            className="harpply-logo-img"
            width={140}
            height={40}
            priority
          />
        </Link>
        <nav className="harpply-nav-links">
          <Link href="#how">How It Works</Link>
          <Link href="#why">Why Harpply</Link>
          <Link href="#stories">Testimonials</Link>
          <Link href="#community">Community</Link>
        </nav>
        <div className="harpply-nav-actions">
          <button
            type="button"
            className="harpply-btn-ghost"
            onClick={() => router.push("/auth/signin")}
          >
            Sign In
          </button>
          <button
            type="button"
            className="harpply-btn-primary"
            onClick={() => router.push("/auth/signup")}
          >
            Get Started
          </button>
        </div>
        <button
          type="button"
          id="hamburger"
          className="harpply-hamburger"
          onClick={onOpenModal}
          aria-label="Open menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
