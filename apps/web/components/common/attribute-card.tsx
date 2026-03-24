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

export default function AttributeCard({ title, desc, isSelected, onToggle }: Props) {
  return (
    <div
      onClick={onToggle}
      className={`cursor-pointer rounded-xl border p-4 transition
      ${isSelected ? "border-yellow-400 bg-yellow-50" : "bg-white border-gray-200"}
      `}
    >
      <div className="flex justify-between items-start">
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
