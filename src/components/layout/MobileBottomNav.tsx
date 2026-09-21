import { useState } from "react";
import { motion } from "framer-motion";
import { Home, MapPin, MessageCircle, Settings2 } from "lucide-react";
import { useLang } from "@/contexts/language-context";

type Props = {
  onSettings: () => void;
};

const tabs = [
  { id: "home", icon: Home, labelKey: "navHome" as const, scrollTo: "home" },
  { id: "contact", icon: MessageCircle, labelKey: "navContact" as const, scrollTo: "contact" },
  { id: "location", icon: MapPin, labelKey: "navLocation" as const, scrollTo: "location" },
];

const PRESS_TRANSITION = { type: "spring", stiffness: 420, damping: 34 } as const;

export default function MobileBottomNav({ onSettings }: Props) {
  const { t } = useLang();
  const [active, setActive] = useState("home");

  const go = (id: string, scrollTo: string) => {
    setActive(id);
    document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="royal-mobile-nav" aria-label="Mobile navigation">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.id;
        return (
          <motion.button
            key={tab.id}
            type="button"
            className={`royal-mobile-nav-item ${isActive ? "is-active" : ""}`}
            onClick={() => go(tab.id, tab.scrollTo)}
            whileTap={{ scale: 0.88 }}
            transition={PRESS_TRANSITION}
          >
            {isActive && (
              <motion.span
                className="royal-mobile-nav-indicator"
                layoutId="mobile-nav-indicator"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <Icon aria-hidden="true" />
            <span>{t[tab.labelKey]}</span>
          </motion.button>
        );
      })}
      <motion.button
        type="button"
        className="royal-mobile-nav-item"
        onClick={onSettings}
        whileTap={{ scale: 0.88 }}
        transition={PRESS_TRANSITION}
      >
        <Settings2 aria-hidden="true" />
        <span>Settings</span>
      </motion.button>
    </nav>
  );
}