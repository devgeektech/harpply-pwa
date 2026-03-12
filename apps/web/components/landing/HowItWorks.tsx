import { FadeIn } from "./FadeIn";

const STEPS = [
  {
    num: "01",
    title: "Build Your Faith Profile",
    description:
      "Share your denomination, spiritual disciplines, church community, and what matters most to you in a partner. Depth is valued over surface-level detail.",
  },
  {
    num: "02",
    title: "Scripture-Aligned Matching",
    description:
      "Our compatibility framework weighs shared biblical values, faith maturity, and life vision — not simply proximity or appearance.",
  },
  {
    num: "03",
    title: "Verified and Secure",
    description:
      "Every account undergoes identity verification. Continuous moderation ensures the community remains respectful, wholesome, and trustworthy.",
  },
  {
    num: "04",
    title: "Intentional Conversation",
    description:
      "Begin with guided prompts drawn from scripture — crafted to foster genuine, substantive dialogue from the very first message.",
  },
];

const goldGradientText =
  "bg-gradient-to-br from-[#f3d88a] via-[#e6b645] to-[#c8952a] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]";

export function HowItWorks() {
  return (
    <section
      className="px-8 py-24"
      id="how"
      style={{
        background:
          "linear-gradient(180deg, #0c0520 0%, #160840 50%, #0c0520 100%)",
      }}
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-16 text-center">
          <FadeIn>
            <span className="mb-4 block text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[#e6b645]">
              The Process
            </span>
          </FadeIn>
          <FadeIn>
            <h2 className="font-[var(--font-cormorant),'Cormorant_Garamond',serif] text-[clamp(2rem,4.5vw,3.2rem)] font-semibold leading-[1.15] tracking-[-0.01em]">
              A Thoughtful Path
              <br /> to <span className={goldGradientText}>Connection</span>
            </h2>
          </FadeIn>
          <FadeIn>
            <p className="mx-auto mt-4 max-w-[500px] text-[0.9rem] font-light leading-[1.85] text-white/75">
              Every step is intentionally designed to honour your faith and
              protect your journey toward a lasting partnership.
            </p>
          </FadeIn>
        </div>
        <FadeIn>
          <div className="grid grid-cols-4 overflow-hidden rounded-[14px] border border-[rgba(201,149,42,0.18)] max-[720px]:grid-cols-1 max-[900px]:grid-cols-2">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="border-r border-[rgba(201,149,42,0.12)] px-8 py-10 transition-colors duration-300 last:border-r-0 hover:bg-[rgba(201,149,42,0.04)] max-[900px]:border-b max-[900px]:last:border-r max-[900px]:last:border-[rgba(201,149,42,0.12)]"
              >
                <span className="mb-5 block text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#c8952a]">
                  Step {step.num}
                </span>
                <div className="mb-5 h-px w-7 bg-gradient-to-r from-[#e6b645] to-transparent" />
                <h3 className="font-[var(--font-cormorant),'Cormorant_Garamond',serif] mb-3 text-xl font-semibold tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="text-[0.86rem] font-light leading-[1.8] text-white/75">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
