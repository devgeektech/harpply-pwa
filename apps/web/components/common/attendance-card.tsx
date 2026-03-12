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
      flex flex-col items-center justify-center gap-3
      rounded-xl p-6 border transition
      ${
        active
          ? "border-yellow-500 bg-[#2a143f] text-yellow-400"
          : "border-transparent bg-gray-200 text-black"
      }
      `}
    >
      {icon}
      <p className="text-sm font-medium">{label}</p>
    </button>
  )
}