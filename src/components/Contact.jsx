import SectionReveal from './SectionReveal.jsx';
import { WhatsAppIcon, PhoneIcon, InstagramIcon, MapPinIcon } from './icons.jsx';
import {
  phoneNumber,
  phoneDisplay,
  whatsappReserveLink,
  instagramLink,
  instagramHandle,
  mapsLink,
} from '../content.jsx';
import { siteConfig } from '../siteConfig.js';

export default function Contact() {
  return (
    <section className="section section-contact" id="contact">
      <div className="container">
        <SectionReveal as="article" className="contact-card spotlight-card" delay={0.1}>
          <p className="eyebrow">Taste This Season</p>
          <h2>Reserve Before the Best Lots Are Gone</h2>
          <p>
            Our seasonal harvest is limited and lots sell out early each year.
            Reserve now to lock in your preferred varieties and quantities before
            the best picks are spoken for.
          </p>

          <div className="contact-actions">
            <a
              className="btn btn-whatsapp"
              href={whatsappReserveLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="btn-icon btn-icon-whatsapp" aria-hidden="true">
                <WhatsAppIcon />
              </span>
              WhatsApp
            </a>
            <a className="btn btn-primary" href={`tel:${phoneNumber}`}>
              <span className="btn-icon" aria-hidden="true">
                <PhoneIcon />
              </span>
              Call {phoneDisplay}
            </a>
            <a
              className="btn btn-secondary contact-instagram"
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow MKKS Organics on Instagram (${instagramHandle})`}
            >
              <span className="btn-icon" aria-hidden="true">
                <InstagramIcon />
              </span>
              Instagram
            </a>
            <a
              className="btn btn-secondary"
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="btn-icon" aria-hidden="true">
                <MapPinIcon />
              </span>
              Google Maps
            </a>
          </div>

          <address>
            {siteConfig.orchardName} - Anaimalai Foothills - Pollachi Taluk - Coimbatore District - Tamil Nadu
          </address>
        </SectionReveal>
      </div>
    </section>
  );
}
