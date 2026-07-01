import { useState } from "react";
import { motion } from "framer-motion";
import { Home, MapPin, Phone } from "lucide-react";
import { useLang } from "@/contexts/language-context";

const tabs = [
  { id: "home",     icon: Home,   labelKey: "navHome"     as const, scrollTo: "home"     },
  { id: "location", icon: MapPin, labelKey: "navLocation" as const, scrollTo: "location" },
  { id: "contact",  icon: Phone,  labelKey: "navContact"  as const, scrollTo: "contact"  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { type: "spring", stiffness: 340, damping: 22 } },
};

export default function MobileBottomNav() {
  const { t } = useLang();
  const [active, setActive] = useState("contact");

  const go = (id: string, scrollTo: string) => {
    setActive(id);
    if (scrollTo === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="md:hidden fixed bottom-5 left-4 right-4 z-50 flex justify-center">
      <motion.nav
        initial={{ y: 36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.2 }}
        className="w-full max-w-xs"
        style={{
          background: "rgba(10, 10, 16, 0.78)",
          backdropFilter: "blur(52px) saturate(200%)",
          WebkitBackdropFilter: "blur(52px) saturate(200%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 16px 48px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05) inset",
          borderRadius: "28px",
          padding: "6px",
        }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex items-center"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <motion.div key={tab.id} variants={item} className="flex-1">
                <motion.button
                  onClick={() => go(tab.id, tab.scrollTo)}
                  className="relative w-full flex flex-col items-center gap-[3px] py-2.5 px-1"
                  whileTap={{ scale: 0.82 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                >
                  {/* Active pill background */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-[20px] bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      style={{ boxShadow: "0 0 24px hsl(var(--primary)/0.5)" }}
                    />
                  )}

                  {/* Icon with bounce on activation */}
                  <motion.div
                    animate={isActive ? { y: [-2, 0] } : { y: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 14 }}
                    className="relative z-10"
                  >
                    <Icon
                      className={`h-[18px] w-[18px] transition-colors ${isActive ? "text-primary-foreground" : "text-white/45"}`}
                      strokeWidth={isActive ? 2.3 : 1.7}
                    />
                  </motion.div>

                  <span className={`relative z-10 text-[9px] font-bold tracking-wide transition-colors ${isActive ? "text-primary-foreground" : "text-white/40"}`}>
                    {t[tab.labelKey]}
                  </span>
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.nav>
    </div>
  );
}
