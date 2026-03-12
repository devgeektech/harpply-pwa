"use client";

type FloatingCTAProps = {
  onOpenModal: () => void;
};

export function FloatingCTA({ onOpenModal }: FloatingCTAProps) {
  return (
    <div className="fixed bottom-6 left-1/2 z-[180] w-[calc(100%-3rem)] max-w-[360px] -translate-x-1/2 md:hidden">
      <button
        type="button"
        className="w-full cursor-pointer rounded-[5px] border-none bg-gradient-to-br from-[#e6b645] to-[#c8952a] px-6 py-3.5 font-[var(--font-inter),'Inter',sans-serif] text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#0c0520] shadow-[0_8px_32px_rgba(201,149,42,0.3)]"
        onClick={onOpenModal}
      >
        Create a Free Profile
      </button>
    </div>
  );
}
