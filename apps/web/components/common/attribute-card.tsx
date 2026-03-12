"use client";

import { useAttributesStore } from "@/store/useAttributesStore";
import { CheckboxField } from "@repo/ui";

interface Props {
  title: string;
  desc: string;
}

export default function AttributeCard({ title, desc }: Props) {
  const { selected, toggle } = useAttributesStore();
  const active = selected.includes(title);

  return (
    <div
      onClick={() => toggle(title)}
      className={`cursor-pointer rounded-xl border p-4 transition
      ${active ? "border-yellow-400 bg-yellow-50" : "bg-white border-gray-200"}
      `}
    >
      <div className="flex justify-between items-start">
        <div className="text-lg font-semibold">{title}</div>

        <CheckboxField
          label=""
          checked={active}
          onChange={() => toggle(title)}
          className="data-[state=checked]:bg-yellow-400 rounded-full data-[state=checked]:border-yellow-400"
        />
      </div>

      <p className="text-sm text-gray-500 mt-1">{desc}</p>
    </div>
  );
}
