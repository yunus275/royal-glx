import { motion } from "framer-motion";
import { useLang } from "@/contexts/language-context";
import ProductSlider from "./ProductSlider";
import ProductGallery from "./ProductGallery";

export default function OurProducts() {
  const { t } = useLang();

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
          <div className="royal-products-heading-actions">
            <span>01 — 15</span>
            <ProductGallery />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6 }}
        >
          <ProductSlider />
        </motion.div>
      </div>
    </section>
  );
}
