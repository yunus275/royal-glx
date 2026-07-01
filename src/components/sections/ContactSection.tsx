import { motion } from "framer-motion";
import { useLang } from "@/contexts/language-context";

const WHATSAPP = `https://wa.me/9647811108936`;
const FACEBOOK = "https://www.facebook.com/people/ROYAL-%D8%B1%D9%88%D9%8A%D8%A7%D9%84/100065036051333/";
const INSTAGRAM = "https://www.instagram.com/royal.glx/";

const WA = ({ s = 26 }: { s?: number }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.859L.073 23.927a.5.5 0 00.609.609l6.068-1.459A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.034-1.388l-.36-.214-3.733.898.914-3.64-.235-.374A9.818 9.818 0 0112 2.182c5.424 0 9.818 4.394 9.818 9.818S17.424 21.818 12 21.818z"/>
  </svg>
);
const FB = ({ s = 26 }: { s?: number }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const IG = ({ s = 26 }: { s?: number }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const CONTACTS = [
  { id: "whatsapp",  label: "WhatsApp",  sublabelKey: "whatsappSub"  as const, href: WHATSAPP,  grad: "from-green-400 to-emerald-600", glow: "34,197,94",  Icon: WA },
  { id: "facebook",  label: "Facebook",  sublabelKey: "facebookSub"  as const, href: FACEBOOK,  grad: "from-blue-500 to-blue-700",   glow: "59,130,246", Icon: FB },
  { id: "instagram", label: "Instagram", sublabelKey: "instagramSub" as const, href: INSTAGRAM, grad: "from-pink-500 via-rose-500 to-orange-400", glow: "236,72,153", Icon: IG },
];

function BigCircle({ c, i }: { c: typeof CONTACTS[0]; i: number }) {
  const Icon = c.Icon;
  return (
    <motion.a
      href={c.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative shrink-0"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.87 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <motion.div
        className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ inset: -4, background: `conic-gradient(from 0deg, transparent 50%, rgba(${c.glow},1) 80%, transparent 100%)` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={`relative z-10 rounded-full bg-gradient-to-br ${c.grad} text-white flex items-center justify-center shadow-2xl`}
        style={{ width: 84, height: 84 }}
        whileHover={{ boxShadow: `0 0 0 10px rgba(${c.glow},.12), 0 0 48px rgba(${c.glow},.5)` }}
      >
        <Icon s={30} />
      </motion.div>
      <motion.div
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${c.grad}`}
        animate={{ scale: [1, 1.8], opacity: [0, 0.12, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 0.6, delay: i * 0.7 }}
      />
    </motion.a>
  );
}

function MobileRow({ c, i }: { c: typeof CONTACTS[0]; i: number }) {
  const { t } = useLang();
  const Icon = c.Icon;
  return (
    <motion.a
      href={c.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.09, duration: 0.4 }}
      whileTap={{ scale: 0.96 }}
      className="flex items-center gap-4 p-4 rounded-2xl border border-border/40 bg-card/60 active:bg-card hover:border-primary/30 transition-colors"
    >
      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${c.grad} text-white flex items-center justify-center shrink-0 shadow-lg`}>
        <Icon s={22} />
      </div>
      <div className="min-w-0">
        <p className="font-bold text-sm">{c.label}</p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{t[c.sublabelKey]}</p>
      </div>
      <div className="ms-auto text-muted-foreground/40">
        <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M9 18l6-6-6-6"/></svg>
      </div>
    </motion.a>
  );
}

export default function ContactSection() {
  const { t } = useLang();
  return (
    <section id="contact" className="py-12 sm:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">{t.contactTitle}</h2>
        </motion.div>

        {/* Mobile: vertical list */}
        <div className="sm:hidden max-w-sm mx-auto flex flex-col gap-3">
          {CONTACTS.map((c, i) => (
            <MobileRow key={c.id} c={c} i={i} />
          ))}
        </div>

        {/* Desktop: horizontal circles */}
        <div className="hidden sm:flex items-end justify-center gap-16">
          {CONTACTS.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="flex flex-col items-center gap-3"
            >
              <BigCircle c={c} i={i} />
              <div className="text-center">
                <p className="font-bold text-sm">{c.label}</p>
                <p className="text-xs text-muted-foreground">{t[c.sublabelKey]}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
