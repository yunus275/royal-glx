import { motion } from "framer-motion";
import { Clock3, Facebook, Instagram, MapPin, MessageCircle } from "lucide-react";
import { useLang } from "@/contexts/language-context";

const WHATSAPP = "https://wa.me/9647811108936";
const FACEBOOK = "https://www.facebook.com/people/ROYAL-%D8%B1%D9%88%D9%8A%D8%A7%D9%84/100065036051333/";
const INSTAGRAM = "https://www.instagram.com/royal.glx/";
const PHONES = ["07811108936", "07902621447", "07705941268", "07505149156"];

const contacts = [
  { label: "WhatsApp", href: WHATSAPP, icon: MessageCircle, text: "0781 110 8936", tone: "whatsapp" },
  { label: "Instagram", href: INSTAGRAM, icon: Instagram, text: "@royal.glx", tone: "instagram" },
  { label: "Facebook", href: FACEBOOK, icon: Facebook, text: "ROYAL / رويال", tone: "facebook" },
];

export default function ContactSection() {
  const { t } = useLang();

  return (
    <section id="contact" className="royal-section royal-contact-section">
      <div className="royal-container">
        <motion.div
          className="royal-section-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="royal-eyebrow"><span className="royal-eyebrow-line" />{t.contactEyebrow}</p>
            <h2>{t.contactTitle}</h2>
          </div>
          <p>{t.contactDescription}</p>
        </motion.div>

        <div className="royal-contact-grid">
          {contacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <motion.a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`royal-contact-card ${contact.tone}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="royal-contact-icon"><Icon aria-hidden="true" /></span>
                <span className="royal-contact-card-label">{contact.label}</span>
                <strong>{contact.text} ↗</strong>
                <small>{contact.label === "WhatsApp" ? t.whatsappSub : contact.label === "Instagram" ? t.instagramSub : t.facebookSub}</small>
              </motion.a>
            );
          })}
        </div>

        <div className="royal-details-grid">
          <motion.div
            className="royal-detail-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <span className="royal-detail-label"><Clock3 />{t.hoursLabel}</span>
            <strong>{t.workingHoursVal}</strong>
            <p>{t.friday}</p>
          </motion.div>
          <motion.div
            className="royal-detail-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <span className="royal-detail-label"><MapPin />{t.findUs}</span>
            <div className="royal-phone-list">
              {PHONES.slice(0, 2).map((phone) => <a key={phone} href={`tel:${phone}`}>{phone}</a>)}
            </div>
            <p>{t.sinak}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}