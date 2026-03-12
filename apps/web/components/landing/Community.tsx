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

const goldGradientText =
  "bg-gradient-to-br from-[#f3d88a] via-[#e6b645] to-[#c8952a] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]";

export function Community() {
  return (
    <section className="bg-[#0c0520] px-8 py-24" id="community">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-16 text-center">
          <FadeIn>
            <span className="mb-4 block text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[#e6b645]">
              Beyond Matching
            </span>
          </FadeIn>
          <FadeIn>
            <h2 className="font-[var(--font-cormorant),'Cormorant_Garamond',serif] text-[clamp(2rem,4.5vw,3.2rem)] font-semibold leading-[1.15] tracking-[-0.01em]">
              A Community of{" "}
              <span className={goldGradientText}>Believers</span>
            </h2>
          </FadeIn>
          <FadeIn>
            <p className="mx-auto mt-4 max-w-[500px] text-[0.9rem] font-light leading-[1.85] text-white/75">
              Harpply members are part of a broader community that actively
              nurtures spiritual growth, accountability, and genuine fellowship.
            </p>
          </FadeIn>
        </div>
        <FadeIn>
          <div className="mt-12 grid overflow-hidden rounded-xl border border-[rgba(201,149,42,0.15)] bg-[rgba(201,149,42,0.15)] max-[720px]:grid-cols-1 max-[900px]:grid-cols-2 min-[901px]:grid-cols-4" style={{ gap: "1px" }}>
            {ITEMS.map((item) => (
              <div
                key={item.label}
                className="bg-[#0c0520] px-6 py-8 text-center transition-colors duration-[0.25s] hover:bg-[rgba(201,149,42,0.05)]"
              >
                <span className="mb-2.5 block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#e6b645]">
                  {item.label}
                </span>
                <p className="text-[0.84rem] font-light leading-[1.7] text-white/75">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
