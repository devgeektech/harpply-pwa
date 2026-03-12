import { FadeIn } from "./FadeIn";

const FEATURES = [
  {
    num: "01",
    title: "Faith-Led Compatibility",
    description:
      "Our matching framework prioritises biblical worldview alignment, spiritual maturity, and shared life values. We believe the right foundation changes everything about the relationship that follows.",
    verse: '"He who finds a wife finds a good thing." — Proverbs 18:22',
  },
  {
    num: "02",
    title: "Safety and Integrity",
    description:
      "Robust identity verification, AI-assisted moderation, and transparent reporting tools ensure a secure environment where members can engage with confidence and trust.",
    verse: '"He will cover you with his feathers." — Psalm 91:4',
  },
  {
    num: "03",
    title: "A Living Community",
    description:
      "Harpply is more than a matching service. Members access daily devotionals, prayer circles, regional singles gatherings, and accountability partnerships throughout the year.",
    verse: '"Two are better than one." — Ecclesiastes 4:9',
  },
  {
    num: "04",
    title: "Proven Outcomes",
    description:
      "More than 2,000 marriages and counting. Our commitment is not to engagement metrics — it is to lasting, God-centred unions built on a foundation that endures.",
    verse: '"Plans to prosper you and not to harm you." — Jeremiah 29:11',
  },
];

const goldGradientText =
  "bg-gradient-to-br from-[#f3d88a] via-[#e6b645] to-[#c8952a] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]";

export function WhyHarpply() {
  return (
    <section className="bg-[#0c0520] px-8 py-24" id="why">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-16 text-center">
          <FadeIn>
            <span className="mb-4 block text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[#e6b645]">
              Our Commitment
            </span>
          </FadeIn>
          <FadeIn>
            <h2 className="font-[var(--font-cormorant),'Cormorant_Garamond',serif] text-[clamp(2rem,4.5vw,3.2rem)] font-semibold leading-[1.15] tracking-[-0.01em]">
              Built on <span className={goldGradientText}>Principle</span>
            </h2>
          </FadeIn>
          <FadeIn>
            <p className="mx-auto mt-4 max-w-[500px] text-[0.9rem] font-light leading-[1.85] text-white/75">
              Harpply was founded by believers who understand that the foundation
              of a lasting, flourishing relationship begins with shared faith.
            </p>
          </FadeIn>
        </div>
        <FadeIn>
          <div className="grid overflow-hidden rounded-[14px] border border-[rgba(201,149,42,0.15)] bg-[rgba(201,149,42,0.15)] max-[900px]:grid-cols-1 min-[901px]:grid-cols-2" style={{ gap: "1.5px" }}>
            {FEATURES.map((feat) => (
              <div
                key={feat.num}
                className="bg-[#0c0520] px-10 py-12 transition-colors duration-300 hover:bg-[rgba(201,149,42,0.04)]"
              >
                <div className="font-[var(--font-cormorant),'Cormorant_Garamond',serif] mb-6 text-[3.5rem] font-bold leading-none text-[rgba(201,149,42,0.14)]">
                  {feat.num}
                </div>
                <h3 className="font-[var(--font-cormorant),'Cormorant_Garamond',serif] mb-3 text-[1.4rem] font-semibold tracking-[-0.01em]">
                  {feat.title}
                </h3>
                <p className="text-[0.88rem] font-light leading-[1.82] text-white/75">
                  {feat.description}
                </p>
                <p className="mt-5 font-[var(--font-cormorant),'Cormorant_Garamond',serif] text-[0.8rem] italic tracking-[0.02em] text-[#c8952a]">
                  {feat.verse}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
