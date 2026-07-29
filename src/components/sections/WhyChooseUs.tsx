import { motion } from "framer-motion";
import { Truck, ShieldCheck, RotateCcw, Award } from "lucide-react";
import { useLang } from "@/contexts/language-context";

const icons = [Truck, ShieldCheck, RotateCcw, Award];
const colors = [
  { text: "text-blue-500", bg: "bg-blue-500/10" },
  { text: "text-emerald-500", bg: "bg-emerald-500/10" },
  { text: "text-amber-500", bg: "bg-amber-500/10" },
  { text: "text-violet-500", bg: "bg-violet-500/10" },
];

export default function WhyChooseUs() {
  const { t } = useLang();

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold tracking-tight mb-3">{t.whyTitle}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t.whySub}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.features.map((feature, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col p-7 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200"
              >
                <div className={`h-12 w-12 rounded-xl ${colors[i].bg} flex items-center justify-center mb-5`}>
                  <Icon className={`h-6 w-6 ${colors[i].text}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
