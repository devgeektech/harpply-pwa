interface Props {
    label: string;
    active: boolean;
    onClick: () => void;
  }
  
  export function ValueTag({ label, active, onClick }: Props) {
    return (
      <button
        onClick={onClick}
        className={`cursor-pointer px-3 py-1.5 rounded-[8px] text-xs font-medium border transition
        ${
          active
            ? "bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] border-transparent"
            : "bg-[linear-gradient(180deg,rgba(167,139,218,0.22)_0%,rgba(55,35,95,0.65)_100%)] text-white border-[#a78bda]/40"
        }`}
      >
        {label}
      </button>
    );
  }