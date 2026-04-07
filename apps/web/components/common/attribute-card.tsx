"use client";

import { CheckboxField } from "@repo/ui";

interface Props {
  /** Sent to API / store (slug), not display title. */
  value: string;
  title: string;
  desc: string;
  isSelected: boolean;
  onToggle: () => void;
}

export default function AttributeCard({
  title,
  desc,
  isSelected,
  onToggle,
}: Props) {
  return (
    <div
      onClick={onToggle}
      className={`cursor-pointer rounded-xl border p-4 transition
      ${isSelected ? "border-yellow-400 bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)] text-white" : "bg-[linear-gradient(180deg,rgba(167,139,218,0.22)_0%,rgba(55,35,95,0.65)_100%)] border-white/40 text-white/80"}
      `}
    >
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">{title}</div>

        <CheckboxField
          label=""
          checked={isSelected}
          onChange={onToggle}
          className="data-[state=checked]:bg-yellow-400 rounded-full data-[state=checked]:border-yellow-400"
        />
      </div>

      <p className="text-gray-500 mt-1 text-sm">{desc}</p>
    </div>
  );
}
