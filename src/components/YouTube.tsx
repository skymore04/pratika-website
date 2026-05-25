import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { youtubeVideos, socialLinks, wildWildWomen, playlists } from "../data/content";
import { Play } from "lucide-react";
import { LinktreeIcon, YoutubeIcon } from "./BrandIcons";

const linktree = socialLinks.find((l) => l.icon === "link");
const youtubeChannel = socialLinks.find((l) => l.icon === "youtube");

export default function YouTube() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.04, 0.04, 0]);

  const solos = youtubeVideos.filter((v) => v.section === "solo");
  const features = youtubeVideos.filter((v) => v.section === "feature");
  const wwwVideos = youtubeVideos.filter((v) => v.section === "www");

  return (
    <section
      ref={sectionRef}
      id="watch"
      style={{
        background: "var(--bg)",
        position: "relative",
      }}
    >
      {/* Watermark */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          opacity: watermarkOpacity,
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        <span
          className="display-mega text-outline-light"
          style={{ fontSize: "clamp(6rem, 30vw, 22rem)", letterSpacing: "12px" }}
        >
          WATCH
        </span>
      </motion.div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          padding: "100px 32px",
        }}
      >
        {/* ── HEADER — staggered ── */}
        <div style={{ marginBottom: 60 }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="label-sm"
            style={{ color: "var(--accent-cyan)", letterSpacing: "4px", display: "block" }}
          >
            Visuals
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 0,
              flexWrap: "wrap",
            }}
          >
            <h2 className="display-large" style={{ lineHeight: 0.82, marginTop: 8 }}>
              <span className="grad-cyan">Watch</span>
            </h2>
            <h2
              className="display-large text-outline"
              style={{ lineHeight: 0.82, marginTop: 8, marginLeft: "clamp(4px, 1vw, 16px)" }}
            >
              Pratika
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="body-hero"
            style={{ color: "var(--text-dim)", marginTop: 16, maxWidth: 500 }}
          >
            Solo tracks, featured collaborations, and her collective Wild Wild Women — explore
            Pratika's full visual catalog on YouTube. Everything organized the way{" "}
            <a
              href={linktree?.url || "https://linktr.ee/PratikaPrabhune"}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--hot-pink)", cursor: "none", borderBottom: "1px solid rgba(255,45,120,0.3)" }}
            >
              she curates it
            </a>
            .
          </motion.p>
        </div>

        {/* ── SOLO RELEASES ── */}
        <div style={{ marginBottom: 60 }}>
          <div className="section-label" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <span style={{ width: 20, height: 1.5, background: "var(--accent-cyan)" }} />
            <span className="label-sm" style={{ color: "var(--accent-cyan)", letterSpacing: "3px" }}>
              Solo Releases
            </span>
            <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.03)" }} />
          </div>
          <div
            className="video-wall-solo"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
            }}
          >
            {solos.map((video, i) => {
              const isWide = i === 0;
              const colSpan = isWide ? "span 2" : "span 1";
              return (
                <VideoCard key={video.videoId} video={video} isWide={isWide} colSpan={colSpan} />
              );
            })}
          </div>
        </div>

        {/* ── FEATURES & COLLABS ── */}
        <div style={{ marginBottom: 60 }}>
          <div className="section-label" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <span style={{ width: 20, height: 1.5, background: "var(--accent-cyan)" }} />
            <span className="label-sm" style={{ color: "var(--accent-cyan)", letterSpacing: "3px" }}>
              Features & Collaborations
            </span>
            <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.03)" }} />
          </div>
          <div
            className="video-wall-features"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
            }}
          >
            {features.map((video) => (
              <VideoCard key={video.videoId} video={video} isWide={false} colSpan="span 1" />
            ))}
          </div>
        </div>

        {/* ── WILD WILD WOMEN ── */}
        <div style={{ marginBottom: 60 }}>
          <div className="section-label" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <span style={{ width: 20, height: 1.5, background: "var(--accent-cyan)" }} />
            <span className="label-sm" style={{ color: "var(--accent-cyan)", letterSpacing: "3px" }}>
              Wild Wild Women
            </span>
            <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.03)" }} />
          </div>
          <div
            className="video-wall-www"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
            }}
          >
            {wwwVideos.map((video, i) => {
              const isWide = i === 0;
              const colSpan = isWide ? "span 2" : "span 1";
              return (
                <VideoCard key={video.videoId} video={video} isWide={isWide} colSpan={colSpan} />
              );
            })}
          </div>
        </div>

        {/* ── PLAYLISTS ── */}
        <div style={{ marginBottom: 60 }}>
          <div className="section-label" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ width: 20, height: 1.5, background: "var(--accent-cyan)" }} />
            <span className="label-sm" style={{ color: "var(--accent-cyan)", letterSpacing: "3px" }}>
              Curated Playlists
            </span>
            <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.02)" }} />
          </div>
          <div
            className="playlist-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 8,
            }}
          >
            {playlists.map((pl, i) => (
              <motion.a
                key={pl.title}
                href={pl.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                style={{
                  position: "relative",
                  aspectRatio: "16/7",
                  overflow: "hidden",
                  borderRadius: 2,
                  background: "var(--bg-alt)",
                  border: "1px solid rgba(255,255,255,0.02)",
                  cursor: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "24px",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${pl.accent}25`;
                  e.currentTarget.style.background = `linear-gradient(135deg, ${pl.accent}08, ${pl.accent}04)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.background = "var(--bg-alt)";
                }}
              >
                {/* Gradient background element */}
                <div style={{
                  position: "absolute",
                  top: "20%",
                  right: "10%",
                  width: "40%",
                  height: "60%",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${pl.accent}06, transparent 70%)`,
                  pointerEvents: "none",
                }} />
                {/* Playlist icon */}
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 4,
                  background: `${pl.accent}12`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill={pl.accent}>
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="8" y1="8" x2="16" y2="8" stroke="#fff" strokeWidth="1.5" />
                    <line x1="8" y1="12" x2="14" y2="12" stroke="#fff" strokeWidth="1.5" />
                    <line x1="8" y1="16" x2="12" y2="16" stroke="#fff" strokeWidth="1.5" />
                  </svg>
                </div>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(0.9rem, 1.3vw, 1.4rem)",
                  lineHeight: 1.1,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "#fff",
                  marginBottom: 4,
                  position: "relative",
                  zIndex: 1,
                }}>
                  {pl.title}
                </p>
                <p className="body-small" style={{
                  fontSize: "0.55rem",
                  color: "var(--text-dim)",
                  position: "relative",
                  zIndex: 1,
                }}>
                  {pl.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>

        {/* ── BOTTOM CTAs — Linktree + YouTube ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            paddingTop: 40,
            borderTop: "1px solid rgba(255,255,255,0.02)",
          }}
        >
          <p className="label-sm" style={{ color: "var(--text-muted)", letterSpacing: "3px", marginBottom: 8 }}>
            Explore everything — curated by Pratika
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <motion.a
              href={linktree?.url || "https://linktr.ee/PratikaPrabhune"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1rem, 2vw, 1.6rem)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--cold-purple)",
                padding: "8px 20px",
                border: "1.5px solid rgba(167,139,250,0.2)",
                borderRadius: 100,
                transition: "all 0.3s ease",
                cursor: "none",
              }}
            >
              <LinktreeIcon size={14} />
              Linktree
            </motion.a>
            <motion.a
              href={youtubeChannel?.url || "https://www.youtube.com/@PratikaPrabhune"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1rem, 2vw, 1.6rem)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#ff0000",
                padding: "8px 20px",
                border: "1.5px solid rgba(255,0,0,0.2)",
                borderRadius: 100,
                transition: "all 0.3s ease",
                cursor: "none",
              }}
            >
              <YoutubeIcon size={14} />
              YouTube Channel
            </motion.a>
            <motion.a
              href={wildWildWomen.youtube}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1rem, 2vw, 1.6rem)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--cold-purple)",
                padding: "8px 20px",
                border: "1.5px solid rgba(167,139,250,0.2)",
                borderRadius: 100,
                transition: "all 0.3s ease",
                cursor: "none",
              }}
            >
              <YoutubeIcon size={14} />
              WWW Channel
            </motion.a>
          </div>
        </motion.div>
      </div>

      <style>{`
        /* ── Play button hover ── */
        #watch [class^="video-wall"] > a:hover .play-btn {
          background: rgba(255,45,120,0.15) !important;
          border-color: rgba(255,45,120,0.3) !important;
          color: #ff2d78 !important;
          transform: translate(-50%, -50%) scale(1.1) !important;
        }

        @media (max-width: 768px) {
          #watch > div {
            padding: 60px 16px !important;
          }
          #watch .video-wall-solo {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 6px !important;
          }
          #watch .video-wall-solo > a {
            grid-column: span 1 !important;
            aspect-ratio: 16/9 !important;
          }
          #watch .video-wall-solo > a:first-child {
            grid-column: span 2 !important;
          }
          #watch .video-wall-features,
          #watch .video-wall-www {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 6px !important;
          }
          #watch .video-wall-features > a,
          #watch .video-wall-www > a {
            grid-column: span 1 !important;
            aspect-ratio: 16/9 !important;
          }
          #watch .video-wall-www > a:first-child {
            grid-column: span 2 !important;
          }
          #watch > div > div:first-child h2 {
            font-size: clamp(2.4rem, 10vw, 4rem) !important;
          }
        }

        @media (max-width: 480px) {
          #watch > div {
            padding: 48px 12px !important;
          }
          #watch .video-wall-solo,
          #watch .video-wall-features,
          #watch .video-wall-www {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
          }
          #watch .video-wall-solo > a,
          #watch .video-wall-features > a,
          #watch .video-wall-www > a {
            grid-column: span 1 !important;
            aspect-ratio: 16/9 !important;
          }
          #watch .video-wall-solo > a:first-child,
          #watch .video-wall-www > a:first-child {
            grid-column: span 1 !important;
          }
          #watch > div > div:first-child h2 {
            font-size: clamp(2rem, 14vw, 2.8rem) !important;
          }
          #watch > div > div:first-child p {
            font-size: 0.72rem !important;
          }
          #watch .section-label {
            margin-bottom: 16px !important;
          }
          #watch .section-label span:first-child {
            width: 14px !important;
          }
          #watch .playlist-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          #watch .playlist-grid > a {
            aspect-ratio: auto !important;
            padding: 32px 24px !important;
          }
          #watch > div > div:last-child {
            gap: 16px !important;
            padding-top: 24px !important;
          }
          #watch > div > div:last-child > div {
            gap: 12px !important;
          }
          #watch > div > div:last-child > div a {
            font-size: clamp(0.8rem, 4vw, 1rem) !important;
            padding: 6px 14px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ── Video Card Sub-component ── */
