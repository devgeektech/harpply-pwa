interface Props {
    label: string;
    active: boolean;
    onClick: () => void;
  }
  
  export function ValueTag({ label, active, onClick }: Props) {
    return (
      <button
        onClick={onClick}
        className={`cursor-pointer px-3 py-1.5 rounded-[8px] text-sm font-medium border transition
        ${
          active
            ? "bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] border-transparent"
            : "bg-white text-black border-gray-200"
        }`}
      >
        {label}
      </button>
    );
  }