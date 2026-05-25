import { useState, useRef } from "react";
import { motion } from "framer-motion";
import type { PanInfo } from "framer-motion";

interface Card {
  id: number;
  src: string;
  zIndex: number;
}

interface ImgStackProps {
  images: { src: string; alt?: string; label?: string }[];
}

export default function ImageStack({ images }: ImgStackProps) {
  const [cards, setCards] = useState<Card[]>(
    images.map((img, index) => ({
      id: index,
      src: img.src,
      zIndex: 50 - index * 10,
    }))
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const minDragDistance = 50;

  const getCardStyles = (index: number) => {
    const rotationIncrement = 3;
    const offsetIncrement = -10;
    const verticalOffset = -6;

    return {
      x: index * offsetIncrement,
      y: index * verticalOffset + (index === 0 ? 0 : 4),
      rotate: index === 0 ? 0 : -(3 + index * rotationIncrement),
      scale: index === 0 ? 1 : 0.98 - index * 0.01,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    };
  };

  const handleDragStart = (_: unknown, info: PanInfo) => {
    dragStartPos.current = { x: info.point.x, y: info.point.y };
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const dragDistance = Math.sqrt(
      Math.pow(info.point.x - dragStartPos.current.x, 2) +
        Math.pow(info.point.y - dragStartPos.current.y, 2)
    );

    if (isAnimating) return;
    if (dragDistance < minDragDistance) return;

    setIsAnimating(true);

    setCards((prevCards) => {
      const newCards = [...prevCards];
      const cardToMove = newCards.shift()!;
      newCards.push(cardToMove);
      return newCards.map((card, index) => ({
        ...card,
        zIndex: 50 - index * 10,
      }));
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: 420,
        padding: "24px 0",
      }}
    >
      {/* Background glow rings */}
      <div
        style={{
          position: "absolute",
          width: 320,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(34,211,238,0.03), transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          width: 240,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {cards.map((card: Card, index: number) => {
          const isTopCard = index === 0;
          const cardStyles = getCardStyles(index);
          const canDrag = isTopCard && !isAnimating;
          const imageData = images[card.id];

          return (
            <motion.div
              key={card.id}
              style={{
                position: "absolute",
                width: "100%",
                zIndex: card.zIndex,
                transformOrigin: "bottom center",
                overflow: "hidden",
                borderRadius: 4,
                cursor: isTopCard ? "grab" : "default",
              }}
              animate={cardStyles}
              drag={canDrag}
              dragElastic={0.15}
              dragConstraints={{ left: -180, right: 180, top: -180, bottom: 180 }}
              dragSnapToOrigin={true}
              dragTransition={{ bounceStiffness: 400, bounceDamping: 15 }}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              whileHover={
                isTopCard
                  ? {
                      scale: 1.03,
                      transition: { duration: 0.2 },
                    }
                  : {}
              }
              whileDrag={{
                scale: 1.08,
                rotate: 0,
                zIndex: 100,
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(34,211,238,0.06)",
                transition: { duration: 0.1 },
              }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "5/7",
                  width: "100%",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.01)",
                }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${card.src.replace(/^\//, '')}`}
                  alt={imageData?.alt || `Photo ${card.id + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                  draggable={false}
                />

                {/* Image label overlay — subtle, bottom-left */}
                {imageData?.label && isTopCard && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "32px 14px 12px",
                      background:
                        "linear-gradient(transparent, rgba(0,0,0,0.7))",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.45rem",
                        fontWeight: 700,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {imageData.label}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Card count indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "4px 12px",
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.03)",
          borderRadius: 100,
        }}
      >
        {images.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === (cards[0]?.id % images.length) ? 16 : 4,
              height: 3,
              borderRadius: 2,
              background:
                i === (cards[0]?.id % images.length)
                  ? "var(--accent-cyan)"
                  : "rgba(255,255,255,0.08)",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
