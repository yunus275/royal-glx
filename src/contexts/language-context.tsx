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
  established: string;
  premiumTitle: string;
  premiumDescription: string;
  quality: string;
  direct: string;
  scrollContact: string;
  precision: string;
  contactEyebrow: string;
  contactDescription: string;
  locationEyebrow: string;
  locationDescription: string;
  mapTitle: string;
  directions: string;
  sinak: string;
  mapBusiness: string;
  hoursLabel: string;
  friday: string;
  findUs: string;
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
    workingHoursVal: "Daily: 5:45 AM – 3:00 PM",
    phoneNumbers: "Phone Numbers",
    openMaps: "Open in Google Maps",
    whatsappSub: "Chat with us directly",
    facebookSub: "Follow our page",
    instagramSub: "@royal.glx",
    productsTitle: "Some of Our Products",
    productsBadge: "Original Products – Royal Shop (Wholesale)",
    wholesaleLabel: "Wholesale Only",
    established: "Est. 2003 / Baghdad, Iraq",
    premiumTitle: "Wholesale for premium car accessories",
    premiumDescription: "Established in 2003 in the heart of Sinak, Baghdad, Royal GLX has grown into a trusted name in high-end automotive accessories. For over two decades, we have supplied durable, premium upgrades to merchants and retailers across Iraq.",
    quality: "Quality first",
    direct: "Direct market expertise",
    scrollContact: "Scroll down for contact",
    precision: "Precision in motion",
    contactEyebrow: "Contact / Visit",
    contactDescription: "Reach ROYAL GLX directly, visit us in Baghdad, or find the location on the map.",
    locationEyebrow: "Location / Visit us",
    locationDescription: "Open our Baghdad location below and get directions directly from Google Maps.",
    mapTitle: "ROYAL GLX / Baghdad",
    directions: "Get directions ↗",
    sinak: "Sinak, Baghdad, Iraq",
    mapBusiness: "Wholesale automotive accessories",
    hoursLabel: "Opening hours",
    friday: "Every day except Friday — holiday.",
    findUs: "Find us",
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
    workingHoursVal: "يومياً: ٥:٤٥ ص – ٣:٠٠ م",
    phoneNumbers: "أرقام الهاتف",
    openMaps: "فتح في خرائط جوجل",
    whatsappSub: "راسلنا مباشرة",
    facebookSub: "تابع صفحتنا",
    instagramSub: "@royal.glx",
    productsTitle: "بعض منتجاتنا",
    productsBadge: "منتجات أصلية – رويال (بالجملة)",
    wholesaleLabel: "بالجملة فقط",
    established: "منذ ٢٠٠٣ / بغداد، العراق",
    premiumTitle: "إكسسوارات سيارات فاخرة بالجملة",
    premiumDescription: "تأسست رويال GLX عام ٢٠٠٣ في قلب سوق السنك في بغداد، ونمت لتصبح اسماً موثوقاً في إكسسوارات السيارات الراقية. لأكثر من عقدين، نورد ترقيات متينة وعالية الجودة للتجار وأصحاب المحلات في جميع أنحاء العراق.",
    quality: "الجودة أولاً",
    direct: "خبرة مباشرة في السوق",
    scrollContact: "مرر للأسفل للتواصل",
    precision: "دقة وحركة",
    contactEyebrow: "تواصل / زيارة",
    contactDescription: "تواصل مع رويال GLX مباشرة، أو زرنا في بغداد، أو افتح موقعنا على الخريطة.",
    locationEyebrow: "الموقع / زيارتنا",
    locationDescription: "استخدم الخريطة لفتح موقعنا في بغداد والحصول على الاتجاهات من خرائط Google.",
    mapTitle: "رويال GLX / بغداد",
    directions: "الحصول على الاتجاهات ↗",
    sinak: "السنك، بغداد، العراق",
    mapBusiness: "إكسسوارات سيارات بالجملة",
    hoursLabel: "ساعات العمل",
    friday: "كل الأيام ما عدا الجمعة — عطلة.",
    findUs: "موقعنا",
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
    workingHoursVal: "每天：上午5:45至下午3:00",
    phoneNumbers: "电话号码",
    openMaps: "在谷歌地图中打开",
    whatsappSub: "直接与我们聊天",
    facebookSub: "关注我们的主页",
    instagramSub: "@royal.glx",
    productsTitle: "我们的部分产品",
    productsBadge: "正品产品 – 皇家商店（批发）",
    wholesaleLabel: "仅限批发",
    established: "成立于 2003 年 / 伊拉克巴格达",
    premiumTitle: "高端汽车配件批发",
    premiumDescription: "皇家 GLX 于 2003 年成立于巴格达辛克市场中心，现已成为高端汽车配件领域值得信赖的品牌。二十多年来，我们为伊拉克各地的商户和零售商提供耐用、高品质的汽车升级产品。",
    quality: "品质优先",
    direct: "直接市场经验",
    scrollContact: "向下滚动查看联系方式",
    precision: "精准驱动",
    contactEyebrow: "联系 / 到访",
    contactDescription: "直接联系皇家 GLX，来巴格达门店，或在地图上查找位置。",
    locationEyebrow: "位置 / 到访我们",
    locationDescription: "使用下方地图打开我们在巴格达的位置，并直接从 Google 地图获取路线。",
    mapTitle: "皇家 GLX / 巴格达",
    directions: "获取路线 ↗",
    sinak: "辛克，巴格达，伊拉克",
    mapBusiness: "汽车配件批发",
    hoursLabel: "营业时间",
    friday: "除星期五外每天营业 — 星期五休息。",
    findUs: "找到我们",
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
