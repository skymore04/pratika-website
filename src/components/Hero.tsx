import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { artist } from "../data/content";
import { VolumeX, Volume2 } from "lucide-react";

export default function Hero({ introComplete = true }: { introComplete?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: pageScroll } = useScroll();

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        height: "100dvh",
        background: "var(--bg)",
        cursor: "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Video — full bleed */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-20%",
          scale: videoScale,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65 }}
        >
          <source src={`${import.meta.env.BASE_URL}media/hero_wild_soul.mp4`} type="video/mp4" />
          <source src={`${import.meta.env.BASE_URL}media/hero_wild_soul.webm`} type="video/webm" />
        </video>
      </motion.div>

      {/* Dark sheers — dynamic opacity on scroll */}
      <motion.div
        style={{
          position: "absolute", inset: 0,
          background: useTransform(pageScroll, [0, 0.15], [
            "radial-gradient(ellipse at center, rgba(136,31,50,0.10) 20%, rgba(5,5,8,0.75) 65%, var(--bg) 100%)",
            "radial-gradient(ellipse at center, rgba(136,31,50,0.18) 20%, rgba(5,5,8,0.88) 65%, var(--bg) 100%)",
          ]),
        }}
      />

      {/* Mouse-driven liquid spot — subtle pink aura */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(800px circle at ${50 + mousePos.x * 8}% ${50 + mousePos.y * 8}%, rgba(255,45,120,0.04), transparent 60%)`,
          transition: "background 0.8s ease-out",
        }}
      />

      {/* MAIN CONTENT */}
      <motion.div
        style={{ opacity: fadeOut }}
        className="full-bleed"
      >
        {/* ── PRATIKA — single bold statement ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            bottom: "20%",
            left: "-2%",
            zIndex: 5,
            width: "104vw",
          }}
        >
          <h1
            className="hero-name"
            style={{
              fontFamily: "var(--font-display-hero)",
              fontSize: "clamp(5rem, 26vw, 20rem)",
              lineHeight: 0.82,
              textTransform: "uppercase",
              letterSpacing: "clamp(-1px, -0.02vw, 1px)",
              userSelect: "none",
              color: "#ffffff",
              mixBlendMode: "difference",
            }}
          >
            PRATIKA
          </h1>
        </motion.div>

        {/* ── Subtitle line — like a film credit ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            bottom: "13%",
            left: 32,
            zIndex: 7,
            mixBlendMode: "difference",
          }}
          className="hero-subtitle"
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}>
            <div style={{
              width: 24,
              height: 1.5,
              background: "linear-gradient(90deg, var(--hot-pink), transparent)",
              borderRadius: 1,
            }} />
            <div>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(0.55rem, 0.75vw, 0.85rem)",
                letterSpacing: "clamp(2px, 4px, 6px)",
                textTransform: "uppercase",
                color: "var(--text)",
                fontWeight: 400,
                lineHeight: 1.4,
              }}>
                {artist.tagline}
              </p>
              <p style={{
                fontSize: "clamp(0.4rem, 0.5vw, 0.55rem)",
                letterSpacing: "clamp(2px, 3px, 4px)",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                marginTop: 2,
              }}>
                {artist.location}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Bottom-right: verse / creed ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            position: "absolute",
            bottom: 40,
            right: 32,
            zIndex: 7,
            textAlign: "right",
            mixBlendMode: "difference",
          }}
          className="hero-creed"
        >
          <p style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(0.5rem, 0.6vw, 0.7rem)",
            color: "var(--text-dim)",
            opacity: 0.5,
            letterSpacing: "0.5px",
            maxWidth: 200,
            lineHeight: 1.5,
          }}>
            "{artist.quote}"
          </p>
        </motion.div>
      </motion.div>

      {/* Sound toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onClick={() => {
          if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
          }
        }}
        aria-label={isMuted ? "Unmute" : "Mute"}
        style={{
          position: "absolute",
          bottom: 32,
          right: 32,
          zIndex: 20,
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.15)",
          cursor: "none",
          transition: "all 0.3s ease",
        }}
        className="hero-mute"
      >
        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </motion.button>

      <style>{`
        #hero .hero-mute:hover {
          background: rgba(255,45,120,0.1) !important;
          border-color: rgba(255,45,120,0.2) !important;
          color: var(--hot-pink) !important;
        }

        @media (max-width: 768px) {
          #hero .hero-name {
            font-size: clamp(3.5rem, 18vw, 5rem) !important;
            letter-spacing: 0 !important;
          }
          #hero .hero-subtitle {
            left: 16px !important;
            bottom: 16% !important;
          }
          #hero .hero-subtitle > div {
            gap: 10px !important;
          }
          #hero .hero-subtitle > div > div:first-child {
            width: 16px !important;
          }
          #hero .hero-subtitle p:first-of-type {
            font-size: 0.45rem !important;
            letter-spacing: 2px !important;
          }
          #hero .hero-subtitle p:last-of-type {
            font-size: 0.35rem !important;
            letter-spacing: 2px !important;
          }
          #hero .hero-creed {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          #hero .hero-name {
            font-size: clamp(2.5rem, 14vw, 3.5rem) !important;
            letter-spacing: 0 !important;
          }
          #hero .hero-subtitle {
            bottom: 18% !important;
          }
          #hero .hero-subtitle p:first-of-type {
            font-size: 0.38rem !important;
            letter-spacing: 1px !important;
          }
          #hero .hero-mute {
            width: 28px !important;
            height: 28px !important;
            bottom: 24px !important;
            right: 16px !important;
          }
        }
        @media (max-width: 380px) {
          #hero .hero-name {
            font-size: clamp(2rem, 12vw, 2.5rem) !important;
            letter-spacing: -1.5px !important;
          }
        }
      `}</style>
    </section>
  );
}
