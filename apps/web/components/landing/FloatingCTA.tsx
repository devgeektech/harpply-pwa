"use client";

type FloatingCTAProps = {
  onOpenModal: () => void;
};

export function FloatingCTA({ onOpenModal }: FloatingCTAProps) {
  return (
    <div className="harpply-float-cta">
      <button type="button" onClick={onOpenModal}>
        Create a Free Profile
      </button>
    </div>
  );
}
