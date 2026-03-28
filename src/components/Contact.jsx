import { WhatsAppIcon, PhoneIcon, InstagramIcon, MapPinIcon } from './icons.jsx';
import {
  phoneNumber,
  phoneDisplay,
  whatsappReserveLink,
  instagramLink,
  instagramHandle,
  mapsLink,
} from '../content.jsx';

import { usePostHog } from '@posthog/react';

export default function Contact() {
  const posthog = usePostHog();
  
  return (
    <section className="section section-contact" id="contact">
      <div className="container">
        <div className="contact-card">

          {/* ── ZONE 1: RESERVE ─────────────────────── */}
          <div className="contact-zone-reserve">

            {/* Eyebrow left — LIVE + Selling Fast right */}
            <div className="contact-header-row">
              <p className="eyebrow">Taste This Season</p>
              <div className="contact-header-badges">
                <div className="contact-live-badge">
                  <div className="contact-live-dot" />
                  <span>Live</span>
                </div>
                <div className="contact-urgency">
                  <span className="contact-urgency-label">Selling Fast</span>
                </div>
              </div>
            </div>

            <h2>Reserve Before the Best Lots Are Gone</h2>

            <p className="contact-copy">
              Our seasonal harvest is limited and lots sell out early each year.
              Reserve now to lock in your preferred varieties.
            </p>

            {/* Social proof — dedicated block, animated entry + live pulse */}
            <div className="contact-proof-block">
              <div className="contact-proof-pulse" />
              <span>Families who reserved last year are already placing orders.</span>
            </div>

            {/* WhatsApp — hero CTA */}
            <a
              className="contact-wa-btn"
              href={whatsappReserveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => posthog?.capture('contact_click', { method: 'whatsapp_reserve' })}
            >
              <div className="contact-wa-left">
                <WhatsAppIcon className="contact-wa-icon" />
                <div>
                  <span className="contact-wa-label">Reserve on WhatsApp</span>
                  <span className="contact-wa-sub">Fastest response · {phoneDisplay}</span>
                </div>
              </div>
              <span className="contact-wa-arrow">→</span>
            </a>

          </div>

          {/* ── ZONE DIVIDER ────────────────────────── */}
          <div className="contact-zone-divider" />

          {/* ── ZONE 2: FIND US ─────────────────────── */}
          <div className="contact-zone-find">
            <p className="contact-find-label">Find Us</p>

            <a 
              className="contact-find-row" 
              href={`tel:${phoneNumber}`}
              onClick={() => posthog?.capture('contact_click', { method: 'phone_call' })}
            >
              <div className="contact-find-icon call">
                <PhoneIcon />
              </div>
              <div className="contact-find-row-text">
                Call us
                <span className="contact-find-row-sub">{phoneDisplay}</span>
              </div>
              <span className="contact-find-row-arrow">›</span>
            </a>

            <a
              className="contact-find-row"
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => posthog?.capture('contact_click', { method: 'google_maps' })}
            >
              <div className="contact-find-icon maps">
                <MapPinIcon />
              </div>
              <div className="contact-find-row-text">
                Open in Google Maps
                <span className="contact-find-row-sub">Pollachi, Tamil Nadu</span>
              </div>
              <span className="contact-find-row-arrow">›</span>
            </a>

            <a
              className="contact-find-row"
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow on Instagram (${instagramHandle})`}
              onClick={() => posthog?.capture('social_click', { platform: 'instagram' })}
            >
              <div className="contact-find-icon insta">
                <InstagramIcon />
              </div>
              <div className="contact-find-row-text">
                Instagram
                <span className="contact-find-row-sub">{instagramHandle}</span>
              </div>
              <span className="contact-find-row-arrow">›</span>
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}