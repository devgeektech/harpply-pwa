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

export function HowItWorks() {
  return (
    <section className="harpply-section harpply-how-bg" id="how">
      <div className="harpply-section-inner">
        <div className="harpply-section-header">
          <FadeIn>
            <span className="harpply-eyebrow">The Process</span>
          </FadeIn>
          <FadeIn>
            <h2 className="harpply-sec-title">
              A Thoughtful Path
              <br /> to <span className="harpply-gold-text">Connection</span>
            </h2>
          </FadeIn>
          <FadeIn>
            <p className="harpply-sec-sub">
              Every step is intentionally designed to honour your faith and
              protect your journey toward a lasting partnership.
            </p>
          </FadeIn>
        </div>
        <FadeIn>
          <div className="harpply-steps-grid">
            {STEPS.map((step) => (
              <div key={step.num} className="harpply-step-card">
                <span className="harpply-step-num">Step {step.num}</span>
                <div className="harpply-step-rule" />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
