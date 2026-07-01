import { useState } from "react";
import { motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import { useLang } from "@/contexts/language-context";
import SettingsDrawer from "./SettingsDrawer";

export default function Navbar() {
  const { t } = useLang();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="sticky top-0 z-50 w-full">
      <motion.nav
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="w-full relative"
        style={{
          background: "rgba(10, 10, 16, 0.78)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.3)",
        }}
      >
        {/* Gold glow line at bottom */}
        <div
          className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)/0.55) 50%, transparent)" }}
        />

        <div className="container mx-auto px-4 h-[60px] flex items-center justify-between gap-3">
          {/* Brand */}
          <motion.div
            className="flex items-center gap-2.5 shrink-0 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/logo.png" alt="Royal" className="h-9 w-9 object-contain" />
            <div className="flex flex-col leading-none">
              <span className="text-[13px] font-extrabold tracking-widest text-foreground uppercase">ROYALGLX</span>
              <span className="text-[9px] font-semibold tracking-[0.18em] text-primary/80 uppercase">Car Accessories</span>
            </div>
          </motion.div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 text-[13px] font-semibold">
            <button onClick={() => scrollTo("contact")}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 tracking-wide">
              {t.navAbout}
            </button>
            <button onClick={() => scrollTo("location")}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 tracking-wide">
              {t.navLocation}
            </button>
            <button onClick={() => scrollTo("contact")}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 tracking-wide">
              {t.navContact}
            </button>
          </div>

          {/* Settings button */}
          <motion.button
            onClick={() => setSettingsOpen(o => !o)}
            className="flex items-center gap-2 h-9 px-3.5 rounded-full font-semibold text-[12px]"
            style={{
              background: settingsOpen ? "hsl(var(--primary)/0.15)" : "rgba(255,255,255,0.06)",
              border: `1px solid ${settingsOpen ? "hsl(var(--primary)/0.45)" : "rgba(255,255,255,0.1)"}`,
              color: settingsOpen ? "hsl(var(--primary))" : "rgba(255,255,255,0.6)",
            }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.04 }}
            data-testid="button-settings"
          >
            <motion.div
              animate={{ rotate: settingsOpen ? 60 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Settings2 className="h-4 w-4" />
            </motion.div>
            <span className="hidden sm:inline">Settings</span>
          </motion.button>
        </div>
      </motion.nav>

      {/* Settings drawer anchored to navbar */}
      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
