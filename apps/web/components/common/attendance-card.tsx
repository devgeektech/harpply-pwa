"use client"

interface Props {
  label: string
  icon: React.ReactNode
  active: boolean
  onClick: () => void
}

export default function AttendanceCard({
  label,
  icon,
  active,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
      flex flex-col cursor-pointer items-center justify-center gap-3
      rounded-xl p-6 border transition
      ${
        active
          ? "border-[#C39936] bg-[#C3993614] text-[#C39936]"
          : "border-transparent bg-gray-200 text-black"
      }
      `}
    >
      {icon}
      <p className="text-[20px] font-normal">{label}</p>
    </button>
  )
}