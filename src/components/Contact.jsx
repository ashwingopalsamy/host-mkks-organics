import SectionReveal from './SectionReveal.jsx';
import {
  phoneNumber,
  phoneDisplay,
  whatsappReserveLink,
  mapsLink,
  mapEmbed,
  instagramLink,
  instagramHandle,
} from '../data/content.jsx';

export default function Contact() {
  return (
    <section className="section section-contact" id="contact">
      <div className="container">
        <SectionReveal as="article" className="contact-card spotlight-card" delay={0.1}>
          <p className="eyebrow">Reserve</p>
          <h2>Reserve Your Season</h2>
          <p>
            Share your requirement and delivery city. We will confirm availability, pricing, and
            dispatch schedule for the current harvest window.
          </p>

          <div className="contact-actions">
            <a className="btn btn-primary" href={`tel:${phoneNumber}`}>
              Call {phoneDisplay}
            </a>
            <a
              className="btn btn-secondary"
              href={whatsappReserveLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Enquiry
            </a>
            <a
              className="btn btn-secondary"
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit on Maps
            </a>
          </div>

          <address>
            MKKS Organics · Marappagoundenpudhur · Pollachi Taluk · Coimbatore District · Tamil Nadu
          </address>

          <a
            className="contact-instagram"
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow MKKS Organics on Instagram (${instagramHandle})`}
          >
            <span className="contact-instagram-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="3.8" />
                <circle cx="17.2" cy="6.8" r="0.95" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <span>Instagram · {instagramHandle}</span>
          </a>

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
