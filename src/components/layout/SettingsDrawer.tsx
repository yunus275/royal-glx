import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, X, Settings2 } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useLang, type Lang } from "@/contexts/language-context";

const langOptions: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "English", native: "EN" },
  { code: "ar", label: "العربية", native: "عربي" },
  { code: "zh", label: "中文", native: "中" },
];

type Props = { open: boolean; onClose: () => void };

export default function SettingsDrawer({ open, onClose }: Props) {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLang();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            className="royal-settings-backdrop"
            aria-label="Close settings"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.section
            className="royal-settings-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
            initial={{ opacity: 0, x: "-50%", y: "-47%", scale: 0.94 }}
            animate={{ opacity: 1, x: "-50%", y: "-50%", scale: 1 }}
            exit={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.96 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
          >
            <div className="royal-settings-head">
              <div className="royal-settings-title">
                <span><Settings2 aria-hidden="true" /></span>
                <h2 id="settings-title">Settings</h2>
              </div>
              <motion.button
                type="button"
                className="royal-settings-close"
                onClick={onClose}
                whileTap={{ scale: 0.88 }}
                whileHover={{ rotate: 90 }}
                aria-label="Close settings"
              >
                <X aria-hidden="true" />
              </motion.button>
            </div>

            <div className="royal-settings-group">
              <span className="royal-settings-label">Language</span>
              <div className="royal-settings-options">
                {langOptions.map((option) => (
                  <motion.button
                    type="button"
                    key={option.code}
                    className={lang === option.code ? "is-active" : ""}
                    onClick={() => setLang(option.code)}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  >
                    <b>{option.native}</b>
                    <span>{option.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="royal-settings-group">
              <span className="royal-settings-label">Appearance</span>
              <div className="royal-settings-appearance">
                {(["dark", "light"] as const).map((mode) => (
                  <motion.button
                    type="button"
                    key={mode}
                    className={theme === mode ? "is-active" : ""}
                    onClick={() => setTheme(mode)}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  >
                    {mode === "dark" ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
                    {mode}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
}