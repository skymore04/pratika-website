import React from "react";
import { motion } from "framer-motion";
import { contactInfo } from "../data/content";
import { Calendar, Mic, Heart } from "lucide-react";

const iconPaths: Record<string, React.ReactNode> = {
  calendar: <Calendar size={20} strokeWidth={1.5} />,
  mic: <Mic size={20} strokeWidth={1.5} />,
  heart: <Heart size={20} strokeWidth={1.5} />,
};

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        minHeight: "100vh",
        background: "var(--bg-alt)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "100px 32px",
          maxWidth: 1400,
          margin: "0 auto",
        }}
        className="contact-container"
      >
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="label-sm"
            style={{ color: "var(--hot-pink)", letterSpacing: "4px", display: "block" }}
          >
            Contact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="display-large"
            style={{ marginTop: 8, marginBottom: 12, lineHeight: 0.82 }}
          >
            Let's{" "}
            <span className="grad-hot">Connect</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="body-hero"
            style={{ color: "var(--text-dim)", maxWidth: 400 }}
          >
            {contactInfo.responseTime}
          </motion.p>
        </div>

        {/* Inquiry Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            background: "rgba(255,255,255,0.02)",
            borderRadius: 16,
            overflow: "hidden",
          }}
          className="contact-grid"
        >
          {contactInfo.inquiries.map((item, i) => (
            <motion.a
              key={item.title}
              href={`mailto:${item.email}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                padding: "40px 32px",
                background: "var(--bg-alt)",
                transition: "all 0.3s ease",
                cursor: "none",
                textDecoration: "none",
                position: "relative",
                overflow: "hidden",
              }}
              className="contact-card"
            >
              {/* Hover glow border */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  background: `linear-gradient(135deg, ${item.accent}22, transparent 60%)`,
                  pointerEvents: "none",
                }}
                className="contact-card-glow"
              />

              {/* Icon */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${item.accent}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: item.accent,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {iconPaths[item.icon]}
              </div>

              {/* Text */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1rem, 1.5vw, 1.4rem)",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "var(--text)",
                    marginBottom: 6,
                    lineHeight: 1.1,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="body-small"
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-dim)",
                    lineHeight: 1.5,
                  }}
                >
                  {item.description}
                </p>
              </div>

              {/* Email */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  position: "relative",
                  zIndex: 1,
                  marginTop: "auto",
                  paddingTop: 16,
                  borderTop: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.5px",
                    color: item.accent,
                    wordBreak: "break-all",
                  }}
                >
                  {item.email}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  style={{
                    color: item.accent,
                    flexShrink: 0,
                    transition: "transform 0.3s ease",
                  }}
                  className="contact-arrow"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          style={{
            marginTop: 40,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <motion.a
            href={`mailto:${contactInfo.email}`}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              borderRadius: 8,
              background: "linear-gradient(135deg, var(--hot-pink), #d91c5c)",
              fontFamily: "var(--font-display)",
              fontSize: "0.75rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#fff",
              cursor: "none",
              textDecoration: "none",
              transition: "box-shadow 0.3s ease",
            }}
            className="contact-cta"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Send a Message
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        #contact .contact-card:hover .contact-card-glow {
          opacity: 1;
        }
        #contact .contact-card:hover .contact-arrow {
          transform: translateX(4px);
        }
        #contact .contact-cta:hover {
          box-shadow: 0 4px 24px rgba(255, 45, 120, 0.35);
        }
        @media (max-width: 768px) {
          #contact .contact-container {
            padding: 60px 24px !important;
          }
          #contact .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2px !important;
            border-radius: 12px !important;
          }
          #contact .contact-card {
            padding: 28px 24px !important;
          }
        }
        @media (max-width: 480px) {
          #contact .contact-container {
            padding: 48px 16px !important;
          }
          #contact .contact-container > div:first-child h2 {
            font-size: clamp(2rem, 14vw, 3rem) !important;
          }
          #contact .contact-container > div:first-child p {
            font-size: 0.72rem !important;
          }
          #contact .contact-card {
            padding: 24px 20px !important;
          }
          #contact .contact-card > div:nth-child(1) {
            width: 36px !important;
            height: 36px !important;
            border-radius: 10px !important;
          }
          #contact .contact-card > div:nth-child(1) svg {
            width: 16px !important;
            height: 16px !important;
          }
          #contact .contact-card > div:nth-child(3) span {
            font-size: 0.55rem !important;
          }
          #contact .contact-cta {
            font-size: 0.65rem !important;
            padding: 12px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
