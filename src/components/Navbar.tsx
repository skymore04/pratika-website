import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { socialLinks } from "../data/content";
import { InstagramIcon, YoutubeIcon, SpotifyIcon, LinktreeIcon } from "./BrandIcons";

const links = [
  { name: "About", href: "#about" },
  { name: "Music", href: "#music" },
  { name: "Watch", href: "#watch" },
  { name: "WWW", href: "#www" },
  { name: "Milestones", href: "#achievements" },
  { name: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const link of links) {
        const el = document.querySelector(link.href);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          const height = el.getBoundingClientRect().height;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "instagram": return <InstagramIcon size={16} />;
      case "youtube": return <YoutubeIcon size={16} />;
      case "spotify": return <SpotifyIcon size={16} />;
      default: return <LinktreeIcon size={16} />;
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 4.2 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9990,
          height: scrolled ? 64 : 88,
          background: scrolled ? "rgba(5, 5, 8, 0.65)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.04)" : "1px solid transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          transition: "height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* LOGO */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleLinkClick("#hero"); }}
          style={{
            fontFamily: "var(--font-display-hero)",
            fontSize: "1.3rem",
            fontWeight: 900,
            letterSpacing: "4px",
            color: "var(--text-bright)",
            textTransform: "uppercase",
            cursor: "none",
          }}
        >
          PRATIKA
        </a>

        {/* DESKTOP MENU */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav-links">
          {links.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: isActive ? "var(--hot-pink)" : "var(--text-dim)",
                  transition: "color 0.3s ease",
                  cursor: "none",
                  position: "relative",
                  padding: "8px 0",
                }}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeDot"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 1.5,
                      background: "var(--hot-pink)",
                      borderRadius: 1,
                    }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* HAMBURGER BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
          style={{
            color: "var(--text-bright)",
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            cursor: "none",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
          className="mobile-nav-toggle"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.nav>

      {/* MOBILE FULL-SCREEN MENU OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(5, 5, 8, 0.98)",
              backdropFilter: "blur(24px)",
              zIndex: 9980,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "48px 24px",
            }}
          >
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              alignItems: "center",
              marginBottom: 48,
            }}>
              {links.map((link, i) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.a
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    key={link.name}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2rem, 8vw, 3rem)",
                      fontWeight: 800,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: isActive ? "var(--hot-pink)" : "var(--text)",
                      lineHeight: 1,
                      textAlign: "center",
                    }}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
            </div>

            {/* Social Connect in Menu */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                paddingTop: 32,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <span className="label-sm" style={{ color: "var(--text-muted)" }}>CONNECT</span>
              <div style={{ display: "flex", gap: 16 }}>
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      background: "rgba(255, 255, 255, 0.02)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-dim)",
                    }}
                    aria-label={link.name}
                  >
                    {getSocialIcon(link.icon)}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav-links {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: flex !important;
          }
          nav {
            padding: 0 16px !important;
          }
        }
      `}</style>
    </>
  );
}
