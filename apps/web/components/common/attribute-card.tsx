"use client";

import { useAttributesStore } from "@/store/useAttributesStore";
import { CheckboxField } from "@repo/ui";

interface Props {
  /** Sent to API / store (slug), not display title. */
  value: string;
  title: string;
  desc: string;
}

export default function AttributeCard({ value, title, desc }: Props) {
  const { selected, toggle } = useAttributesStore();
  const active = selected.includes(value);

  return (
    <div
      onClick={() => toggle(value)}
      className={`cursor-pointer rounded-xl border p-4 transition w-full
      ${active ? "border-yellow-400 bg-yellow-50" : "bg-white border-gray-200"}
      `}
    >
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">{title}</div>

        <CheckboxField
          label=""
          checked={active}
          onChange={() => toggle(value)}
          className="data-[state=checked]:bg-yellow-400 rounded-full data-[state=checked]:border-yellow-400"
        />
      </div>

      <p className="text-sm text-gray-500 mt-1">{desc}</p>
    </div>
  );
}
