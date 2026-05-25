import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: "32px",
        borderTop: "1px solid rgba(255,255,255,0.02)",
      }}
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
        maxWidth: 1400,
        margin: "0 auto",
      }}>
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.9rem",
          letterSpacing: "2px",
          textTransform: "uppercase",
          background: "linear-gradient(135deg, var(--hot-pink), var(--cold-purple))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Pratika
        </span>
        <p className="label-sm" style={{ fontSize: "0.55rem", color: "var(--text-muted)", letterSpacing: "1px" }}>
          Copyright &copy; {new Date().getFullYear()} Pratika Prabhune. All Rights Reserved.
        </p>
        <a
          href="https://www.instagram.com/pratikaness/"
          target="_blank"
          rel="noopener noreferrer"
          className="label-sm"
          style={{
            fontSize: "0.55rem",
            color: "var(--text-muted)",
            transition: "color 0.3s ease",
            letterSpacing: "1px",
          }}
        >
          Instagram
        </a>
      </div>
      <style>{`
        @media (max-width: 480px) {
          footer > div {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 4px !important;
          }
          footer > div > span {
            font-size: 0.75rem !important;
          }
          footer > div > p, footer > div > a {
            font-size: 0.45rem !important;
          }
        }
      `}</style>
    </motion.footer>
  );
}
