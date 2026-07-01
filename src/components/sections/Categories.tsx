import { motion } from "framer-motion";
import { Key, Monitor, Lightbulb, Armchair, Battery, Sparkles } from "lucide-react";

const categories = [
  { name: "Keys & Programming", nameAr: "مفاتيح وبرمجة", icon: Key, accent: "from-amber-500 to-yellow-400", bg: "bg-amber-500/10 border-amber-500/20 hover:border-amber-500/50" },
  { name: "Screens & Electronics", nameAr: "شاشات وإلكترونيات", icon: Monitor, accent: "from-blue-600 to-cyan-500", bg: "bg-blue-500/10 border-blue-500/20 hover:border-blue-500/50" },
  { name: "LED Lighting", nameAr: "ليتات LED", icon: Lightbulb, accent: "from-yellow-500 to-orange-400", bg: "bg-yellow-400/10 border-yellow-400/20 hover:border-yellow-400/50" },
  { name: "Seat & Interior", nameAr: "تنجيد وداخلية", icon: Armchair, accent: "from-amber-800 to-orange-500", bg: "bg-orange-500/10 border-orange-500/20 hover:border-orange-500/50" },
  { name: "Batteries", nameAr: "بطاريات", icon: Battery, accent: "from-red-600 to-rose-400", bg: "bg-red-500/10 border-red-500/20 hover:border-red-500/50" },
  { name: "Car Care", nameAr: "العناية بالسيارة", icon: Sparkles, accent: "from-teal-500 to-emerald-400", bg: "bg-teal-400/10 border-teal-400/20 hover:border-teal-400/50" },
];

export default function Categories() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-3">What We Offer</h2>
          <p className="text-muted-foreground">Specialized services and accessories for every car owner</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className={`flex flex-col items-center justify-center p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${cat.bg}`}
              data-testid={`category-${i}`}
            >
              <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${cat.accent} flex items-center justify-center mb-3 shadow-lg`}>
                <cat.icon className="h-7 w-7 text-white" />
              </div>
              <span className="font-semibold text-sm text-center leading-tight">{cat.name}</span>
              <span className="text-xs text-muted-foreground mt-1 text-center">{cat.nameAr}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
