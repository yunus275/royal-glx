import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import { useLang } from "@/contexts/language-context";

type Props = {
  onSettings: () => void;
};

export default function Navbar({ onSettings }: Props) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <header className={`royal-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="royal-container royal-header-inner">
        <motion.button
          type="button"
          className="royal-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileTap={{ scale: 0.96 }}
          aria-label="ROYAL GLX home"
        >
          <img src="/brand-logo.png" alt="ROYAL GLX" />
        </motion.button>

        <nav className="royal-top-nav" aria-label="Main navigation">
          <button type="button" onClick={() => scrollTo("home")}>{t.navHome}</button>
          <button type="button" onClick={() => scrollTo("contact")}>{t.navContact}</button>
          <button type="button" onClick={() => scrollTo("location")}>{t.navLocation}</button>
          <motion.button
            type="button"
            className="royal-settings-trigger"
            onClick={onSettings}
            whileTap={{ scale: 0.9 }}
            whileHover={{ rotate: 8 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            aria-label="Open settings"
            data-testid="button-settings"
          >
            <Settings2 aria-hidden="true" />
          </motion.button>
        </nav>

        <p className="royal-header-tag">{t.wholesaleLabel}</p>
      </div>
    </header>
  );
}