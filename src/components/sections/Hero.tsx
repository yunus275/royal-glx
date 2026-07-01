import { motion } from "framer-motion";
import { useLang } from "@/contexts/language-context";

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative w-full overflow-hidden bg-background flex flex-col items-center justify-center min-h-[82vh]">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 55% at 50% -5%, hsl(var(--primary)/0.2), transparent 65%)" }}
      />
      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full">
        {/* Baghdad pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-primary/90">
            {t.baghdadIraq}
          </span>
        </motion.div>

        {/* Two-column layout: Logo & Video */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full max-w-4xl">
          {/* Logo container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex-shrink-0"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 80% 60% at 50% 55%, hsl(var(--primary)/0.18), transparent 70%)",
                filter: "blur(24px)",
                transform: "scale(1.15)",
              }}
            />
            <img
              src="/brand-logo.png"
              alt="Royal GLX"
              className="relative w-[68vw] sm:w-[36vw] md:w-[28vw] max-w-[280px] md:max-w-[320px] object-contain select-none"
              style={{
                filter: "drop-shadow(0 6px 28px rgba(0,0,0,0.55)) drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
                imageRendering: "crisp-edges",
              }}
              draggable={false}
            />
          </motion.div>

          {/* Vertical Video Box (Screenshot Box) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.32, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[36vw] max-w-[380px]"
          >
            {/* Border glow */}
            <div
              className="absolute -inset-[2px] rounded-2xl pointer-events-none"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)/0.6) 0%, transparent 50%, hsl(var(--primary)/0.3) 100%)",
                filter: "blur(1px)",
              }}
            />
            {/* Pulsing glow shadow */}
            <motion.div
              className="absolute -inset-[1px] rounded-2xl pointer-events-none"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                boxShadow: "0 0 24px 4px hsl(var(--primary)/0.25), inset 0 0 12px 2px hsl(var(--primary)/0.1)",
                borderRadius: "1rem",
              }}
            />
            {/* Video */}
            <video
              src="/promo-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="relative w-full rounded-2xl object-cover"
              style={{
                aspectRatio: "9/16",
                maxHeight: "56vh",
                objectFit: "cover",
                boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
              }}
            />
          </motion.div>
        </div>

        {/* CAR ACCESSORIES tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.48, duration: 0.5 }}
          className="mt-8 text-[9px] sm:text-[11px] font-bold tracking-[0.42em] uppercase text-muted-foreground/70"
        >
          {t.heroTag}
        </motion.p>
      </div>
    </section>
  );
}
