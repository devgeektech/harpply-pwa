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
          : "bg-white text-gray-700"
      }
      ${className}`}
    >
      {value}
    </button>
  );
}
