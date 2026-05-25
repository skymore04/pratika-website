import { motion } from "framer-motion";
import { socialLinks, artist } from "../data/content";
import { ArrowRight } from "lucide-react";
import { InstagramIcon, YoutubeIcon, SpotifyIcon, LinktreeIcon } from "./BrandIcons";

export default function Social() {
  const brandColors: Record<string, string> = {
    instagram: "#e4405f",
    youtube: "#ff0000",
    spotify: "#1db954",
    link: "#a78bfa",
  };

  return (
    <section
      id="social"
      style={{
        minHeight: "100vh",
        background: "var(--bg-alt)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{
        width: "100%",
        padding: "100px 32px",
        maxWidth: 1400,
        margin: "0 auto",
      }} className="social-container">
        {/* Massive FOLLOW text — staggered */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="label-sm"
            style={{ color: "var(--hot-pink)", letterSpacing: "4px", display: "block" }}
          >
            Connect
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="display-large"
            style={{ marginTop: 8, marginBottom: 12, lineHeight: 0.82 }}
          >
            Follow{" "}
            <span className="grad-hot">Pratika</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="body-hero"
            style={{ color: "var(--text-dim)", marginBottom: 48, maxWidth: 400 }}
          >
            {artist.followers} followers · Music, shows & daily content
          </motion.p>
        </div>

        {/* Social links — no boxes, just text */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 48 }}>
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.08 + i * 0.05 }}
              whileHover={{ x: 8, scale: 1.01 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 0",
                borderBottom: "1px solid rgba(255,255,255,0.02)",
                transition: "all 0.3s ease",
                cursor: "none",
              }}
            >
              <span style={{
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: brandColors[link.icon],
              }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {link.icon === "instagram" && <InstagramIcon size={16} />}
                  {link.icon === "youtube" && <YoutubeIcon size={16} />}
                  {link.icon === "spotify" && <SpotifyIcon size={16} />}
                  {link.icon === "link" && <LinktreeIcon size={16} />}
                </span>
              </span>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                  fontWeight: 700,
                  fontFamily: "var(--font-display)",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  lineHeight: 1.1,
                }}>
                  {link.name}
                </p>
                <p className="label-sm" style={{ fontSize: "0.5rem", color: "var(--text-muted)", letterSpacing: "2px" }}>
                  {link.handle}
                </p>
              </div>
              <ArrowRight size={16} style={{ color: "var(--text-muted)", transition: "transform 0.3s ease" }} />
            </motion.a>
          ))}
        </div>

        {/* Instagram spotlight — just text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <p className="label-sm" style={{ color: "var(--text-muted)", marginBottom: 8, letterSpacing: "3px" }}>
            Instagram
          </p>
          <motion.a
            href="https://www.instagram.com/pratikaness/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 6 }}
            style={{
              fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
              fontFamily: "var(--font-display)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#e4405f",
              transition: "all 0.3s ease",
              cursor: "none",
            }}
          >
            @pratikaness
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #social .social-container {
            padding: 60px 24px !important;
          }
        }
        @media (max-width: 480px) {
          #social .social-container {
            padding: 48px 16px !important;
          }
          #social .social-container > div:first-child h2 {
            font-size: clamp(2rem, 14vw, 3rem) !important;
          }
          #social .social-container > div:first-child p {
            font-size: 0.72rem !important;
          }
          #social .social-container > div:nth-child(2) a p:first-child {
            font-size: clamp(1rem, 5vw, 1.2rem) !important;
          }
          #social .social-container > div:nth-child(2) a {
            padding: 12px 0 !important;
          }
          #social .social-container > div:last-child a {
            font-size: clamp(1.2rem, 6vw, 1.5rem) !important;
          }
        }
      `}</style>
    </section>
  );
}
