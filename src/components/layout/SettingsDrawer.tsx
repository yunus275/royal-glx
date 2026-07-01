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

function applyColor(hsl: string, fg: string) {
  const root = document.documentElement;
  VARS.forEach(v => root.style.setProperty(v, hsl));
  root.style.setProperty("--primary-foreground", fg);
  root.style.setProperty("--accent-foreground", fg);
  localStorage.setItem("royal-theme-hsl", hsl);
  localStorage.setItem("royal-theme-fg", fg);
}

type Props = { open: boolean; onClose: () => void };

export default function SettingsDrawer({ open, onClose }: Props) {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLang();

  const savedHsl = typeof window !== "undefined" ? (localStorage.getItem("royal-theme-hsl") || THEMES[0].hsl) : THEMES[0].hsl;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ opacity: 0, y: -12, scaleY: 0.92 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            style={{
              transformOrigin: "top center",
              background: "rgba(10, 10, 16, 0.88)",
              backdropFilter: "blur(52px) saturate(200%)",
              WebkitBackdropFilter: "blur(52px) saturate(200%)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderTop: "none",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
            className="absolute top-[60px] left-0 right-0 z-50 rounded-b-3xl px-5 pb-5 pt-4"
          >
            {/* Close row */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground">Settings</p>
              <motion.button
                onClick={onClose}
                className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground"
                style={{ background: "rgba(255,255,255,0.06)" }}
                whileTap={{ scale: 0.85 }}
              >
                <X className="h-3.5 w-3.5" />
              </motion.button>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5 mb-4" />

            {/* Language */}
            <div className="mb-5">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/60 mb-2.5">Language</p>
              <div className="flex gap-2">
                {langOptions.map((l) => (
                  <motion.button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className="relative flex-1 flex flex-col items-center gap-1 py-2.5 px-2 rounded-2xl text-center overflow-hidden"
                    style={{
                      background: lang === l.code ? undefined : "rgba(255,255,255,0.04)",
                      border: `1px solid ${lang === l.code ? "hsl(var(--primary)/0.5)" : "rgba(255,255,255,0.06)"}`,
                    }}
                    whileTap={{ scale: 0.92 }}
                    data-testid={`lang-${l.code}`}
                  >
                    {lang === l.code && (
                      <motion.div
                        layoutId="settings-lang-bg"
                        className="absolute inset-0 bg-primary/15 rounded-2xl"
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                      />
                    )}
                    <span className={`relative z-10 text-base font-bold ${lang === l.code ? "text-primary" : "text-muted-foreground"}`}>
                      {l.native}
                    </span>
                    <span className={`relative z-10 text-[9px] font-medium ${lang === l.code ? "text-primary/80" : "text-muted-foreground/50"}`}>
                      {l.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5 mb-4" />

            {/* Theme color */}
            <div className="mb-5">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/60 mb-3">Theme Color</p>
              <div className="grid grid-cols-7 gap-2">
                {THEMES.map((th) => {
                  const isActive = savedHsl === th.hsl;
                  return (
                    <motion.button
                      key={th.name}
                      onClick={() => applyColor(th.hsl, th.fg)}
                      title={th.name}
                      className="flex flex-col items-center gap-1.5"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.88 }}
                    >
                      <div
                        className="h-8 w-8 rounded-full shadow-md"
                        style={{
                          backgroundColor: th.hex,
                          outline: isActive ? `3px solid ${th.hex}` : "3px solid transparent",
                          outlineOffset: "2px",
                          boxShadow: isActive ? `0 0 14px ${th.hex}99` : undefined,
                        }}
                      />
                      <span className="text-[8px] text-muted-foreground/60 leading-none">{th.name}</span>
                    </motion.button>
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
                {(["light", "dark"] as const).map((mode) => (
                  <motion.button
                    key={mode}
                    onClick={() => setTheme(mode)}
                    className="relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl"
                    style={{
                      background: theme === mode ? undefined : "rgba(255,255,255,0.04)",
                      border: `1px solid ${theme === mode ? "hsl(var(--primary)/0.5)" : "rgba(255,255,255,0.06)"}`,
                    }}
                    whileTap={{ scale: 0.92 }}
                    data-testid={`button-theme-${mode}`}
                  >
                    {theme === mode && (
                      <motion.div
                        layoutId="settings-mode-bg"
                        className="absolute inset-0 bg-primary/15 rounded-2xl"
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">
                      {mode === "dark" ? <Moon className="h-4 w-4 text-muted-foreground" /> : <Sun className="h-4 w-4 text-amber-400" />}
                    </span>
                    <span className={`relative z-10 text-sm font-semibold capitalize ${theme === mode ? "text-primary" : "text-muted-foreground"}`}>
                      {mode}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
