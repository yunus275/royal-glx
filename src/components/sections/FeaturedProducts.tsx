import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLang } from "@/contexts/language-context";

const productImages = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1605559424843-9073c6223bd6?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1617531653332-bd46c16f7d37?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1617469165786-8007eda3caa7?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1614026480209-d49b5c5b22ca?w=600&h=400&fit=crop&q=80",
];

export default function FeaturedProducts() {
  const { t } = useLang();

  return (
    <section id="products" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold tracking-tight mb-3">{t.productsTitle}</h2>
          <p className="text-muted-foreground">{t.productsSub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {t.products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
              className="group rounded-2xl overflow-hidden border border-border/50 bg-card hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
              data-testid={`card-product-${i}`}
            >
              <div className="aspect-[4/3] w-full relative overflow-hidden">
                <img
                  src={productImages[i]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block bg-primary/90 text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {product.nameLocal}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-base mb-1.5 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{product.desc}</p>
                <button
                  className="w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground text-sm font-semibold border border-primary/25 hover:border-primary transition-all duration-200"
                  data-testid={`button-inquire-${i}`}
                >
                  <MessageCircle className="h-4 w-4" /> {t.inquire}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
