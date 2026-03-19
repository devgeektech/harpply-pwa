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

/** .feat-num */
const featNumStyle: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
  fontSize: "3.5rem",
  fontWeight: 700,
  lineHeight: 1,
  color: "rgba(201, 149, 42, 0.65)",
  marginBottom: "1.5rem",
};

/** .feature-card h3 */
const featTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
  fontSize: "1.4rem",
  fontWeight: 600,
  marginBottom: "0.8rem",
  letterSpacing: "-0.01em",
};

/** .feature-card p */
const featBodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter), 'Inter', sans-serif",
  fontSize: "0.88rem",
  color: "rgba(255, 255, 255, 0.75)",
  lineHeight: 1.82,
  fontWeight: 300,
};

/** .feat-verse */
const featVerseStyle: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
  marginTop: "1.4rem",
  fontSize: "0.8rem",
  color: "#c8952a",
  fontStyle: "italic",
  letterSpacing: "0.02em",
};

const FEATURES = [
  {
    num: "01",
    title: "Faith-Led Compatibility",
    description:
      "Our matching framework prioritises biblical worldview alignment, spiritual maturity, and shared life values. We believe the right foundation changes everything about the relationship that follows.",
    verse: '"I have found the one whom my soul loves." — Song of Solomon 3:4',
  },
  {
    num: "02",
    title: "Safety and Integrity",
    description:
      "Robust verification, dedicated moderation, and transparent reporting tools ensure a secure environment where members can engage with confidence and trust.",
    verse: '"Love one another as I have loved you." — John 15:12',
  },
  {
    num: "03",
    title: "A Faith-Centred Space",
    description:
      "Harpply is a purpose-driven platform where believers can connect with intention — a space shaped by shared values and a sincere desire for meaningful partnership.",
    verse: '"Two are better than one." — Ecclesiastes 4:9',
  },
  {
    num: "04",
    title: "Our Promise",
    description:
      "We are building Harpply with one goal in mind: God-centred, lasting unions. Every design decision, every policy, every feature is shaped by that commitment.",
    verse: '"Where you go I will go." — Ruth 1:16',
  },
];

export function WhyHarpply() {
  return (
    <section
      className="pt-0 pb-24"
      id="why"
      style={{ background: "#0c0520", marginTop: "-4rem" }}
    >
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="text-center" style={{ marginBottom: "4rem" }}>
          <FadeIn>
            <span style={eyebrowStyle}>Our Commitment</span>
          </FadeIn>
          <FadeIn>
            <h2 style={secTitleStyle}>
              Built on <span style={goldTextStyle}>Principle</span>
            </h2>
          </FadeIn>
          <FadeIn>
            <p style={secSubStyle}>
              Harpply was founded by believers who understand that the foundation
              of a lasting, flourishing relationship begins with shared faith.
            </p>
          </FadeIn>
        </div>
        <FadeIn>
          <div
            className="grid overflow-hidden rounded-[14px] border border-[rgba(201,149,42,0.15)] bg-[rgba(201,149,42,0.15)] min-[901px]:grid-cols-2"
            style={{ gap: "1.5px" }}
          >
            {FEATURES.map((feat) => (
              <div
                key={feat.num}
                className="bg-[#0c0520] px-10 py-12 transition-colors duration-300 hover:bg-[rgba(201,149,42,0.04)]"
              >
                <div style={featNumStyle}>{feat.num}</div>
                <h3 style={featTitleStyle}>{feat.title}</h3>
                <p style={featBodyStyle}>{feat.description}</p>
                <p style={featVerseStyle}>{feat.verse}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
