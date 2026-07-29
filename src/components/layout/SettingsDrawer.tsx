import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useLang, type Lang } from "@/contexts/language-context";

const langOptions: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "English",  native: "EN" },
  { code: "ar", label: "العربية",  native: "عر" },
  { code: "zh", label: "中文",     native: "中" },
];

const THEMES = [
  { name: "Gold",    hsl: "38 92% 48%",  fg: "25 30% 8%",  hex: "#f59e0b" },
  { name: "Red",     hsl: "4 85% 52%",   fg: "0 0% 100%",  hex: "#ef4444" },
  { name: "Rose",    hsl: "340 82% 62%", fg: "0 0% 100%",  hex: "#f43f73" },
  { name: "Sky",     hsl: "198 90% 52%", fg: "0 0% 100%",  hex: "#0ea5e9" },
  { name: "Violet",  hsl: "262 80% 62%", fg: "0 0% 100%",  hex: "#8b5cf6" },
  { name: "Emerald", hsl: "152 70% 42%", fg: "0 0% 100%",  hex: "#10b981" },
  { name: "Orange",  hsl: "24 95% 52%",  fg: "25 30% 8%",  hex: "#f97316" },
];

const VARS = ["--primary", "--accent", "--ring", "--sidebar-primary", "--sidebar-ring", "--chart-1"];

type Props = { open: boolean; onClose: () => void };

export default function SettingsDrawer({ open, onClose }: Props) {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLang();

  // Track active HSL in React state so color palette presses update instantly
  const [activeHsl, setActiveHsl] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("royal-theme-hsl") || THEMES[0].hsl;
    }
    return THEMES[0].hsl;
  });

  const handleApplyColor = (hsl: string, fg: string) => {
    setActiveHsl(hsl);
    const root = document.documentElement;
    VARS.forEach((v) => root.style.setProperty(v, hsl));
    root.style.setProperty("--primary-foreground", fg);
    root.style.setProperty("--accent-foreground", fg);
    localStorage.setItem("royal-theme-hsl", hsl);
    localStorage.setItem("royal-theme-fg", fg);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />

          {/* Drawer - Smooth non-shaking top slide */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              background: "rgba(12, 12, 18, 0.94)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderTop: "none",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
            }}
            className="absolute top-[60px] left-0 right-0 z-50 rounded-b-3xl px-5 pb-5 pt-4"
          >
            {/* Close row */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground">Settings</p>
              <button
                onClick={onClose}
                className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground active:scale-90 transition-transform"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5 mb-4" />

            {/* Language */}
            <div className="mb-5">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/60 mb-2.5">Language</p>
              <div className="flex gap-2">
                {langOptions.map((l) => {
                  const isSelected = lang === l.code;
                  return (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code)}
                      className="relative flex-1 flex flex-col items-center gap-1 py-2.5 px-2 rounded-2xl text-center overflow-hidden transition-all duration-200 active:scale-95"
                      style={{
                        background: isSelected ? "hsl(var(--primary)/0.15)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${isSelected ? "hsl(var(--primary)/0.5)" : "rgba(255,255,255,0.06)"}`,
                      }}
                      data-testid={`lang-${l.code}`}
                    >
                      <span className={`text-base font-bold transition-colors ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                        {l.native}
                      </span>
                      <span className={`text-[9px] font-medium transition-colors ${isSelected ? "text-primary/80" : "text-muted-foreground/50"}`}>
                        {l.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5 mb-4" />

            {/* Theme color palette */}
            <div className="mb-5">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/60 mb-3">Theme Color</p>
              <div className="grid grid-cols-7 gap-2">
                {THEMES.map((th) => {
                  const isActive = activeHsl === th.hsl;
                  return (
                    <button
                      key={th.name}
                      onClick={() => handleApplyColor(th.hsl, th.fg)}
                      title={th.name}
                      className="flex flex-col items-center gap-1.5 group transition-transform active:scale-90"
                    >
                      <div
                        className="h-8 w-8 rounded-full shadow-md transition-all duration-200 group-hover:scale-110"
                        style={{
                          backgroundColor: th.hex,
                          outline: isActive ? `3px solid ${th.hex}` : "3px solid transparent",
                          outlineOffset: "2px",
                          boxShadow: isActive ? `0 0 14px ${th.hex}aa` : undefined,
                        }}
                      />
                      <span className="text-[8px] text-muted-foreground/60 leading-none">{th.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5 mb-4" />

            {/* Appearance */}
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/60 mb-2.5">Appearance</p>
              <div className="flex gap-2">
                {(["light", "dark"] as const).map((mode) => {
                  const isSelected = theme === mode;
                  return (
                    <button
                      key={mode}
                      onClick={() => setTheme(mode)}
                      className="relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl transition-all duration-200 active:scale-95"
                      style={{
                        background: isSelected ? "hsl(var(--primary)/0.15)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${isSelected ? "hsl(var(--primary)/0.5)" : "rgba(255,255,255,0.06)"}`,
                      }}
                      data-testid={`button-theme-${mode}`}
                    >
                      <span>
                        {mode === "dark" ? <Moon className="h-4 w-4 text-muted-foreground" /> : <Sun className="h-4 w-4 text-amber-400" />}
                      </span>
                      <span className={`text-sm font-semibold capitalize transition-colors ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                        {mode}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
