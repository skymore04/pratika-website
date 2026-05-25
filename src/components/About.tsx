import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { artist, socialLinks } from "../data/content";
import { InstagramIcon, YoutubeIcon, SpotifyIcon, LinktreeIcon } from "./BrandIcons";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const watermarkScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.05, 0.7]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [0, 0.08, 0.08, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);

  const genreColors = ["#ff2d78", "#a78bfa", "#22d3ee", "#d97706"];

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        minHeight: "100dvh",
        background: "var(--bg-alt)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Watermark — massive DUALITY */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          scale: watermarkScale,
          opacity: watermarkOpacity,
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        <span
          className="display-mega text-outline-light"
          style={{
            fontSize: "clamp(6rem, 25vw, 20rem)",
            letterSpacing: "12px",
          }}
        >
          DUALITY
        </span>
      </motion.div>

      <div style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        padding: "100px 32px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
          gap: "0px",
          maxWidth: 1400,
          margin: "0 auto",
          position: "relative",
        }}>
          {/* LEFT — floating text, staggered reveal */}
          <motion.div style={{ y: contentY }}>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="display-large"
              style={{ marginTop: 12, marginBottom: 32, lineHeight: 0.82 }}
            >
              The Voice<br />
              <span className="grad-hot">Within</span>
            </motion.h2>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="body-large"
              style={{ maxWidth: 520, marginBottom: 20 }}
            >
              {artist.longBio}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="body-large"
              style={{ maxWidth: 500, color: "var(--text-dim)" }}
            >
              She fronted PXP, was a key member of Won Tribe and Wild Wild Women, and has performed at Mahindra Percussion Festival and antiSOCIAL.
            </motion.p>

            {/* Quote */}
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.32 }}
              style={{
                marginTop: 40,
                fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.12)",
                lineHeight: 1.4,
                maxWidth: 400,
              }}
            >
              "{artist.quote}"
            </motion.p>
          </motion.div>

          {/* RIGHT — portrait photo with overlay stats */}
          <motion.div style={{ position: "relative", y: useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]) }}>
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 380,
                margin: "0 auto",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}media/pratika_instagram.jpg`}
                alt={artist.name}
                style={{ width: "100%", height: "auto", display: "block" }}
              />

              {/* Stats overlay at bottom of photo */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "40px 18px 18px",
                background: "linear-gradient(rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.95) 100%)",
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}>
                {artist.stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                  >
                    <p style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1rem, 2.2vw, 1.5rem)",
                      color: s.accent,
                      lineHeight: 1,
                      marginBottom: 1,
                      textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                    }}>
                      {s.value}
                    </p>
                    <p className="label-sm" style={{
                      fontSize: "0.45rem",
                      color: "rgba(255,255,255,0.75)",
                      letterSpacing: "2.5px",
                      textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                    }}>
                      {s.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social media icons — professional platform links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                marginTop: 24,
                marginBottom: 4,
              }}
            >
              {socialLinks.map((link, i) => {
                const brandColor: Record<string, string> = {
                  instagram: "#e4405f",
                  youtube: "#ff0000",
                  spotify: "#1db954",
                  link: "#a78bfa",
                };
                const color = brandColor[link.icon] || "var(--text-dim)";
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.18 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      border: `1.5px solid rgba(255,255,255,0.06)`,
                      background: "rgba(255,255,255,0.02)",
                      color: color,
                      transition: "all 0.3s ease",
                      cursor: "none",
                      position: "relative",
                    }}
                    aria-label={link.name}
                  >
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {link.icon === "instagram" && <InstagramIcon size={14} />}
                      {link.icon === "youtube" && <YoutubeIcon size={14} />}
                      {link.icon === "spotify" && <SpotifyIcon size={14} />}
                      {link.icon === "link" && <LinktreeIcon size={14} />}
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Genres below photo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: 20, textAlign: "center" }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 16px" }}>
                {artist.genres.map((g, i) => (
                  <span
                    key={g}
                    style={{
                      fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)",
                      fontWeight: 700,
                      color: genreColors[i],
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      fontFamily: "var(--font-display)",
                      opacity: 0.7 + i * 0.07,
                    }}
                  >
                    {g}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about > div > div {
            grid-template-columns: 1fr !important;
          }
          #about > div > div > div:last-child {
            margin-top: 40px;
          }
        }
        @media (max-width: 480px) {
          #about > div {
            padding: 60px 16px !important;
          }
          #about .label-sm {
            font-size: 0.45rem !important;
            letter-spacing: 2px !important;
          }
          #about > div > div > div:first-child > div:last-child {
            margin-top: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
