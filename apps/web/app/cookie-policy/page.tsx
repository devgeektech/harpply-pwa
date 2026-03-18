import type { Metadata } from "next";

const termlyCookieUrl =
  "https://app.termly.io/policy-viewer/policy.html?policyUUID=d6998107-6366-425a-829d-dd7a596ba0c3";

export const metadata: Metadata = {
  title: "Cookie Policy | Harpply",
};

export default function CookiePolicyPage() {
  return (
    <div className="relative h-[100dvh] w-full bg-white">
      <iframe
        title="Harpply Cookie Policy"
        src={termlyCookieUrl}
        className="h-full w-full border-0"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

