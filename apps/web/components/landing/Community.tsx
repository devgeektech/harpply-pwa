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

/** .comm-label */
const commLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter), 'Inter', sans-serif",
  fontSize: "0.68rem",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#e6b645",
  marginBottom: "0.6rem",
  display: "block",
};

/** .comm-item p */
const commBodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter), 'Inter', sans-serif",
  fontSize: "0.84rem",
  color: "rgba(255, 255, 255, 0.75)",
  lineHeight: 1.7,
  fontWeight: 300,
};

const ITEMS = [
  {
    label: "Faith Filters",
    description:
      "Search by denomination, doctrinal values, and spiritual lifestyle to connect with someone who genuinely shares what matters most.",
  },
  {
    label: "Verified Profiles",
    description:
      "Members are required to complete account verification before connecting with others, helping maintain a trustworthy and respectful community.",
  },
  {
    label: "Safe Messaging",
    description:
      "Our messaging environment includes built-in tools and community guidelines designed to encourage respectful, wholesome, and purposeful conversations.",
  },
  {
    label: "Intentional Matching",
    description:
      "Built for believers who are serious about faith and committed to finding a God-honouring partnership — not casual encounters.",
  },
];

export function Community() {
  return (
    <section
      className="px-8 py-24"
      id="community"
      style={{
        background:
          "linear-gradient(160deg, #160840 0%, #221060 50%, #160840 100%)",
      }}
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="text-center" style={{ marginBottom: "4rem" }}>
          <FadeIn>
            <span style={eyebrowStyle}>What We Offer</span>
          </FadeIn>
          <FadeIn>
            <h2 style={secTitleStyle}>
              Designed for{" "}
              <span style={goldTextStyle}>Intentional Dating</span>
            </h2>
          </FadeIn>
          <FadeIn>
            <p style={secSubStyle}>
              Harpply is a faith-based platform where Christian singles can
              connect with shared values, genuine intention, and a sincere desire
              for a God-honouring relationship.
            </p>
          </FadeIn>
        </div>
        <FadeIn>
          <div
            className="grid grid-cols-1 overflow-hidden rounded-xl border border-[rgba(201,149,42,0.15)] bg-[rgba(201,149,42,0.15)] max-[900px]:grid-cols-2 max-[640px]:grid-cols-1 min-[901px]:grid-cols-4"
            style={{ gap: "1px", marginTop: "3rem" }}
          >
            {ITEMS.map((item) => (
              <div
                key={item.label}
                className="bg-[#0c0520] text-center transition-colors duration-[0.25s] hover:bg-[rgba(201,149,42,0.05)]"
                style={{ padding: "2rem 1.5rem" }}
              >
                <span style={commLabelStyle}>{item.label}</span>
                <p style={commBodyStyle}>{item.description}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
