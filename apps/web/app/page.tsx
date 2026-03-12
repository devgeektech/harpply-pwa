"use client";

import { useState, useEffect } from "react";
import {
  Navbar,
  Hero,
  HowItWorks,
  WhyHarpply,
  Testimonials,
  Community,
  CTA,
  Footer,
  SignupModal,
  FloatingCTA,
} from "@/components/landing";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#0c0520] text-white font-[var(--font-inter),'Inter',sans-serif"
      style={{
        background:
          "radial-gradient(ellipse 70% 55% at 50% -5%, #2a1468 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 90% 20%, #1c0a50 0%, transparent 55%), radial-gradient(ellipse 30% 25% at 10% 50%, #140640 0%, transparent 60%), #0c0520",
      }}
    >
      <Navbar onOpenModal={openModal} />
      <main>
        <Hero onOpenModal={openModal} />
        <HowItWorks />
        <WhyHarpply />
        <Testimonials />
        <Community />
        <CTA onOpenModal={openModal} />
        <Footer />
      </main>
      <FloatingCTA onOpenModal={openModal} />
      <SignupModal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
}
