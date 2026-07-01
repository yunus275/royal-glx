import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X } from "lucide-react";

const THEMES = [
  { name: "Gold",    hsl: "38 92% 48%",  fg: "25 30% 8%",  hex: "#f59e0b" },
  { name: "Rose",    hsl: "340 82% 62%", fg: "0 0% 100%",  hex: "#f43f73" },
  { name: "Sky",     hsl: "198 90% 52%", fg: "0 0% 100%",  hex: "#0ea5e9" },
  { name: "Violet",  hsl: "262 80% 62%", fg: "0 0% 100%",  hex: "#8b5cf6" },
  { name: "Emerald", hsl: "152 70% 42%", fg: "0 0% 100%",  hex: "#10b981" },
  { name: "Orange",  hsl: "24 95% 52%",  fg: "25 30% 8%",  hex: "#f97316" },
  { name: "Red",     hsl: "0 80% 55%",   fg: "0 0% 100%",  hex: "#ef4444" },
];

const VARS = ["--primary", "--accent", "--ring", "--sidebar-primary", "--sidebar-ring", "--chart-1"];

function applyTheme(hsl: string, fg: string) {
  const root = document.documentElement;
  VARS.forEach(v => root.style.setProperty(v, hsl));
  root.style.setProperty("--primary-foreground", fg);
  root.style.setProperty("--accent-foreground", fg);
  localStorage.setItem("royal-theme-hsl", hsl);
  localStorage.setItem("royal-theme-fg", fg);
}

export default function ThemeColorPicker() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(THEMES[0].hsl);

  useEffect(() => {
    const savedHsl = localStorage.getItem("royal-theme-hsl");
    const savedFg  = localStorage.getItem("royal-theme-fg");
    const hsl = savedHsl || THEMES[0].hsl;
    const fg  = savedFg  || THEMES[0].fg;
    applyTheme(hsl, fg);
    setActive(hsl);
  }, []);

  const pick = (t: typeof THEMES[0]) => {
    applyTheme(t.hsl, t.fg);
    setActive(t.hsl);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="rounded-full h-9 w-9 flex items-center justify-center hover:bg-muted transition-colors"
        whileTap={{ scale: 0.9 }}
        aria-label="Choose theme color"
        title="Theme color"
      >
        <Palette className="h-4 w-4" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute end-0 top-11 z-50 bg-card border border-border/60 rounded-2xl shadow-2xl p-4 w-52"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Theme Color</p>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {THEMES.map(th => (
                  <motion.button
                    key={th.name}
                    onClick={() => pick(th)}
                    title={th.name}
                    className="flex flex-col items-center gap-1 group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div
                      className="h-8 w-8 rounded-full shadow-md transition-all duration-200"
                      style={{
                        backgroundColor: th.hex,
                        outline: active === th.hsl ? `3px solid ${th.hex}` : "3px solid transparent",
                        outlineOffset: "2px",
                        boxShadow: active === th.hsl ? `0 0 10px ${th.hex}88` : undefined,
                      }}
                    />
                    <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors leading-none">
                      {th.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
