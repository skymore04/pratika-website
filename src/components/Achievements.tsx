import { motion } from "framer-motion";
import { achievements } from "../data/content";

export default function Achievements() {
  return (
    <section
      id="achievements"
      style={{
        background: "var(--bg)",
      }}
    >
      <div style={{
        padding: "100px 32px",
        maxWidth: 1400,
        margin: "0 auto",
        position: "relative",
      }}>
        {/* Header — staggered */}
        <div style={{ marginBottom: 60 }}>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="display-large"
            style={{ marginTop: 12 }}
          >
            <span className="grad-gold">Milestones</span>
          </motion.h2>
        </div>

        {/* Achievements stack — each is a block, no cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: 24,
                padding: "28px 0",
                borderBottom: i < achievements.length - 1 ? "1px solid rgba(255,255,255,0.02)" : "none",
                alignItems: "center",
              }}
            >
              {/* Year — large, authoritative */}
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: a.accent,
                lineHeight: 1,
                letterSpacing: "-2px",
                opacity: 0.7,
              }}>
                {a.year}
              </div>

              {/* Content */}
              <div>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1rem, 1.8vw, 1.5rem)",
                  lineHeight: 1.1,
                  letterSpacing: "0.5px",
                  marginBottom: 4,
                  color: "var(--text)",
                }}>
                  {a.title}
                </h3>
                <p className="body-small" style={{
                  fontSize: "0.72rem",
                  color: "var(--text-dim)",
                  maxWidth: 500,
                }}>
                  {a.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #achievements > div > div:last-child > div {
            grid-template-columns: 70px 1fr !important;
            padding: 18px 0 !important;
            gap: 16px !important;
          }
          #achievements > div {
            padding: 60px 24px !important;
          }
        }
        @media (max-width: 480px) {
          #achievements > div {
            padding: 48px 16px !important;
          }
          #achievements > div > div:last-child > div {
            grid-template-columns: 55px 1fr !important;
            padding: 14px 0 !important;
            gap: 12px !important;
          }
          #achievements > div > div:last-child > div > div:first-child {
            font-size: clamp(1.4rem, 7vw, 2rem) !important;
          }
          #achievements > div > div:last-child > div > div:last-child h3 {
            font-size: clamp(0.85rem, 3.5vw, 1rem) !important;
          }
          #achievements > div > div:last-child > div > div:last-child p {
            font-size: 0.65rem !important;
          }
        }
      `}</style>
    </section>
  );
}
