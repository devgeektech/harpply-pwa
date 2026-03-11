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

export function Testimonials() {
  return (
    <section className="harpply-section harpply-test-bg" id="stories">
      <div className="harpply-section-inner">
        <div className="harpply-section-header">
          <FadeIn>
            <span className="harpply-eyebrow">Member Testimonials</span>
          </FadeIn>
          <FadeIn>
            <h2 className="harpply-sec-title">
              Stories of <span className="harpply-gold-text">Faithfulness</span>
            </h2>
          </FadeIn>
          <FadeIn>
            <p className="harpply-sec-sub">
              Hear from members whose lives were changed through a commitment to
              faith-first connection.
            </p>
          </FadeIn>
        </div>
        <FadeIn>
          <div className="harpply-test-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="harpply-test-card">
                <div className="harpply-test-rule" />
                <blockquote>{t.quote}</blockquote>
                <div className="harpply-test-author">
                  <div className="harpply-test-avatar">{t.initial}</div>
                  <div>
                    <div className="harpply-test-name">{t.name}</div>
                    <div className="harpply-test-loc">{t.location}</div>
                  </div>
                </div>
                <span className="harpply-test-verse">{t.verse}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
