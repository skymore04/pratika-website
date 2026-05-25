import { useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { InstagramIcon } from "./BrandIcons";

/* ───── Types ───── */

interface Member {
  name: string;
  realName: string;
  role: string;
  bio: string;
  accent: string;
  instagram: string;
  handle: string;
  image: string;
}

interface Props {
  members: Member[];
}

/* ───── Particle field ───── */

const PARTICLE_COUNT = 30;

function createParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2.5,
    driftX: (Math.random() - 0.5) * 40,
    driftY: (Math.random() - 0.5) * 40,
    duration: 10 + Math.random() * 15,
    delay: Math.random() * 10,
    bgOpacity: 0.03 + Math.random() * 0.05,
  }));
}

/* ───── Entrance configs — each card arrives from a different direction ───── */

const ENTRANCE_CONFIGS = [
  { x: -60, y: 0 },    // Card 0: slides in from left
  { x: 60, y: 0 },     // Card 1: slides in from right
  { x: 0, y: 80 },     // Card 2 (center): rises from below
  { x: -60, y: 0 },    // Card 3: slides in from left
  { x: 60, y: 0 },     // Card 4: slides in from right
];

/* ───── Main component ───── */

export default function WWWCouncil({ members }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [particles] = useState(createParticles);

  const handleSelect = useCallback((index: number) => {
    setSelectedIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div
      className="www-council"
      style={{
        position: "relative",
        padding: "60px 0 20px",
        marginBottom: 60,
      }}
    >
      {/* ── Ambient particle field ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: `rgba(255,255,255,${p.bgOpacity})`,
            }}
            animate={{
              x: [0, p.driftX, 0],
              y: [0, p.driftY, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── Council colour wash — floods the chamber when a member is selected ── */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            key="council-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              inset: -120,
              background: `radial-gradient(ellipse at 50% 40%, ${members[selectedIndex].accent}, transparent 65%)`,
              opacity: 0.04,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Row 1 — 2 cards ── */}
      <div
        className="council-row council-row-top"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          maxWidth: 800,
          margin: "0 auto 24px",
        }}
      >
        {members.slice(0, 2).map((member, i) => (
          <CouncilCard
            key={member.name}
            member={member}
            index={i}
            isSelected={selectedIndex === i}
            isAnySelected={selectedIndex !== null}
            entranceConfig={ENTRANCE_CONFIGS[i]}
            onSelect={() => handleSelect(i)}
          />
        ))}
      </div>

      {/* ── Row 2 — 1 card (the throne) ── */}
      <div
        className="council-row council-row-center"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        <div style={{ maxWidth: 380, width: "100%" }}>
          <CouncilCard
            member={members[2]}
            index={2}
            isSelected={selectedIndex === 2}
            isAnySelected={selectedIndex !== null}
            entranceConfig={ENTRANCE_CONFIGS[2]}
            onSelect={() => handleSelect(2)}
          />
        </div>
      </div>

      {/* ── Row 3 — 2 cards ── */}
      <div
        className="council-row council-row-bottom"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        {members.slice(3, 5).map((member, i) => {
          const globalIndex = i + 3;
          return (
            <CouncilCard
              key={member.name}
              member={member}
              index={globalIndex}
              isSelected={selectedIndex === globalIndex}
              isAnySelected={selectedIndex !== null}
              entranceConfig={ENTRANCE_CONFIGS[globalIndex]}
              onSelect={() => handleSelect(globalIndex)}
            />
          );
        })}
      </div>

      {/* ── Responsive ── */}
      <style>{`
        .www-council .council-card:focus-visible {
          outline: none;
          box-shadow: 0 0 0 1.5px var(--accent-cyan), 0 0 40px -6px rgba(34,211,238,0.15);
        }
        @media (max-width: 768px) {
          .council-row {
            grid-template-columns: repeat(2, 1fr) !important;
            max-width: 100% !important;
            gap: 12px !important;
            margin-bottom: 12px !important;
          }
          .council-row-center > div {
            max-width: 100% !important;
          }
        }
        @media (max-width: 580px) {
          .council-row {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ───── Individual council card ───── */

function CouncilCard({
  member,
  index,
  isSelected,
  isAnySelected,
  entranceConfig,
  onSelect,
}: {
  member: Member;
  index: number;
  isSelected: boolean;
  isAnySelected: boolean;
  entranceConfig: { x: number; y: number };
  onSelect: () => void;
}) {
  /* 3D tilt via mouse position */
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const rotateX = useSpring(cursorY, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(cursorX, { stiffness: 180, damping: 18 });

  /* Parallax offset for the photo layer (subtle independent movement) */
  const imgX = useMotionValue(0);
  const imgY = useMotionValue(0);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      cursorX.set(dx * 6);
      cursorY.set(dy * -6);
      imgX.set(dx * 4);
      imgY.set(dy * -4);
    },
    [cursorX, cursorY, imgX, imgY]
  );

  const handleMouseLeave = useCallback(() => {
    cursorX.set(0);
    cursorY.set(0);
    imgX.set(0);
    imgY.set(0);
    setIsHovered(false);
  }, [cursorX, cursorY, imgX, imgY]);

  const staggeredDelay = index * 0.12;

  return (
    <motion.div
      className="council-card"
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      onMouseMove={!isSelected ? handleMouseMove : undefined}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      role="button"
      tabIndex={0}
      initial={{ opacity: 0, x: entranceConfig.x, y: entranceConfig.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: staggeredDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        cursor: "none",
        position: "relative",
        opacity: isAnySelected && !isSelected ? 0.15 : 1,
        filter: isAnySelected && !isSelected ? "blur(3px) saturate(0.3)" : "blur(0px) saturate(1)",
        transition: "opacity 0.5s ease, filter 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        scale: isSelected ? 1.08 : 1,
        zIndex: isSelected ? 10 : 1,
      }}
    >
      {/* ── Card body ── */}
      <motion.div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 4,
          minHeight: 320,
          background: `rgba(255,255,255,0.006)`,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: isSelected
            ? member.accent
            : isHovered
              ? "rgba(255,255,255,0.06)"
              : "rgba(255,255,255,0.02)",
          rotateX,
          rotateY,
          transformPerspective: 1200,
          transition: "border-color 0.4s ease",
        }}
      >
        {/* ── Full-bleed portrait photo ── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${import.meta.env.BASE_URL}${member.image.replace(/^\//, '')})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            x: imgX,
            y: imgY,
            scale: isSelected ? 1.05 : isHovered ? 1.02 : 1,
            filter: isAnySelected && !isSelected
              ? "brightness(0.4) saturate(0.3)"
              : isSelected
                ? "brightness(0.55) saturate(1.1)"
                : isHovered
                  ? "brightness(0.85) saturate(1.05)"
                  : "brightness(0.75) saturate(1)",
          }}
          transition={{
            scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            filter: { duration: 0.5, ease: "easeOut" },
          }}
        />

        {/* ── Gradient overlays ── */}
        {/* Vignette + bottom fade for text readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse at center, transparent 50%, rgba(5,5,8,0.5) 100%),
              linear-gradient(to top, rgba(5,5,8,0.85) 0%, rgba(5,5,8,0.2) 40%, transparent 60%),
              linear-gradient(to bottom, rgba(5,5,8,0.15) 0%, transparent 30%)
            `,
          }}
        />

        {/* Accent color bleed — blooms from the bottom on hover/select */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top, ${member.accent}, transparent 70%)`,
            opacity: isSelected ? 0.12 : isHovered ? 0.04 : 0,
            transition: "opacity 0.5s ease",
          }}
        />

        {/* ── Accent crown — thin glowing line across the top ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1.5,
            background: member.accent,
            opacity: isSelected ? 0.7 : isHovered ? 0.2 : 0,
            transition: "opacity 0.4s ease",
            zIndex: 3,
          }}
        />

        {/* ── Content overlay ── */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            minHeight: 320,
            padding: "28px 24px",
          }}
        >
          {/* Role — editorial label */}
          <p
            style={{
              fontSize: "0.4rem",
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              marginBottom: 6,
              userSelect: "none",
            }}
          >
            {member.role}
          </p>

          {/* Member name — monumental display type */}
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
              lineHeight: 0.85,
              textTransform: "uppercase",
              letterSpacing: "-1px",
              color: member.accent,
              margin: 0,
              wordBreak: "break-word",
              userSelect: "none",
            }}
          >
            {member.name}
          </p>

          {/* Thin accent rule */}
          <div
            style={{
              width: 32,
              height: 1.5,
              background: member.accent,
              margin: "10px 0 4px",
              opacity: isSelected ? 0.5 : 0.2,
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Real name — watermark style */}
          <p
            style={{
              fontSize: "0.35rem",
              color: "rgba(255,255,255,0.08)",
              fontStyle: "italic",
              marginBottom: 4,
              userSelect: "none",
            }}
          >
            {member.realName}
          </p>

          {/* ── Bio — reveals on selection ── */}
          <AnimatePresence initial={false}>
            {isSelected && (
              <motion.div
                key="bio"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: "hidden" }}
              >
                <p
                  style={{
                    fontSize: "0.45rem",
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.7,
                    marginBottom: 12,
                    paddingTop: 6,
                  }}
                >
                  {member.bio}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Instagram link ── */}
          <motion.a
            href={member.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ x: 4 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.35rem",
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: isSelected ? "#e4405f" : "rgba(255,255,255,0.15)",
              transition: "color 0.3s ease",
              marginTop: "auto",
              paddingTop: isSelected ? 10 : 0,
              borderTop: isSelected
                ? "1px solid rgba(255,255,255,0.03)"
                : "none",
            }}
          >
            <InstagramIcon size={6} />
            {member.handle}
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}
