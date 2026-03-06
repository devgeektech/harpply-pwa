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

export function WhyHarpply() {
  return (
    <section className="harpply-section" id="why" style={{ background: "var(--deep)" }}>
      <div className="harpply-section-inner">
        <div className="harpply-section-header">
          <FadeIn>
            <span className="harpply-eyebrow">Our Commitment</span>
          </FadeIn>
          <FadeIn>
            <h2 className="harpply-sec-title">
              Built on <span className="harpply-gold-text">Principle</span>
            </h2>
          </FadeIn>
          <FadeIn>
            <p className="harpply-sec-sub">
              Harpply was founded by believers who understand that the foundation
              of a lasting, flourishing relationship begins with shared faith.
            </p>
          </FadeIn>
        </div>
        <FadeIn>
          <div className="harpply-features-grid">
            {FEATURES.map((feat) => (
              <div key={feat.num} className="harpply-feature-card">
                <div className="harpply-feat-num">{feat.num}</div>
                <h3>{feat.title}</h3>
                <p>{feat.description}</p>
                <div className="harpply-feat-verse">{feat.verse}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
