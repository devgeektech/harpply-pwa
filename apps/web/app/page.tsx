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
    <div className="harpply-landing harpply-page-bg">
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
