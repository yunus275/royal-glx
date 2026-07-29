import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, MapPin, Phone } from "lucide-react";
import { useLang } from "@/contexts/language-context";

const tabs = [
  { id: "home",     icon: Home,   labelKey: "navHome"     as const, scrollTo: "home"     },
  { id: "location", icon: MapPin, labelKey: "navLocation" as const, scrollTo: "location" },
  { id: "contact",  icon: Phone,  labelKey: "navContact"  as const, scrollTo: "contact"  },
];

export default function MobileBottomNav() {
  const { t } = useLang();
  // Default to "home" tab on page load
  const [active, setActive] = useState("home");

  const go = (id: string, scrollTo: string) => {
    setActive(id);
    if (scrollTo === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Sync active tab with scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      
      const locationEl = document.getElementById("location");
      const contactEl = document.getElementById("contact");

      const locationTop = locationEl ? locationEl.offsetTop - 300 : Infinity;
      const contactTop = contactEl ? contactEl.offsetTop - 300 : Infinity;

      if (scrollY >= contactTop || (height > 0 && scrollY / height > 0.85)) {
        setActive("contact");
      } else if (scrollY >= locationTop) {
        setActive("location");
      } else {
        setActive("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="md:hidden fixed bottom-5 left-4 right-4 z-50 flex justify-center">
      <motion.nav
        initial={{ y: 36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 26, delay: 0.1 }}
        className="w-full max-w-xs"
        style={{
          background: "rgba(10, 10, 16, 0.82)",
          backdropFilter: "blur(52px) saturate(200%)",
          WebkitBackdropFilter: "blur(52px) saturate(200%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 16px 48px rgba(0,0,0,0.65), 0 1px 0 rgba(255,255,255,0.08) inset",
          borderRadius: "28px",
          padding: "6px",
        }}
      >
        <div className="flex items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <div key={tab.id} className="flex-1">
                <button
                  onClick={() => go(tab.id, tab.scrollTo)}
                  className="relative w-full flex flex-col items-center gap-[3px] py-2.5 px-1 rounded-[20px] transition-transform active:scale-95"
                >
                  {/* Sliding yellow rectangle active pill */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-[20px] bg-primary"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      style={{ boxShadow: "0 0 20px hsl(var(--primary)/0.45)" }}
                    />
                  )}

                  {/* Icon */}
                  <div className="relative z-10">
                    <Icon
                      className={`h-[18px] w-[18px] transition-colors duration-200 ${isActive ? "text-primary-foreground" : "text-white/45"}`}
                      strokeWidth={isActive ? 2.3 : 1.7}
                    />
                  </div>

                  {/* Label */}
                  <span className={`relative z-10 text-[9px] font-bold tracking-wide transition-colors duration-200 ${isActive ? "text-primary-foreground" : "text-white/40"}`}>
                    {t[tab.labelKey]}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
}
