import { FadeIn } from "./FadeIn";

const TESTIMONIALS = [
  {
    quote:
      "I had nearly resigned myself to the idea that finding a partner who shared my depth of faith was unlikely. Three months after joining Harpply, I met Daniel. We were engaged by Christmas — I am certain this was God's timing.",
    initial: "G",
    name: "Grace O.",
    location: "Lagos, Nigeria",
    verse: "Proverbs 18:22",
  },
  {
    quote:
      "Rachel and I bonded over Psalm 37 in our very first conversation. The scripture-matching feature is unlike anything we had encountered before — it created an immediate, genuine sense of alignment and shared purpose.",
    initial: "J",
    name: "James & Rachel K.",
    location: "Nashville, Tennessee",
    verse: "Psalm 37:4",
  },
  {
    quote:
      "As a pastor, I approach technology in this space with considerable caution. Harpply is the only platform I have ever recommended to my congregation. Its commitment to integrity is evident in every detail of its design.",
    initial: "S",
    name: "Pastor Samuel A.",
    location: "London, United Kingdom",
    verse: "Jeremiah 29:11",
  },
  {
    quote:
      "What struck me most was the quality of conversation — no pressure, no inappropriate messaging. Thomas and I built something real and meaningful before we ever met in person. We will be married this June.",
    initial: "M",
    name: "Maria & Thomas V.",
    location: "São Paulo, Brazil",
    verse: "Ruth 1:16",
  },
];

const goldGradientText =
  "bg-gradient-to-br from-[#f3d88a] via-[#e6b645] to-[#c8952a] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]";

export function Testimonials() {
  return (
    <section
      className="px-8 py-24"
      id="stories"
      style={{
        background:
          "linear-gradient(160deg, #160840 0%, #221060 50%, #160840 100%)",
      }}
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-16 text-center">
          <FadeIn>
            <span className="mb-4 block text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[#e6b645]">
              Member Testimonials
            </span>
          </FadeIn>
          <FadeIn>
            <h2 className="font-[var(--font-cormorant),'Cormorant_Garamond',serif] text-[clamp(2rem,4.5vw,3.2rem)] font-semibold leading-[1.15] tracking-[-0.01em]">
              Stories of{" "}
              <span className={goldGradientText}>Faithfulness</span>
            </h2>
          </FadeIn>
          <FadeIn>
            <p className="mx-auto mt-4 max-w-[500px] text-[0.9rem] font-light leading-[1.85] text-white/75">
              Hear from members whose lives were changed through a commitment to
              faith-first connection.
            </p>
          </FadeIn>
        </div>
        <FadeIn>
          <div className="grid gap-px overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.06] [grid-template-columns:repeat(auto-fit,minmax(270px,1fr))]">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-[#160840] px-8 py-10 transition-colors duration-[0.25s] hover:bg-[rgba(42,18,96,0.8)]"
              >
                <div className="mb-6 h-0.5 w-6 bg-[#c8952a]" />
                <blockquote className="font-[var(--font-cormorant),'Cormorant_Garamond',serif] text-[1.1rem] font-normal italic leading-[1.75] text-white/75">
                  {t.quote}
                </blockquote>
                <div className="mt-7 flex items-center gap-4">
                  <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border border-[rgba(201,149,42,0.3)] bg-gradient-to-br from-[#321880] to-[#c8952a] font-[var(--font-cormorant),'Cormorant_Garamond',serif] text-base font-semibold">
                    {t.initial}
                  </div>
                  <div>
                    <div className="text-[0.86rem] font-semibold">{t.name}</div>
                    <div className="mt-0.5 text-[0.72rem] text-white/45">
                      {t.location}
                    </div>
                  </div>
                </div>
                <span className="mt-5 inline-block border-b border-[rgba(201,149,42,0.3)] pb-0.5 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-[#c8952a]">
                  {t.verse}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
