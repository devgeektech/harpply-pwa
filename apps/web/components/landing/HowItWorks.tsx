import { FadeIn } from "./FadeIn";

/** .gold-text from reference HTML */
const goldTextStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #f3d88a 0%, #e6b645 40%, #c8952a 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/** .eyebrow */
const eyebrowStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter), 'Inter', sans-serif",
  fontSize: "0.68rem",
  fontWeight: 500,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#e6b645",
  marginBottom: "1rem",
  display: "block",
};

/** .sec-title (h2) */
const secTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
  fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
  fontWeight: 600,
  lineHeight: 1.15,
  letterSpacing: "-0.01em",
};

/** .sec-sub */
const secSubStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter), 'Inter', sans-serif",
  fontSize: "0.9rem",
  fontWeight: 300,
  lineHeight: 1.85,
  color: "rgba(255, 255, 255, 0.75)",
  maxWidth: "520px",
  margin: "1rem auto 0",
};

/** .step-num */
const stepNumStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter), 'Inter', sans-serif",
  fontSize: "0.62rem",
  fontWeight: 600,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#c8952a",
  marginBottom: "1.4rem",
  display: "block",
};

/** .step-card h3 */
const stepTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
  fontSize: "1.2rem",
  fontWeight: 600,
  marginBottom: "0.8rem",
  letterSpacing: "-0.01em",
};

/** .step-card p */
const stepBodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter), 'Inter', sans-serif",
  fontSize: "0.86rem",
  color: "rgba(255, 255, 255, 0.75)",
  lineHeight: 1.8,
  fontWeight: 300,
};

const STEPS = [
  {
    num: "01",
    title: "Build Your Profile",
    description:
      "Share your denomination, spiritual disciplines, faith background, and what matters most to you in a partner.",
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
      "Every account undergoes verification. Moderation tools help keep the community respectful, wholesome, and trustworthy.",
  },
  {
    num: "04",
    title: "Built by Believers, for Believers",
    description:
      "Harpply was founded by Christians who found love through faith-based connection online — this very same way. Every feature reflects that personal journey and the conviction that God moves in every season, including this one.",
  },
];

export function HowItWorks() {
  return (
    <section
      className="px-8 py-24"
      id="how"
      style={{
        padding: "6rem 2rem",
        background:
          "linear-gradient(180deg, #0c0520 0%, #160840 50%, #0c0520 100%)",
      }}
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="text-center" style={{ marginBottom: "4rem" }}>
          <FadeIn>
            <span style={eyebrowStyle}>The Process</span>
          </FadeIn>
          <FadeIn>
            <h2 style={secTitleStyle}>
              A Thoughtful Path
              <br /> to <span style={goldTextStyle}>Connection</span>
            </h2>
          </FadeIn>
          <FadeIn>
            <p style={secSubStyle}>
              Every step is intentionally designed to honour your faith and
              protect your journey toward a lasting partnership.
            </p>
          </FadeIn>
        </div>
        <FadeIn>
          <div className="grid grid-cols-1 overflow-hidden rounded-[14px] border border-[rgba(201,149,42,0.18)] min-[901px]:grid-cols-4 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="border-b border-r-0 border-[rgba(201,149,42,0.12)] px-8 transition-colors duration-300 last:border-b-0 hover:bg-[rgba(201,149,42,0.04)] max-[900px]:border-r max-[900px]:even:border-r-0 min-[901px]:border-b-0 min-[901px]:border-r min-[901px]:last:border-r-0"
                style={{ padding: "2.5rem 2rem" }}
              >
                <span style={stepNumStyle}>Step {step.num}</span>
                <div
                  className="h-px w-7"
                  style={{
                    marginBottom: "1.4rem",
                    background:
                      "linear-gradient(90deg, #e6b645, transparent)",
                  }}
                />
                <h3 style={stepTitleStyle}>{step.title}</h3>
                <p style={stepBodyStyle}>{step.description}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
