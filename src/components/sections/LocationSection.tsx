import { motion } from "framer-motion";
import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";
import { useLang } from "@/contexts/language-context";

const ADDRESS_AR = "السنك، خلف الاتصالات، فرع ميثم أبو الكص، بغداد، العراق";
const PHONES = ["07811108936", "07902621447", "07705941268", "07505149156"];
const LAT = 33.33224105834961;
const LNG = 44.40290832519531;
const MAPS_EMBED = `https://maps.google.com/maps?q=${LAT},${LNG}&z=17&hl=en&output=embed`;
const MAPS_LINK  = `https://maps.google.com/maps?q=${LAT},${LNG}&z=17&hl=en`;

export default function LocationSection() {
  const { t } = useLang();

  return (
    <section id="location" className="py-10 sm:py-16 bg-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-7"
        >
          <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-primary/70 mb-1.5">Baghdad · Iraq</p>
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight">{t.locationTitle}</h2>
        </motion.div>

        <div className="max-w-xl mx-auto space-y-3">
          {/* Address + Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="flex items-start gap-3 p-4 rounded-2xl border border-border/40 bg-card/60"
            >
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-medium mb-1">{t.address}</p>
                <p className="text-sm font-semibold leading-relaxed">{ADDRESS_AR}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-3 p-4 rounded-2xl border border-border/40 bg-card/60"
            >
              <div className="h-9 w-9 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-medium mb-1">{t.workingHours}</p>
                <p className="text-sm font-semibold">{t.workingHoursVal}</p>
              </div>
            </motion.div>
          </div>

          {/* Phone numbers */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="p-4 rounded-2xl border border-border/40 bg-card/60"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="h-9 w-9 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                <Phone className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-[11px] text-muted-foreground font-medium">{t.phoneNumbers}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {PHONES.map((phone) => (
                <a key={phone} href={`tel:${phone}`}
                  className="text-sm font-mono font-semibold text-primary hover:text-primary/70 transition-colors flex items-center gap-1.5">
                  <Phone className="h-3 w-3 shrink-0" /> {phone}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden border border-border/40 shadow-xl"
          >
            <iframe
              src={MAPS_EMBED}
              width="100%"
              height="260"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ROYAL GLX Store Location"
            />
          </motion.div>

          {/* Open Maps button */}
          <motion.a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground text-sm font-semibold border border-primary/25 hover:border-primary transition-all duration-200"
          >
            <ExternalLink className="h-4 w-4" />
            {t.openMaps}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
