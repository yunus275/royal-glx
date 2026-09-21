import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";
import { useLang } from "@/contexts/language-context";

const LAT = 33.3319597;
const LNG = 44.4029265;
const MAPS_LINK = "https://maps.app.goo.gl/Xp78rc5Rs8oEoEWZ9";
const MAPS_EMBED = `https://maps.google.com/maps?q=${LAT},${LNG}&z=17&hl=en&output=embed`;

export default function LocationSection() {
  const { t } = useLang();
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="location" className="royal-section royal-location-section">
      <div className="royal-container">
        <motion.div
          className="royal-section-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="royal-eyebrow"><span className="royal-eyebrow-line" />{t.locationEyebrow}</p>
            <h2>{t.locationTitle}</h2>
          </div>
          <p>{t.locationDescription}</p>
        </motion.div>

        <motion.div
          className="royal-map-app"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="royal-map-bar">
            <span><i />{t.mapTitle}</span>
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer">{t.openMaps} ↗</a>
          </div>
          <div className={`royal-map-visual ${loaded ? "is-loaded" : ""}`}>
            {!loaded && <div className="royal-map-loading"><span /><span /><span /></div>}
            <iframe
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              title="ROYAL GLX location on Google Maps"
              onLoad={() => setLoaded(true)}
            />
            <div className="royal-map-badge"><MapPin /><b>ROYAL GLX</b></div>
          </div>
          <div className="royal-map-meta">
            <div>
              <strong>{t.sinak}</strong>
              <span>{t.mapBusiness}</span>
            </div>
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
              {t.directions} <ExternalLink />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}