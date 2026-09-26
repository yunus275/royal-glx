import { useLang } from "@/contexts/language-context";

export default function Footer() {
  const { t } = useLang();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="royal-footer">
      <div className="royal-container">
        <div className="royal-footer-top">
          <div>
            <img src="/brand-logo.png" alt="ROYAL GLX" />
            <p>{t.footerTagline}</p>
          </div>
          <div className="royal-footer-links">
            <button type="button" onClick={() => scrollTo("contact")}>{t.navContact}</button>
            <button type="button" onClick={() => scrollTo("location")}>{t.navLocation}</button>
            <button type="button" onClick={() => scrollTo("products")}>{t.productsTitle}</button>
          </div>
        </div>
        <div className="royal-footer-bottom">
          <span>© {new Date().getFullYear()} {t.copyright}</span>
          <span>{t.established}</span>
        </div>
      </div>
    </footer>
  );
}