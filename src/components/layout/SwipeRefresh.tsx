import { useEffect, useRef, useState } from "react";

const MOBILE_QUERY = "(max-width: 760px)";
const TRIGGER_DISTANCE = 70;
const BOTTOM_TOLERANCE = 6;

/**
 * Mobile-only gesture: once the visitor has scrolled all the way to the
 * bottom of the page, swiping up further reloads the site. A small pill
 * appears near the bottom edge to hint at the gesture and to confirm when
 * the refresh is happening.
 */
export default function SwipeRefresh() {
  const [phase, setPhase] = useState<"idle" | "hint" | "armed" | "refreshing">("idle");
  const gesture = useRef({ startY: 0, tracking: false, fired: false });

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);

    const isAtBottom = () =>
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - BOTTOM_TOLERANCE;

    const onTouchStart = (e: TouchEvent) => {
      if (!mql.matches) return;
      gesture.current.fired = false;
      gesture.current.tracking = isAtBottom();
      gesture.current.startY = e.touches[0].clientY;
      if (gesture.current.tracking) setPhase("hint");
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!mql.matches || !gesture.current.tracking || gesture.current.fired) return;
      if (!isAtBottom()) {
        setPhase("idle");
        gesture.current.tracking = false;
        return;
      }
      const dy = gesture.current.startY - e.touches[0].clientY;
      if (dy > TRIGGER_DISTANCE) {
        setPhase("refreshing");
        gesture.current.fired = true;
        window.setTimeout(() => window.location.reload(), 380);
      } else if (dy > 12) {
        setPhase("armed");
      }
    };

    const onTouchEnd = () => {
      if (!gesture.current.fired) {
        setPhase("idle");
      }
      gesture.current.tracking = false;
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  if (phase === "idle") return null;

  return (
    <div className={`royal-swipe-refresh royal-swipe-refresh--${phase}`}>
      <span className="royal-swipe-refresh-icon" aria-hidden="true" />
      {phase === "refreshing" ? "Refreshing…" : "Keep swiping up to refresh"}
    </div>
  );
}
