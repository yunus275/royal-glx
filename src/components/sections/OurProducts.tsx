import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/contexts/language-context";

const images = [
  "/product1.jpg",
  "/product2.jpg",
  "/product3.jpg",
  "/product4.jpg",
  "/product5.jpg",
  "/product6.jpg",
];

export default function OurProducts() {
  const { t } = useLang();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox((i) => (i! - 1 + images.length) % images.length);
  const next = () => setLightbox((i) => (i! + 1) % images.length);

  return (
    <section id="products" className="py-12 sm:py-20 border-t border-border/40 bg-card/20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10 pb-6 border-b border-border/40">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">
            {t.productsTitle}
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
              onClick={() => setLightbox(i)}
              className="group relative rounded-2xl overflow-hidden border border-border/50 bg-card/50 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img
                  src={src}
                  alt={`Product ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                {/* Tap to view hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-semibold bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                    View
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-60 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev button */}
            <button
              className="absolute left-3 sm:left-6 z-60 h-11 w-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Image */}
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              src={images[lightbox]}
              alt={`Product ${lightbox + 1}`}
              className="max-h-[88vh] max-w-[90vw] sm:max-w-[80vw] object-contain rounded-2xl shadow-2xl select-none"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next button */}
            <button
              className="absolute right-3 sm:right-6 z-60 h-11 w-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                  className={`h-1.5 rounded-full transition-all duration-200 ${i === lightbox ? "w-6 bg-primary" : "w-1.5 bg-white/40 hover:bg-white/60"}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}