import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLang, type Lang } from "@/contexts/language-context";

const images = ["/product1.jpg", "/product2.jpg", "/product3.jpg", "/product4.jpg", "/product5.jpg", "/product6.jpg"];
const productNames: Record<Lang, string[]> = {
  en: ["Key duplication", "Android screens", "LED lighting", "Seat upholstery", "Car batteries", "Premium accessories"],
  ar: ["نسخ المفاتيح", "شاشات أندرويد", "إضاءة LED", "تنجيد المقاعد", "بطاريات السيارات", "إكسسوارات فاخرة"],
  zh: ["钥匙复制", "安卓车机屏幕", "LED 灯光", "座椅装饰", "汽车电池", "高端配件"],
};

export default function OurProducts() {
  const { t, lang } = useLang();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const names = productNames[lang];

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
            >
              <span className="royal-product-image">
                <img src={src} alt={names[index]} loading="lazy" />
                <span className="royal-product-number">0{index + 1}</span>
              </span>
              <span className="royal-product-name">{names[index]}</span>
              <span className="royal-product-view">View collection ↗</span>
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
            aria-label={names[lightbox]}
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
              alt={names[lightbox]}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              onClick={(event) => event.stopPropagation()}
            />
            <button type="button" className="royal-lightbox-arrow right" onClick={(event) => { event.stopPropagation(); next(); }} aria-label="Next">
              <ChevronRight />
            </button>
            <p>{names[lightbox]}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}