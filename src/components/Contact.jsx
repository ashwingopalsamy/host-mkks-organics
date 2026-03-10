import SectionReveal from './SectionReveal.jsx';
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
            Our clean-grown seasonal harvest is limited. Reserve now if you want the sweetest lots
            with rich aroma, buttery texture, and a finish that keeps everyone reaching for one
            more slice.
          </p>

          <div className="contact-actions">
            <a className="btn btn-primary" href={`tel:${phoneNumber}`}>
              <span className="btn-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.97.35 1.92.7 2.82a2 2 0 0 1-.45 2.1L8.1 9.91a16 16 0 0 0 6 6l1.26-1.27a2 2 0 0 1 2.11-.44c.9.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </span>
              Call {phoneDisplay}
            </a>
            <a
              className="btn btn-secondary"
              href={whatsappReserveLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="btn-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2.1 7L3 29l6.5-2c2 1.1 4.2 1.7 6.5 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3Zm0 23.5c-2 0-3.9-.6-5.5-1.6l-.4-.2-3.9 1.2 1.3-3.8-.3-.4c-1.2-1.8-1.8-3.8-1.8-5.9C5.4 10 10.1 5.4 16 5.4s10.6 4.6 10.6 10.4S21.9 26.5 16 26.5Zm5.8-7.8c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1c-2-.9-3.3-2.9-3.4-3.1-.2-.3 0-.5.1-.7s.3-.3.4-.5.2-.3.3-.5 0-.4 0-.5-.7-1.8-1-2.4c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.5 1 2.9 1.2 3.1c.1.2 2.1 3.4 5.1 4.6.7.3 1.3.5 1.7.6.7.2 1.4.1 1.9.1.6-.1 1.8-.8 2.1-1.5.3-.8.3-1.4.2-1.5s-.2-.2-.5-.3Z" />
                </svg>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="3.8" />
                  <circle cx="17.2" cy="6.8" r="0.95" fill="currentColor" stroke="none" />
                </svg>
              </span>
              Instagram
            </a>
            <a
              className="btn btn-secondary"
              href={`mailto:${emailAddress}`}
            >
              <span className="btn-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <polyline points="22,4 12,13 2,4" />
                </svg>
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
