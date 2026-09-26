import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LayoutGrid, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useLang } from "@/contexts/language-context";

interface Item {
  thumb: string;
  full: string;
  name: string;
}

// The grid uses small thumbnails so the menu opens instantly; the full-res
// image is only fetched once a viewer actually zooms into that product.
const ITEMS: Item[] = [
  { thumb: "/thumbs/product1.jpg", full: "/product1.jpg", name: "Terracotta Edition" },
  { thumb: "/thumbs/product2.jpg", full: "/product2.jpg", name: "Onyx Edition" },
  { thumb: "/thumbs/product3.jpg", full: "/product3.jpg", name: "Tan & Black Edition" },
  { thumb: "/thumbs/product4.jpg", full: "/product4.jpg", name: "Cream & Cognac Edition" },
  { thumb: "/thumbs/product5.jpg", full: "/product5.jpg", name: "Mocha Edition" },
  { thumb: "/thumbs/product6.jpg", full: "/product6.jpg", name: "Burgundy Edition" },
  { thumb: "/thumbs/product7.jpg", full: "/product7.jpg", name: "Sand & Espresso Edition" },
  { thumb: "/thumbs/product8.jpg", full: "/product8.jpg", name: "Cognac Edition" },
  { thumb: "/thumbs/product9.jpg", full: "/product9.jpg", name: "Amber Edition" },
  { thumb: "/thumbs/product10.jpg", full: "/product10.jpg", name: "Crimson Edition" },
  { thumb: "/thumbs/product11.jpg", full: "/product11.jpg", name: "Mocha Deluxe Edition" },
  { thumb: "/thumbs/product12.jpg", full: "/product12.jpg", name: "Ruby Edition" },
  { thumb: "/thumbs/product13.jpg", full: "/product13.jpg", name: "Super Bright LED Headlights" },
  { thumb: "/thumbs/product14.jpg", full: "/product14.jpg", name: "Helicopter Aroma Diffuser" },
  { thumb: "/thumbs/product15.jpg", full: "/product15.jpg", name: "Sameili X Fragrance Collection" },
];

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;

