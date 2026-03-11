import { FadeIn } from "./FadeIn";

const ITEMS = [
  {
    label: "Daily Devotionals",
    description:
      "Scripture-based reflections delivered each morning to centre your heart before you engage with the community.",
  },
  {
    label: "Prayer Circles",
    description:
      "Small groups of members who commit to praying for one another throughout the week in an atmosphere of trust.",
  },
  {
    label: "Singles Gatherings",
    description:
      "Regional and virtual events hosted throughout the year, providing members opportunity to meet in authentic community.",
  },
  {
    label: "Accountability",
    description:
      "Structured partnerships designed to support purity of intention and steady spiritual growth along the journey.",
  },
];

export function Community() {
  return (
    <section className="harpply-section" id="community" style={{ background: "var(--deep)" }}>
      <div className="harpply-section-inner">
        <div className="harpply-section-header">
          <FadeIn>
            <span className="harpply-eyebrow">Beyond Matching</span>
          </FadeIn>
          <FadeIn>
            <h2 className="harpply-sec-title">
              A Community of <span className="harpply-gold-text">Believers</span>
            </h2>
          </FadeIn>
          <FadeIn>
            <p className="harpply-sec-sub">
              Harpply members are part of a broader community that actively
              nurtures spiritual growth, accountability, and genuine fellowship.
            </p>
          </FadeIn>
        </div>
        <FadeIn>
          <div className="harpply-community-strip">
            {ITEMS.map((item) => (
              <div key={item.label} className="harpply-comm-item">
                <span className="harpply-comm-label">{item.label}</span>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
