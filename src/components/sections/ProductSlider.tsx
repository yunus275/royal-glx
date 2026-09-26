import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/contexts/language-context";

interface Slide {
  src: string;
  name: string;
}

// Lightweight thumbnails (~50-65kb each) keep the slider fast to load;
// the full-resolution originals are only fetched when a photo is zoomed.
const SLIDES: Slide[] = [
  { src: "/thumbs/product1.jpg", name: "Terracotta Edition" },
  { src: "/thumbs/product2.jpg", name: "Onyx Edition" },
  { src: "/thumbs/product3.jpg", name: "Tan & Black Edition" },
  { src: "/thumbs/product4.jpg", name: "Cream & Cognac Edition" },
  { src: "/thumbs/product5.jpg", name: "Mocha Edition" },
  { src: "/thumbs/product6.jpg", name: "Burgundy Edition" },
  { src: "/thumbs/product7.jpg", name: "Sand & Espresso Edition" },
  { src: "/thumbs/product8.jpg", name: "Cognac Edition" },
  { src: "/thumbs/product9.jpg", name: "Amber Edition" },
  { src: "/thumbs/product10.jpg", name: "Crimson Edition" },
  { src: "/thumbs/product11.jpg", name: "Mocha Deluxe Edition" },
  { src: "/thumbs/product12.jpg", name: "Ruby Edition" },
  { src: "/thumbs/product13.jpg", name: "Super Bright LED Headlights" },
  { src: "/thumbs/product14.jpg", name: "Helicopter Aroma Diffuser" },
  { src: "/thumbs/product15.jpg", name: "Sameili X Fragrance Collection" },
];

const AUTOPLAY_MS = 7000;
const SWIPE_THRESHOLD_PCT = 10;

export default function ProductSlider() {
  const { t } = useLang();
  const total = SLIDES.length;
  const [index, setIndex] = useState(0);
  const [dragOffsetPct, setDragOffsetPct] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef(0);
  const widthRef = useRef(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const goTo = useCallback(
    (next: number) => {
      setIsTransitioning(true);
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay
  useEffect(() => {
    if (isDragging) return;
    clearTimer();
    timerRef.current = setTimeout(() => {
      setIsTransitioning(true);
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return clearTimer;
  }, [index, isDragging, total, clearTimer]);

  const measure = useCallback(() => {
    if (sliderRef.current) {
      widthRef.current = sliderRef.current.getBoundingClientRect().width || 1;
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const handlePointerDown = (clientX: number) => {
    measure();
    clearTimer();
    setIsDragging(true);
    setIsTransitioning(false);
    startXRef.current = clientX;
    setDragOffsetPct(0);
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaPx = clientX - startXRef.current;
    setDragOffsetPct((deltaPx / widthRef.current) * 100);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsTransitioning(true);
    if (dragOffsetPct < -SWIPE_THRESHOLD_PCT) {
      next();
    } else if (dragOffsetPct > SWIPE_THRESHOLD_PCT) {
      prev();
    }
    setDragOffsetPct(0);
  };

  const trackTransform = `translateX(calc(${-index * 100}% + ${dragOffsetPct}%))`;

  return (
    <div className="royal-slider-wrap">
      <div className="royal-slider-top">
        <p className="royal-slider-hint">{t.sliderHint}</p>
        <span className="royal-slider-counter">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div
        className={`royal-slider${isDragging ? " is-dragging" : ""}`}
        ref={sliderRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Royal GLX product wallpapers"
        tabIndex={0}
        onMouseDown={(e) => handlePointerDown(e.clientX)}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
        onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
        onTouchEnd={handlePointerUp}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") next();
          if (e.key === "ArrowLeft") prev();
        }}
      >
        <div
          className="royal-slider-track"
          style={{
            transform: trackTransform,
            transition: isTransitioning ? "transform 0.45s cubic-bezier(.22,1,.36,1)" : "none",
          }}
        >
          {SLIDES.map((slide, i) => {
            const isNear = Math.abs(i - index) <= 1 || (i === 0 && index === total - 1) || (i === total - 1 && index === 0);
            return (
              <div className="royal-slide" key={slide.src}>
                {isNear ? (
                  <img
                    src={slide.src}
                    alt={`Royal GLX product ${i + 1} — ${slide.name}`}
                    draggable={false}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    decoding="async"
                  />
                ) : (
                  <div className="royal-slide-placeholder" aria-hidden="true" />
                )}
                <span className="royal-slide-tag">
                  <span className="royal-slide-name">{slide.name}</span>
                  <span className="royal-slide-idx">{String(i + 1).padStart(2, "0")}</span>
                </span>
              </div>
            );
          })}
        </div>

        <button type="button" className="royal-slider-arrow left" onClick={prev} aria-label="Previous wallpaper">
          <ChevronLeft />
        </button>
        <button type="button" className="royal-slider-arrow right" onClick={next} aria-label="Next wallpaper">
          <ChevronRight />
        </button>
      </div>

      <div className="royal-slider-dots">
        {SLIDES.map((slide, i) => (
          <button
            type="button"
            key={slide.src}
            className={`royal-slider-dot${i === index ? " is-active" : ""}${i < index ? " is-done" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          >
            <span className="fill" style={i === index ? { animationDuration: `${AUTOPLAY_MS}ms` } : undefined} />
          </button>
        ))}
      </div>
    </div>
  );
}
