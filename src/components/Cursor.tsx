import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const [isTouch] = useState(() => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const ringScale = useRef(1);
  const dotScale = useRef(1);

  useEffect(() => {
    if (isTouch) return;

    // Set class to hide native cursor
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = () => {
      ringScale.current = 0.6;
      dotScale.current = 0.4;
    };

    const onUp = () => {
      ringScale.current = 1.0;
      dotScale.current = 1.0;
    };

    let hoveredEl: Element | null = null;

    const onHoverableEnter = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      if (el && el !== hoveredEl) {
        hoveredEl = el;
        if (ringRef.current) {
          ringRef.current.style.width = "48px";
          ringRef.current.style.height = "48px";
          ringRef.current.style.borderColor = "rgba(255,45,120,0.4)";
          ringRef.current.style.background = "rgba(255,45,120,0.06)";
        }
      }
    };

    const onHoverableLeave = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !(related.closest ? related.closest("a, button, [data-cursor]") : null)) {
        // Actually leaving the interactive element, not just moving to its child
        if (hoveredEl && (!related || !hoveredEl.contains(related))) {
          hoveredEl = null;
          if (ringRef.current) {
            ringRef.current.style.width = "32px";
            ringRef.current.style.height = "32px";
            ringRef.current.style.borderColor = "rgba(255,255,255,0.15)";
            ringRef.current.style.background = "transparent";
          }
        }
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onHoverableEnter);
    document.addEventListener("mouseout", onHoverableLeave);

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(${dotScale.current})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${ringScale.current})`;
      }
      requestAnimationFrame(tick);
    };
    tick();

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onHoverableEnter);
      document.removeEventListener("mouseout", onHoverableLeave);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: -3,
          left: -3,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--hot-pink)",
          zIndex: 99999,
          pointerEvents: "none",
          mixBlendMode: "difference",
          transition: "width 0.2s, height 0.2s",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.15)",
          zIndex: 99999,
          pointerEvents: "none",
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background 0.2s ease",
        }}
      />
    </>
  );
}
