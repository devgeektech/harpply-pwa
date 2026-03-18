import type { Metadata } from "next";

const termlyPrivacyUrl =
  "https://app.termly.io/policy-viewer/policy.html?policyUUID=907a765b-ecbd-42f8-8270-fdc29aa73491";

export const metadata: Metadata = {
  title: "Privacy Policy | Harpply",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative h-[100dvh] w-full bg-white">
      <iframe
        title="Harpply Privacy Policy"
        src={termlyPrivacyUrl}
        className="h-full w-full border-0"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

