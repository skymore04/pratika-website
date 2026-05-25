import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { musicReleases } from "../data/content";
import { Play } from "lucide-react";

interface ReleaseCardProps {
  release: typeof musicReleases[number];
  i: number;
}

function ReleaseCard({ release, i }: ReleaseCardProps) {
  const isLeft = i % 2 === 0;
  const colors = ["#a78bfa", "#22d3ee", "#d97706", "#ff2d78", "#a78bfa", "#ff2d78"];
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [isLeft ? -40 : 40, 0, isLeft ? 40 : -40]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: isLeft ? "1fr 1.2fr" : "1.2fr 1fr",
        gap: 48,
        alignItems: "center",
        marginBottom: 100,
        position: "relative",
      }}
    >
      {/* Album art — full height, no card */}
      <motion.div
        style={{
          y,
          position: "relative",
          order: isLeft ? 1 : 2,
          overflow: "hidden",
          borderRadius: 4,
          aspectRatio: "16/9",
          background: "var(--bg-alt)",
        }}
      >
        {release.videoId ? (
          <motion.img
            src={`${import.meta.env.BASE_URL}media/thumb_${release.videoId}.jpg`}
            alt={release.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "grayscale(0.4) contrast(1.1)",
            }}
            whileHover={{ scale: 1.05, filter: "grayscale(0) contrast(1)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontSize: "4rem",
            color: "rgba(255,255,255,0.03)",
            background: "linear-gradient(135deg, #0a0a12, #12101a)",
          }}>
            P
          </div>
        )}
        {/* Massive type badge — overlaid, rotated */}
        <div style={{
          position: "absolute",
          top: isLeft ? 12 : "auto",
          bottom: isLeft ? "auto" : 12,
          right: isLeft ? "auto" : 12,
          left: isLeft ? 12 : "auto",
          zIndex: 2,
          transform: `rotate(${isLeft ? -3 : 3}deg)`,
        }}>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(0.7rem, 1.5vw, 1rem)",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: colors[i],
            padding: "4px 12px",
            border: `1.5px solid ${colors[i]}25`,
            background: `${colors[i]}06`,
          }}>
            {release.type}
          </span>
        </div>
        {/* Year — top right/bottom left */}
        <div style={{
          position: "absolute",
          top: isLeft ? "auto" : 12,
          bottom: isLeft ? 12 : "auto",
          right: isLeft ? 12 : "auto",
          left: isLeft ? "auto" : 12,
          zIndex: 2,
        }}>
          <span className="label-sm" style={{ color: "rgba(255,255,255,0.15)" }}>
            {release.year}
          </span>
        </div>
      </motion.div>

      {/* Info — raw, no card */}
      <div style={{
        order: isLeft ? 2 : 1,
        padding: "0",
      }}>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
          lineHeight: 0.9,
          letterSpacing: "-1px",
          marginBottom: 8,
          color: "var(--text)",
        }}>
          {release.title}
        </h3>
        <p className="body-large" style={{ 
          fontFamily: "var(--font-serif)", 
          fontStyle: "italic", 
          color: colors[i], 
          fontSize: "1rem", 
          marginBottom: 12 
        }}>
          {release.artist}
        </p>
        <p className="body-small" style={{ color: "var(--text-dim)", fontSize: "0.8rem", lineHeight: "1.7", marginBottom: 20, maxWidth: 440 }}>
          {release.description}
        </p>
        <motion.a
          href={release.links.youtube}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 6, color: "#ffffff" }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: "0.55rem",
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: colors[i],
            padding: "8px 0",
            transition: "color 0.3s ease",
            cursor: "none",
          }}
        >
          <Play size={10} fill="currentColor" />
          Listen
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function Music() {
  return (
    <section
      id="music"
      style={{
        background: "var(--bg)",
      }}
    >
      {/* Header — staggered */}
      <div className="music-header" style={{
        padding: "120px 32px 60px",
      }}>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="display-large"
          style={{ marginTop: 12 }}
        >
          <span className="grad-cold">Releases</span>
        </motion.h2>
      </div>

      {/* Each release is its own full-bleed composition */}
      <div className="music-releases-container" style={{ padding: "0 32px 120px" }}>
        {musicReleases.map((release, i) => (
          <ReleaseCard key={release.title} release={release} i={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #music .music-releases-container {
            padding: 0 24px 60px !important;
          }
          #music .music-releases-container > div {
            grid-template-columns: 140px 1fr !important;
            gap: 24px !important;
            margin-bottom: 40px !important;
            align-items: center !important;
          }
          #music .music-releases-container > div > div:first-child {
            order: 1 !important;
            transform: none !important;
            max-height: none !important;
            margin-bottom: 0 !important;
          }
          #music .music-releases-container > div > div:last-child {
            order: 2 !important;
          }
          #music .music-releases-container > div > div:last-child h3 {
            font-size: clamp(1.1rem, 3.5vw, 1.4rem) !important;
            margin-bottom: 4px !important;
          }
          #music .music-releases-container > div > div:last-child p:first-of-type {
            font-size: 0.8rem !important;
            margin-bottom: 6px !important;
          }
          #music .music-releases-container > div > div:last-child p:text-dim {
            display: none !important;
          }
          #music .music-releases-container > div > div:last-child p:nth-of-type(2) {
            display: none !important;
          }
          #music .music-releases-container > div > div:last-child a {
            padding: 0 !important;
            margin-top: 4px !important;
          }
          #music .music-header {
            padding: 80px 16px 40px !important;
          }
        }
        @media (max-width: 480px) {
          #music .music-releases-container {
            padding: 0 16px 60px !important;
          }
          #music .music-releases-container > div {
            grid-template-columns: 100px 1fr !important;
            gap: 16px !important;
            margin-bottom: 32px !important;
          }
          #music .music-releases-container > div > div:last-child h3 {
            font-size: 0.95rem !important;
          }
          #music .music-releases-container > div > div:last-child p:first-of-type {
            font-size: 0.7rem !important;
            margin-bottom: 4px !important;
          }
        }
      `}</style>
    </section>
  );
}
