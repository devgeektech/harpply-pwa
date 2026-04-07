interface Props {
  value: string;
  selected: string;
  onSelect: (value: string) => void;
  className?: string;
}

export function ToggleOption({
  value,
  selected,
  onSelect,
  className = "",
}: Props) {
  const active = selected === value;

  return (
    <button
      onClick={() => onSelect(value)}
      className={`cursor-pointer rounded-[8px] text-sm font-medium transition px-4 py-2
      ${
        active
          ? "text-[#913C01] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)]"
          : "text-white border border-[#a78bda]/40 bg-[linear-gradient(180deg,rgba(167,139,218,0.22)_0%,rgba(55,35,95,0.65)_100%)]"
      }
      ${className}`}
    >
      {value}
    </button>
  );
}
