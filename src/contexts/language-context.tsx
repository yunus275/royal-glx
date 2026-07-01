import { createContext, useContext, useState, useEffect } from "react";

export type Lang = "en" | "ar" | "zh";

type Translations = {
  heroTitle: string;
  heroTag: string;
  heroArabicSub: string;
  heroScrollDown: string;
  baghdadIraq: string;
  contactBtn: string;
  navHome: string;
  navContact: string;
  navAbout: string;
  searchPlaceholder: string;
  footerTagline: string;
  copyright: string;
  privacyPolicy: string;
  terms: string;
  contactTitle: string;
  contactSub: string;
  navLocation: string;
  locationTitle: string;
  locationSub: string;
  address: string;
  workingHours: string;
  workingHoursVal: string;
  phoneNumbers: string;
  openMaps: string;
  whatsappSub: string;
  facebookSub: string;
  instagramSub: string;
  productsTitle: string;
  productsBadge: string;
  wholesaleLabel: string;
};

const translations: Record<Lang, Translations> = {
  en: {
    heroTag: "Car Accessories",
    heroTitle: "Royal",
    heroArabicSub: "Wholesale Distributor · Baghdad",
    heroScrollDown: "Scroll Down",
    baghdadIraq: "Baghdad · Iraq",
    contactBtn: "Contact Us",
    navHome: "Home",
    navContact: "Contact",
    navAbout: "About",
    searchPlaceholder: "Search accessories...",
    footerTagline: "Your trusted wholesale source for premium car accessories in Baghdad, Iraq.",
    copyright: "Royal Car Accessories. All rights reserved.",
    privacyPolicy: "Privacy Policy",
    terms: "Terms",
    contactTitle: "Get In Touch",
    contactSub: "Wholesale inquiries welcome",
    navLocation: "Location",
    locationTitle: "Find Our Store",
    locationSub: "Al-Sink area, Baghdad",
    address: "Address",
    workingHours: "Working Hours",
    workingHoursVal: "Daily: 7 AM – 3 PM",
    phoneNumbers: "Phone Numbers",
    openMaps: "Open in Google Maps",
    whatsappSub: "Chat with us directly",
    facebookSub: "Follow our page",
    instagramSub: "@royal.glx",
    productsTitle: "Our Products",
    productsBadge: "Original Products – Royal Shop (Wholesale)",
    wholesaleLabel: "Wholesale Only",
  },
  ar: {
    heroTag: "إكسسوارات السيارات",
    heroTitle: "رويال",
    heroArabicSub: "موزع بالجملة · بغداد",
    heroScrollDown: "اسحب للأسفل",
    baghdadIraq: "بغداد · العراق",
    contactBtn: "تواصل معنا",
    navHome: "الرئيسية",
    navContact: "تواصل",
    navAbout: "عن رويال",
    searchPlaceholder: "ابحث عن إكسسوارات...",
    footerTagline: "مصدرك الموثوق لإكسسوارات السيارات بالجملة في بغداد، العراق.",
    copyright: "رويال لإكسسوارات السيارات. جميع الحقوق محفوظة.",
    privacyPolicy: "سياسة الخصوصية",
    terms: "الشروط والأحكام",
    contactTitle: "تواصل معنا",
    contactSub: "نرحب بجميع استفسارات الجملة",
    navLocation: "الموقع",
    locationTitle: "موقع المتجر",
    locationSub: "منطقة السنك، بغداد",
    address: "العنوان",
    workingHours: "ساعات العمل",
    workingHoursVal: "يومياً: ٧ص – ٣م",
    phoneNumbers: "أرقام الهاتف",
    openMaps: "فتح في خرائط جوجل",
    whatsappSub: "راسلنا مباشرة",
    facebookSub: "تابع صفحتنا",
    instagramSub: "@royal.glx",
    productsTitle: "منتجاتنا",
    productsBadge: "منتجات أصلية – رويال (بالجملة)",
    wholesaleLabel: "بالجملة فقط",
  },
  zh: {
    heroTag: "汽车配件",
    heroTitle: "皇家",
    heroArabicSub: "批发经销商 · 巴格达",
    heroScrollDown: "向下滚动",
    baghdadIraq: "巴格达 · 伊拉克",
    contactBtn: "联系我们",
    navHome: "首页",
    navContact: "联系",
    navAbout: "关于我们",
    searchPlaceholder: "搜索配件...",
    footerTagline: "伊拉克巴格达值得信赖的汽车配件批发来源。",
    copyright: "皇家汽车配件。保留所有权利。",
    privacyPolicy: "隐私政策",
    terms: "条款",
    contactTitle: "联系我们",
    contactSub: "欢迎批发询问",
    navLocation: "位置",
    locationTitle: "找到我们的店",
    locationSub: "巴格达辛克区",
    address: "地址",
    workingHours: "营业时间",
    workingHoursVal: "每天：上午7时至下午3时",
    phoneNumbers: "电话号码",
    openMaps: "在谷歌地图中打开",
    whatsappSub: "直接与我们聊天",
    facebookSub: "关注我们的主页",
    instagramSub: "@royal.glx",
    productsTitle: "我们的产品",
    productsBadge: "正品产品 – 皇家商店（批发）",
    wholesaleLabel: "仅限批发",
  },
};

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
};

const LangContext = createContext<LangContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("royal-lang") as Lang) || "en");

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const handleSetLang = (l: Lang) => {
    localStorage.setItem("royal-lang", l);
    setLang(l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
