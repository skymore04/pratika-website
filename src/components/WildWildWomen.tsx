import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { wildWildWomen } from "../data/content";
import ImageStack from "./ImageStack";
import WWWCouncil from "./WWWCouncil";
import { BookOpen } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "./BrandIcons";

export default function WildWildWomen() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ring1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const ring2 = useTransform(scrollYProgress, [0, 1], [360, 0]);
  const ring3 = useTransform(scrollYProgress, [0, 1], [0, -360]);

  return (
    <section
      id="www"
      ref={sectionRef}
      style={{
        minHeight: "100dvh",
        background: "var(--bg-alt)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Rotating rings */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(90vw, 800px)",
          height: "min(90vw, 800px)",
          borderRadius: "50%",
          border: "1px solid rgba(167,139,250,0.025)",
          transform: "translate(-50%, -50%)",
          rotate: ring1,
          pointerEvents: "none",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(68vw, 580px)",
          height: "min(68vw, 580px)",
          borderRadius: "50%",
          border: "1px solid rgba(255,45,120,0.025)",
          transform: "translate(-50%, -50%)",
          rotate: ring2,
          pointerEvents: "none",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(45vw, 380px)",
          height: "min(45vw, 380px)",
          borderRadius: "50%",
          border: "1px solid rgba(34,211,238,0.02)",
          transform: "translate(-50%, -50%)",
          rotate: ring3,
          pointerEvents: "none",
        }}
      />          {/* Gradient orbs — animated with scroll */}
      <motion.div
        style={{
          position: "absolute",
          top: "20%",
          right: useTransform(scrollYProgress, [0, 1], ["-10%", "-5%"]),
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.04), transparent 70%)",
          pointerEvents: "none",
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.8, 0.8, 0]),
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: useTransform(scrollYProgress, [0, 1], ["10%", "15%"]),
          left: useTransform(scrollYProgress, [0, 1], ["-5%", "-2%"]),
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,45,120,0.03), transparent 70%)",
          pointerEvents: "none",
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.7, 0.7, 0]),
        }}
      />

      {/* ── HERO BANNER — full gang photo ── */}
      <motion.div
        style={{
          position: "relative",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          height: "min(85vh, 700px)",
          overflow: "hidden",
          y: useTransform(scrollYProgress, [0, 0.15], [0, 30]),
        }}
      >
        {/* Background image with parallax */}
        <motion.div
          role="img"
          aria-label={wildWildWomen.heroImage.alt}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${wildWildWomen.heroImage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            scale: useTransform(scrollYProgress, [0, 0.15], [1, 1.06]),
            filter: "brightness(0.7) saturate(1.1)",
          }}
        />

        {/* Gradient overlay — bottom fade + vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, var(--bg-alt) 0%, transparent 50%, rgba(5,5,8,0.4) 100%)," +
              "radial-gradient(ellipse at center, transparent 40%, rgba(5,5,8,0.3) 100%)",
          }}
        />

        {/* Hero text — pinned center-bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            padding: "60px 32px 80px",
            maxWidth: 1400,
            margin: "0 auto",
          }}
        >

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="display-large"
            style={{ margin: 0, lineHeight: 0.82, color: "var(--text-bright)" }}
          >
            Wild<br />
            <span className="grad-cyan">Wild Women</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="body-large"
            style={{
              maxWidth: 520,
              marginTop: 16,
              marginBottom: 0,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {wildWildWomen.description}
          </motion.p>
        </div>
      </motion.div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          padding: "80px 32px 100px",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
          }}
        >
          {/* ── SECTION INTRO ── */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="body-large"
            style={{ maxWidth: 640, marginBottom: 60, color: "var(--text-dim)" }}
          >
            {wildWildWomen.longDescription}
          </motion.p>

          {/* ── MEMBER COLLAGE — magnetic grid with click-to-expand ── */}
          <div className="section-label" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ width: 20, height: 1.5, background: "var(--accent-cyan)" }} />
            <span className="label-sm" style={{ color: "var(--accent-cyan)", letterSpacing: "3px" }}>
              The Collective
            </span>
            <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.02)" }} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <WWWCouncil members={wildWildWomen.members} />
          </motion.div>

          {/* ── PRESS QUOTES + HIGHLIGHTS — 2-col ── */}
          <div
            className="www-press"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 40,
              marginBottom: 48,
            }}
          >
            {/* LEFT: Press quotes */}
            <div>
              <div
                className="section-label"
                style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
              >
                <span style={{ width: 20, height: 1.5, background: "var(--accent-cyan)" }} />
                <span className="label-sm" style={{ color: "var(--accent-cyan)", letterSpacing: "3px" }}>
                  Press
                </span>
                <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.02)" }} />
              </div>

              {wildWildWomen.pressQuotes.map((q, i) => (
                <motion.div
                  key={q.source}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  style={{
                    marginBottom: i < wildWildWomen.pressQuotes.length - 1 ? 20 : 0,
                    padding: "20px",
                    borderLeft: `2px solid ${i === 0 ? "var(--cold-purple)" : "var(--hot-pink)"}`,
                    background: "rgba(255,255,255,0.005)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "clamp(0.72rem, 0.9vw, 0.85rem)",
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      color: "var(--text)",
                      lineHeight: 1.6,
                      marginBottom: 10,
                    }}
                  >
                    &ldquo;{q.quote}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <motion.a
                      href={q.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      style={{
                        fontSize: "0.55rem",
                        fontWeight: 700,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "var(--cold-purple)",
                        cursor: "none",
                      }}
                    >
                      {q.source} →
                    </motion.a>
                    <span className="body-small" style={{ fontSize: "0.4rem", color: "var(--text-muted)" }}>
                      {q.author} · {q.date}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* RIGHT: Highlights + Game Flip */}
            <div>
              <div
                className="section-label"
                style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
              >
                <span style={{ width: 20, height: 1.5, background: "var(--accent-cyan)" }} />
                <span className="label-sm" style={{ color: "var(--accent-cyan)", letterSpacing: "3px" }}>
                  Milestones
                </span>
                <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.02)" }} />
              </div>

              {/* Game Flip spotlight */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                style={{
                  padding: "20px",
                  marginBottom: 20,
                  background: "linear-gradient(135deg, rgba(167,139,250,0.03), rgba(255,45,120,0.02))",
                  border: "1px solid rgba(167,139,250,0.05)",
                  borderRadius: 2,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "var(--cold-purple)",
                    lineHeight: 1,
                    marginBottom: 2,
                  }}
                >
                  {wildWildWomen.gameFlip.title}
                </p>
                <p
                  className="label-sm"
                  style={{
                    fontSize: "0.4rem",
                    color: "var(--text-muted)",
                    letterSpacing: "2px",
                    marginBottom: 8,
                  }}
                >
                  {wildWildWomen.gameFlip.release}
                </p>
                <p className="body-small" style={{ fontSize: "0.6rem", color: "var(--text-dim)", lineHeight: 1.7 }}>
                  {wildWildWomen.gameFlip.description}
                </p>
              </motion.div>

              {/* Highlight list */}
              <div>
                {wildWildWomen.highlights.map((h, i) => (
                  <motion.div
                    key={h}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.15 + i * 0.03 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "7px 0",
                      fontSize: "0.65rem",
                      color: "var(--text-dim)",
                      borderBottom: i < wildWildWomen.highlights.length - 1
                        ? "1px solid rgba(255,255,255,0.015)"
                        : "none",
                    }}
                  >
                    <span style={{ color: "var(--cold-purple)", fontSize: "0.35rem" }}>◆</span>
                    {h}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ── ROLLING LOUD ALBUM ── */}
          <div style={{ marginBottom: 48 }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="section-label"
              style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}
            >
              <span style={{ width: 20, height: 1.5, background: "var(--accent-cyan)" }} />
              <span className="label-sm" style={{ color: "var(--accent-cyan)", letterSpacing: "3px" }}>
                Rolling Loud Mumbai
              </span>
              <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.02)" }} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="body-small"
              style={{ maxWidth: 500, marginBottom: 8, color: "var(--text-muted)" }}
            >
              {wildWildWomen.rollingLoud.description}
            </motion.p>

            {wildWildWomen.rollingLoud.credit && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="label-sm"
                style={{
                  fontSize: "0.35rem",
                  color: "rgba(255,255,255,0.12)",
                  letterSpacing: "1.5px",
                  marginBottom: 20,
                }}
              >
                {wildWildWomen.rollingLoud.credit}
              </motion.p>
            )}

            {/* Interactive image stack — drag to explore */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="www-album"
            >
              <ImageStack images={wildWildWomen.rollingLoud.images} />
            </motion.div>

            {/* Instagram link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
              style={{ textAlign: "center", marginTop: 8 }}
            >
              <motion.a
                href={wildWildWomen.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 6 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#e4405f",
                  padding: "6px 0",
                  transition: "all 0.3s",
                  cursor: "none",
                }}
              >
                <InstagramIcon size={12} />
                @wildwildwomen_ · View on Instagram
              </motion.a>
            </motion.div>
          </div>

          {/* ── LINKS STRIP ── */}
          <motion.div
            className="www-links"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              flexWrap: "wrap",
              paddingTop: 32,
              borderTop: "1px solid rgba(255,255,255,0.02)",
            }}
          >
            <motion.a
              href={wildWildWomen.youtube}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#ff0000",
                padding: "8px 16px",
                border: "1.5px solid rgba(255,0,0,0.2)",
                borderRadius: 100,
                transition: "all 0.3s",
                cursor: "none",
              }}
            >
              <YoutubeIcon size={12} />
              YouTube
            </motion.a>
            <motion.a
              href={wildWildWomen.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--cold-purple)",
                padding: "8px 16px",
                border: "1.5px solid rgba(167,139,250,0.2)",
                borderRadius: 100,
                transition: "all 0.3s",
                cursor: "none",
              }}
            >
              <BookOpen size={12} />
              Rolling Stone
            </motion.a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #www > div:last-of-type {
            padding: 60px 16px !important;
          }
          #www .www-press {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          #www .www-links {
            gap: 16px !important;
            padding-top: 24px !important;
          }
          #www .www-links a {
            font-size: 0.5rem !important;
            letter-spacing: 2px !important;
            padding: 6px 12px !important;
          }
        }
        @media (max-width: 480px) {
          #www > div:last-of-type {
            padding: 48px 12px !important;
          }
          #www .www-press > div:first-child > div {
            padding: 18px !important;
          }
          #www .www-press > div:first-child > div > p:first-child {
            font-size: 0.72rem !important;
          }
          #www .www-links a {
            font-size: 0.45rem !important;
            padding: 5px 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
