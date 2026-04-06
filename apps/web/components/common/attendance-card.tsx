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
          ? "border-[#C39936] bg-[linear-gradient(180deg,rgba(243,211,93,0.18)_0%,rgba(120,52,8,0.35)_100%)] text-[#C39936]"
          : "border-[#C8A851]/18 bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)] text-white"
      }
      `}
    >
      {icon}
      <p className="text-[20px] font-normal">{label}</p>
    </button>
  )
}