function VideoCard({
  video,
  isWide,
  colSpan,
}: {
  video: (typeof youtubeVideos)[number];
  isWide: boolean;
  colSpan: string;
}) {
  return (
    <motion.a
      href={video.links.youtube}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.3 }}
      style={{
        gridColumn: colSpan,
        position: "relative",
        overflow: "hidden",
        borderRadius: 2,
        background: "var(--bg-alt)",
        aspectRatio: "16/9",
        cursor: "none",
        display: "block",
      }}
    >
      <img
        src={`${import.meta.env.BASE_URL}media/thumb_${video.videoId}.jpg`}
        alt={video.title}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease",
          filter: "grayscale(0.3) contrast(1.05)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.filter = "grayscale(0) contrast(1) brightness(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.filter = "grayscale(0.3) contrast(1.05)";
        }}
      />

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "55%",
          background: "linear-gradient(transparent, rgba(5,5,8,0.88))",
          pointerEvents: "none",
        }}
      />

      {/* Type badge — top left */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.35rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: video.accent,
            padding: "2px 8px",
            border: `1px solid ${video.accent}25`,
            background: `${video.accent}08`,
            borderRadius: 1,
          }}
        >
          {video.section === "www"
            ? "WWW"
            : video.section === "feature"
            ? "ft."
            : video.type}
        </span>
      </div>

      {/* Play button */}
      <div
        className="play-btn"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isWide ? 44 : 32,
          height: isWide ? 44 : 32,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.03)",
          border: "1.5px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.3)",
          transition: "all 0.4s ease",
          pointerEvents: "none",
        }}
      >
        <Play size={isWide ? 16 : 12} fill="currentColor" />
      </div>

      {/* Title & artist — bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: isWide ? "24px 14px 14px" : "16px 10px 10px",
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isWide ? "clamp(0.7rem, 1vw, 0.95rem)" : "clamp(0.55rem, 0.8vw, 0.75rem)",
            lineHeight: 1.1,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            color: "#fff",
            marginBottom: 1,
          }}
        >
          {video.title}
        </p>
        <p
          className="label-sm"
          style={{
            fontSize: isWide ? "0.45rem" : "0.35rem",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "1.5px",
          }}
        >
          {video.artist} · {video.year}
        </p>
      </div>
    </motion.a>
  );
}
