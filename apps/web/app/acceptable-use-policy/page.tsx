import type { Metadata } from "next";

const termlyAcceptableUsePolicyUrl =
  "https://app.termly.io/policy-viewer/policy.html?policyUUID=e5689572-5aaa-472c-9ad3-197e3c7709c0";

export const metadata: Metadata = {
  title: "Acceptable Use Policy | Harpply",
};

export default function AcceptableUsePolicyPage() {
  return (
    <div className="relative h-[100dvh] w-full bg-white">
      <iframe
        title="Harpply Acceptable Use Policy"
        src={termlyAcceptableUsePolicyUrl}
        className="h-full w-full border-0"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

