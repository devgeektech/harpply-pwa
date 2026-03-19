import type { Metadata } from "next";
import Link from "next/link";

const termlyTermsUrl =
  "https://app.termly.io/policy-viewer/policy.html?policyUUID=fda30730-e624-4d0f-9cf0-01ee321243bf#ppyes";

export const metadata: Metadata = {
  title: "Terms and Conditions | Harpply",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="relative h-[100dvh] w-full bg-white">
      <iframe
        title="Harpply Terms and Conditions"
        src={termlyTermsUrl}
        className="h-full w-full border-0"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* <Link
        href={termlyTermsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-2 text-[0.8rem] font-medium text-white no-underline backdrop-blur hover:bg-black/80"
      >
        Open in new tab
      </Link> */}
    </div>
  );
}

