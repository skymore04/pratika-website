import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { artist } from "../data/content";

const TARGET = 4000; // ms — total duration before onComplete fires

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit" | "done">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 1800);
    const t2 = setTimeout(() => setPhase("exit"), 3200);
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, TARGET);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "var(--bg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Main name */}
          <div style={{ position: "relative", textAlign: "center" }}>
            {/* Outlined layer — fades in first */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={
                phase === "exit"
                  ? { opacity: 0, y: -20, scale: 0.95 }
                  : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="display-mega text-outline-thick"
              style={{
                lineHeight: 0.78,
                letterSpacing: "-6px",
                userSelect: "none",
                textAlign: "center",
              }}
            >
              PRATIKA
            </motion.h1>

            {/* Filled layer — fades in second, offset slightly */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={
                phase === "exit"
                  ? { opacity: 0, y: -20, scale: 0.95 }
                  : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="display-mega grad-hot"
              style={{
                position: "absolute",
                top: 0,
                left: "clamp(2px, 0.4vw, 6px)",
                lineHeight: 0.78,
                letterSpacing: "-6px",
                userSelect: "none",
                textAlign: "center",
              }}
            >
              PRATIKA
            </motion.h1>
          </div>

          {/* Accent line — sweeps in Phase 3 */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={
              phase === "exit"
                ? { scaleX: 0, opacity: 0 }
                : { scaleX: 1 }
            }
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: 1.5,
              width: "clamp(60px, 15vw, 200px)",
              background: "linear-gradient(90deg, var(--hot-pink), var(--cold-purple))",
              marginTop: 12,
              transformOrigin: "left center",
            }}
          />

          {/* Tagline — fades in after accent line */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={
              phase === "exit"
                ? { opacity: 0, y: -6 }
                : { opacity: 1, y: 0 }
            }
            transition={{ duration: 0.5, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="label-sm"
            style={{
              color: "var(--text-muted)",
              letterSpacing: "4px",
              marginTop: 16,
              textAlign: "center",
              padding: "0 24px",
            }}
          >
            {artist.tagline}
          </motion.p>

          {/* Location — fades in after tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="label-sm"
            style={{
              color: "var(--text-muted)",
              letterSpacing: "2px",
              marginTop: 4,
              fontSize: "0.4rem",
            }}
          >
            {artist.location}
          </motion.p>

          {/* Loading bar at bottom */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3.2, ease: "linear" }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 1.5,
              background: "linear-gradient(90deg, var(--hot-pink), var(--cold-purple), var(--cold-cyan))",
              transformOrigin: "left center",
              opacity: 0.3,
            }}
          />

          {/* Corner decorations */}
          <div
            style={{
              position: "absolute",
              top: 32,
              left: 32,
              width: 20,
              height: 20,
              borderTop: "1px solid rgba(255,255,255,0.03)",
              borderLeft: "1px solid rgba(255,255,255,0.03)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 32,
              right: 32,
              width: 20,
              height: 20,
              borderTop: "1px solid rgba(255,255,255,0.03)",
              borderRight: "1px solid rgba(255,255,255,0.03)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 32,
              left: 32,
              width: 20,
              height: 20,
              borderBottom: "1px solid rgba(255,255,255,0.03)",
              borderLeft: "1px solid rgba(255,255,255,0.03)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 32,
              right: 32,
              width: 20,
              height: 20,
              borderBottom: "1px solid rgba(255,255,255,0.03)",
              borderRight: "1px solid rgba(255,255,255,0.03)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