export default function ProductGallery() {
  const { t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);

  // Lock page scroll while any overlay is open
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  // Escape key handling
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomIndex !== null) setZoomIndex(null);
        else setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, zoomIndex]);

  return (
    <>
      <button
        type="button"
        className="royal-view-all-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Open full product gallery"
      >
        <LayoutGrid size={15} />
        {t.viewAllBtn}
      </button>

      {isOpen &&
        createPortal(
          <div className="royal-gallery-overlay" role="dialog" aria-modal="true" aria-label="All Royal GLX products">
            <div className="royal-gallery-header">
              <div>
                <p className="royal-gallery-eyebrow">Royal GLX</p>
                <h3>{t.galleryHeading}</h3>
              </div>
              <button type="button" className="royal-gallery-close" onClick={() => setIsOpen(false)} aria-label="Close gallery">
                <X />
              </button>
            </div>

            <div className="royal-gallery-grid">
              {ITEMS.map((item, i) => (
                <button
                  type="button"
                  key={item.src}
                  className="royal-gallery-item"
                  onClick={() => setZoomIndex(i)}
                  aria-label={`Zoom into ${item.name}`}
                >
                  <img src={item.thumb} alt={item.name} loading="lazy" decoding="async" />
                  <span className="royal-gallery-item-overlay">
                    <ZoomIn size={16} />
                  </span>
                  <span className="royal-gallery-item-tag">
                    <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                    <span className="name">{item.name}</span>
                  </span>
                </button>
              ))}
            </div>

            <p className="royal-gallery-footnote">{t.galleryFootnote}</p>
          </div>,
          document.body
        )}

      {zoomIndex !== null &&
        createPortal(
          <ZoomViewer
            items={ITEMS}
            index={zoomIndex}
            onIndexChange={setZoomIndex}
            onClose={() => setZoomIndex(null)}
            zoomHint={t.zoomHint}
          />,
          document.body
        )}
    </>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function distanceBetween(a: React.Touch, b: React.Touch) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

function ZoomViewer({
  items,
  index,
  onIndexChange,
  onClose,
  zoomHint,
}: {
  items: Item[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
  zoomHint: string;
}) {
  const total = items.length;
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  const gesture = useRef({
    mode: "idle" as "idle" | "pan" | "pinch" | "swipe",
    startX: 0,
    startY: 0,
    startPanX: 0,
    startPanY: 0,
    startDistance: 0,
    startScale: 1,
    lastDx: 0,
  });

  // Reset zoom whenever the active image changes
  useEffect(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, [index]);

  const maxPanFor = useCallback((s: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    const w = rect?.width ?? 300;
    const h = rect?.height ?? 300;
    return { x: (w * (s - 1)) / 2, y: (h * (s - 1)) / 2 };
  }, []);

  const clampPan = useCallback(
    (x: number, y: number, s: number) => {
      const max = maxPanFor(s);
      return { x: clamp(x, -max.x, max.x), y: clamp(y, -max.y, max.y) };
    },
    [maxPanFor]
  );

  const next = useCallback(() => onIndexChange((index + 1) % total), [index, onIndexChange, total]);
  const prev = useCallback(() => onIndexChange((index - 1 + total) % total), [index, onIndexChange, total]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => {
      const ns = clamp(s - e.deltaY * 0.0018, MIN_SCALE, MAX_SCALE);
      if (ns <= MIN_SCALE) setPan({ x: 0, y: 0 });
      else setPan((p) => clampPan(p.x, p.y, ns));
      return ns;
    });
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (scale > 1) {
      setScale(1);
      setPan({ x: 0, y: 0 });
      return;
    }
    if (rect) {
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      const target = clampPan(-offsetX * 1.4, -offsetY * 1.4, DOUBLE_TAP_SCALE);
      setPan(target);
    }
    setScale(DOUBLE_TAP_SCALE);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsPanning(true);
    gesture.current.mode = "pan";
    gesture.current.startX = e.clientX;
    gesture.current.startY = e.clientY;
    gesture.current.startPanX = pan.x;
    gesture.current.startPanY = pan.y;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (gesture.current.mode !== "pan" || scale <= 1) return;
    const dx = e.clientX - gesture.current.startX;
    const dy = e.clientY - gesture.current.startY;
    const next = clampPan(gesture.current.startPanX + dx, gesture.current.startPanY + dy, scale);
    setPan(next);
  };

  const endMouse = () => {
    gesture.current.mode = "idle";
    setIsPanning(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      gesture.current.mode = "pinch";
      gesture.current.startDistance = distanceBetween(e.touches[0], e.touches[1]);
      gesture.current.startScale = scale;
    } else if (e.touches.length === 1) {
      const t = e.touches[0];
      gesture.current.startX = t.clientX;
      gesture.current.startY = t.clientY;
      gesture.current.lastDx = 0;
      if (scale > 1) {
        gesture.current.mode = "pan";
        gesture.current.startPanX = pan.x;
        gesture.current.startPanY = pan.y;
      } else {
        gesture.current.mode = "swipe";
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (gesture.current.mode === "pinch" && e.touches.length === 2) {
      const d = distanceBetween(e.touches[0], e.touches[1]);
      const ns = clamp((gesture.current.startDistance ? d / gesture.current.startDistance : 1) * gesture.current.startScale, MIN_SCALE, MAX_SCALE);
      setScale(ns);
      if (ns <= MIN_SCALE) setPan({ x: 0, y: 0 });
    } else if (gesture.current.mode === "pan" && e.touches.length === 1) {
      const t = e.touches[0];
      const dx = t.clientX - gesture.current.startX;
      const dy = t.clientY - gesture.current.startY;
      setPan(clampPan(gesture.current.startPanX + dx, gesture.current.startPanY + dy, scale));
    } else if (gesture.current.mode === "swipe" && e.touches.length === 1) {
      gesture.current.lastDx = e.touches[0].clientX - gesture.current.startX;
    }
  };

  const handleTouchEnd = () => {
    if (gesture.current.mode === "swipe") {
      if (gesture.current.lastDx < -60) next();
      else if (gesture.current.lastDx > 60) prev();
    }
    if (scale <= 1.02) {
      setScale(1);
      setPan({ x: 0, y: 0 });
    }
    gesture.current.mode = "idle";
  };

  const item = items[index];

  return (
    <div className="royal-zoom-overlay" role="dialog" aria-modal="true" aria-label={`Zoomed view of ${item.name}`}>
      <div className="royal-zoom-topbar">
        <span className="royal-zoom-counter">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} — {item.name}
        </span>
        <button type="button" className="royal-zoom-close" onClick={onClose} aria-label="Close zoom view">
          <X />
        </button>
      </div>

      <div
        className="royal-zoom-stage"
        ref={stageRef}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endMouse}
        onMouseLeave={endMouse}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={item.full}
          alt={item.name}
          draggable={false}
          className="royal-zoom-image"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transition: isPanning ? "none" : "transform 0.2s ease-out",
            cursor: scale > 1 ? (isPanning ? "grabbing" : "grab") : "zoom-in",
          }}
        />
      </div>

      <button type="button" className="royal-zoom-arrow left" onClick={prev} aria-label="Previous product">
        <ChevronLeft />
      </button>
      <button type="button" className="royal-zoom-arrow right" onClick={next} aria-label="Next product">
        <ChevronRight />
      </button>

      <p className="royal-zoom-hint">{zoomHint}</p>
    </div>
  );
}
