import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useLang } from "@/contexts/language-context";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { t } = useLang();

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="royal-hero">
      <div className="royal-container">
        <motion.div
          className="royal-eyebrow"
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="royal-eyebrow-line" />
          {t.established}
        </motion.div>

        <div className="royal-showcase">
          <motion.article
            className="royal-info-card"
            initial={{ opacity: 0, x: 34, y: 16 }}
            animate={{ opacity: 1, x: 0, y: [0, -7, 0] }}
            transition={{ delay: 0.22, duration: 0.8, ease }}
          >
            <p className="royal-card-kicker">{t.wholesaleLabel}</p>
            <h1>{t.premiumTitle}</h1>
            <p className="royal-card-copy">{t.premiumDescription}</p>
            <div className="royal-card-footer">
              <span>{t.quality}</span>
              <span>{t.direct}</span>
            </div>
          </motion.article>

          <motion.div
            className="royal-video-shape"
            initial={{ opacity: 0, x: -34, rotate: -1.5 }}
            animate={{ opacity: 1, x: 0, rotate: -1.5, y: [0, -10, 0] }}
            transition={{
              opacity: { delay: 0.05, duration: 0.75, ease },
              x: { delay: 0.05, duration: 0.75, ease },
              rotate: { delay: 0.05, duration: 0.75, ease },
              y: { delay: 0.8, duration: 7, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <video
              src="/promo-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="ROYAL GLX showcase"
            />
            <span className="royal-video-label">
              <span />
              Royal GLX / 01
            </span>
          </motion.div>
        </div>

        <motion.button
          type="button"
          className="royal-scroll-hint"
          onClick={scrollToContact}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>{t.scrollContact}</span>
          <span>{t.precision}</span>
          <ArrowDownRight aria-hidden="true" />
        </motion.button>
      </div>
    </section>
  );
}