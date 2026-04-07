import type { Metadata } from "next";

const termlyDisclaimerUrl =
  "https://app.termly.io/policy-viewer/policy.html?policyUUID=9d357e10-c829-4d48-b795-ac504dc32250";


export const metadata: Metadata = {
  title: "Disclaimer | Harpply",
};

export default function DisclaimerPage() {
  return (
    <div className="relative h-[100dvh] w-full bg-white">
      <iframe
        title="Harpply Disclaimer"
        src={termlyDisclaimerUrl}
        className="h-full w-full border-0"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

