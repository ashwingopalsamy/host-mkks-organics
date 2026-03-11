import SectionReveal from './SectionReveal.jsx';
import { WhatsAppIcon, PhoneIcon, InstagramIcon, EmailIcon } from './icons.jsx';
import {
  phoneNumber,
  phoneDisplay,
  whatsappReserveLink,
  mapEmbed,
  instagramLink,
  instagramHandle,
  emailAddress,
} from '../data/content.jsx';

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
            <a className="btn btn-primary" href={`tel:${phoneNumber}`}>
              <span className="btn-icon" aria-hidden="true">
                <PhoneIcon />
              </span>
              Call {phoneDisplay}
            </a>
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
              href={`mailto:${emailAddress}`}
            >
              <span className="btn-icon" aria-hidden="true">
                <EmailIcon />
              </span>
              Email
            </a>
          </div>

          <address>
            MKKS Organics · Anaimalai Foothills · Pollachi Taluk · Coimbatore District · Tamil Nadu
          </address>

          <div className="map-wrap" aria-label="Map location for Pollachi">
            <iframe
              title="MKKS Organics Pollachi location"
              src={mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
