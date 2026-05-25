import { motion } from "framer-motion";
import { portfolioWork, livePerformances } from "../data/content";
import { Play, Link2 } from "lucide-react";

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      style={{
        background: "var(--bg-alt)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      
      <div style={{ padding: "100px 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            {/* ── HEADER ── */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="label-sm"
              style={{ color: "var(--accent-gold)", letterSpacing: "4px", display: "block" }}
            >
              More Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="display-large"
              style={{ marginTop: 12, marginBottom: 20, lineHeight: 0.82 }}
            >
              Beyond the{" "}
              <span className="grad-gold">Music</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="body-large"
              style={{ maxWidth: 520, marginBottom: 48, color: "var(--text-dim)" }}
            >
              Live performances with PXP, voiceover work (including Disney), commercial jingles, and acting — Pratika's creative range extends far beyond her solo releases.
            </motion.p>

            {/* ── LIVE PERFORMANCES ── */}
            <div className="section-label" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ width: 20, height: 1.5, background: "var(--accent-gold)" }} />
            <span className="label-sm" style={{ color: "var(--accent-gold)", letterSpacing: "3px" }}>
              PXP Live
              </span>
              <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.02)" }} />
            </div>
            <div
              className="portfolio-live"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                marginBottom: 60,
              }}
            >
              {livePerformances.map((perf, i) => (
                <motion.a
                  key={perf.videoId}
                  href={perf.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  style={{
                    position: "relative",
                    aspectRatio: "16/9",
                    overflow: "hidden",
                    borderRadius: 2,
                    background: "var(--bg)",
                    cursor: "none",
                    display: "block",
                  }}
                >
                  {perf.videoId ? (
                    <img
                      src={`${import.meta.env.BASE_URL}media/thumb_${perf.videoId}.jpg`}
                      alt={perf.title}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "grayscale(0.5) blur(1px) contrast(1.2)",
                        transition: "transform 0.6s ease, filter 0.5s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.08)";
                        e.currentTarget.style.filter = "grayscale(0) contrast(1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.filter = "grayscale(0.3) contrast(1.1)";
                      }}
                    />
                  ) : (
                    <div                    style={{
                      width: "100%", height: "100%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-display)", fontSize: "2rem",
                      color: perf.accent,
                      background: `linear-gradient(135deg, ${perf.accent}08, var(--bg))`,
                    }}>
                      PXP
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    height: "60%",
                    background: "linear-gradient(transparent, rgba(5,5,8,0.9))",
                    pointerEvents: "none",
                  }} />
                  {/* Play button */}
                  <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 40, height: 40,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.03)",
                    border: "1.5px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.3)",
                    transition: "all 0.4s ease",
                    pointerEvents: "none",
                  }}>
                    <Play size={14} fill="currentColor" />
                  </div>
                  {/* Info at bottom */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "20px 14px 14px",
                    pointerEvents: "none",
                  }}>
                    <p style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(0.6rem, 0.9vw, 0.85rem)",
                      lineHeight: 1.1,
                      textTransform: "uppercase",
                      color: "#fff",
                      marginBottom: 2,
                    }}>
                      {perf.title}
                    </p>
                    <p className="label-sm" style={{
                      fontSize: "0.4rem",
                      color: "rgba(255,255,255,0.25)",
                      letterSpacing: "1.5px",
                    }}>
                      {perf.venue} · {perf.year}
                    </p>
                  </div>
                  {/* Accent type badge */}
                  <span style={{
                    position: "absolute", top: 8, left: 8, zIndex: 2,
                    fontSize: "0.3rem", fontWeight: 600,
                    letterSpacing: "2px", textTransform: "uppercase",
                    color: perf.accent,
                    padding: "2px 8px",
                    border: `1px solid ${perf.accent}25`,
                    background: `${perf.accent}08`,
                    borderRadius: 1,
                  }}>
                    Live
                  </span>
                </motion.a>
              ))}
            </div>

            {/* ── PORTFOLIO GRID (Ads, Voiceovers, Acting) ── */}
            <div className="section-label" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ width: 20, height: 1.5, background: "var(--accent-gold)" }} />
            <span className="label-sm" style={{ color: "var(--accent-gold)", letterSpacing: "3px" }}>
              Portfolio
              </span>
              <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.02)" }} />
            </div>
            <div
              className="portfolio-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
              }}
            >
              {portfolioWork.map((item, i) => (
                <motion.a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  style={{
                    padding: "36px 24px",
                    background: "rgba(255,255,255,0.01)",
                    border: "1px solid rgba(255,255,255,0.02)",
                    borderRadius: 2,
                    cursor: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${item.accent}25`;
                    e.currentTarget.style.background = `${item.accent}04`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.02)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.01)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.2rem, 1.8vw, 1.8rem)",
                      lineHeight: 1,
                      color: item.accent,
                    }}>
                      {item.title}
                    </span>
                  </div>
                  <p className="body-small" style={{
                    fontSize: "0.62rem",
                    color: "var(--text-dim)",
                    lineHeight: 1.6,
                  }}>
                    {item.description}
                  </p>
                  <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 8 }}>
                    <Link2 size={10} style={{ color: item.accent }} />
                    <span className="label-sm" style={{
                      fontSize: "0.4rem",
                      color: item.accent,
                      letterSpacing: "2px",
                    }}>
                      {item.type}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #portfolio > div > div {
            padding: 60px 16px !important;
          }
          #portfolio .portfolio-live {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
            margin-bottom: 40px !important;
          }
          #portfolio .portfolio-grid {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
          }
          #portfolio .portfolio-grid > a {
            padding: 24px 18px !important;
          }
        }
        @media (max-width: 480px) {
          #portfolio > div > div {
            padding: 48px 12px !important;
          }
          #portfolio .portfolio-live > a > div:last-child p:first-child {
            font-size: clamp(0.5rem, 4vw, 0.65rem) !important;
          }
          #portfolio .portfolio-grid > a > span:first-child {
            font-size: clamp(1rem, 5vw, 1.2rem) !important;
          }
          #portfolio .portfolio-grid > a p {
            font-size: 0.55rem !important;
          }
        }
      `}</style>
    </section>
  );
}
