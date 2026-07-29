import { useLang } from "@/contexts/language-context";

export default function Footer() {
  const { t } = useLang();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t border-border/50 py-10 sm:py-14">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-8">
          <div className="space-y-3 max-w-xs">
            <div className="flex items-center gap-2.5 text-xl font-bold tracking-tight">
              <img src="/logo.png" alt="Royal Crown" className="h-9 w-9 object-contain drop-shadow" />
              <span>ROYAL | رويال</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.footerTagline}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-foreground mb-1">{t.navContact}</p>
            <button onClick={() => scrollTo("contact")} className="text-sm text-muted-foreground hover:text-primary transition-colors text-start">
              WhatsApp
            </button>
            <button onClick={() => scrollTo("contact")} className="text-sm text-muted-foreground hover:text-primary transition-colors text-start">
              Facebook
            </button>
            <button onClick={() => scrollTo("contact")} className="text-sm text-muted-foreground hover:text-primary transition-colors text-start">
              Instagram
            </button>
            <button onClick={() => scrollTo("location")} className="text-sm text-muted-foreground hover:text-primary transition-colors text-start">
              {t.locationTitle}
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {t.copyright}</p>
          <div className="flex gap-5">
            <span className="hover:text-primary transition-colors cursor-pointer">{t.privacyPolicy}</span>
            <span className="hover:text-primary transition-colors cursor-pointer">{t.terms}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
