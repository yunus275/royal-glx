import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLang } from "@/contexts/language-context";

const images = ["/product1.jpg", "/product2.jpg", "/product3.jpg", "/product4.jpg", "/product5.jpg", "/product6.jpg"];

export default function OurProducts() {
  const { t } = useLang();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const next = () => setLightbox((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <section id="products" className="royal-section royal-products-section">
      <div className="royal-container">
        <motion.div
          className="royal-products-heading"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="royal-eyebrow"><span className="royal-eyebrow-line" />{t.productsBadge}</p>
            <h2>{t.productsTitle}</h2>
          </div>
          <span>01 — 06</span>
        </motion.div>

        <div className="royal-products-grid">
          {images.map((src, index) => (
            <motion.button
              type="button"
              key={src}
              className="royal-product-card"
              onClick={() => setLightbox(index)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: (index % 3) * 0.08, duration: 0.55 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`View product image ${index + 1}`}
            >
              <span className="royal-product-image">
                <img src={src} alt={`Royal GLX product ${index + 1}`} loading="lazy" />
                <span className="royal-product-number">0{index + 1}</span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="royal-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Product image ${lightbox + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button type="button" className="royal-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">
              <X />
            </button>
            <button type="button" className="royal-lightbox-arrow left" onClick={(event) => { event.stopPropagation(); prev(); }} aria-label="Previous">
              <ChevronLeft />
            </button>
            <motion.img
              key={lightbox}
              src={images[lightbox]}
              alt={`Royal GLX product ${lightbox + 1}`}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              onClick={(event) => event.stopPropagation()}
            />
            <button type="button" className="royal-lightbox-arrow right" onClick={(event) => { event.stopPropagation(); next(); }} aria-label="Next">
              <ChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}