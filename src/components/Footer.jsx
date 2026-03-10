import SectionReveal from './SectionReveal.jsx';
import { phoneNumber, phoneDisplay, mapsLink, emailAddress } from '../data/content.jsx';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <SectionReveal className="footer-card" delay={0.1}>
          <div className="footer-brand-block">
            <a className="brand footer-brand-link" href="#top" aria-label="MKKS Organics Home">
              <img
                className="brand-logo"
                src="/assets/images/mkks-organics-logo.png"
                width="32"
                height="32"
                alt="MKKS Organics logo"
              />
              <span className="brand-copy">MKKS Organics</span>
            </a>
            <p>
              Clean-grown organic mangoes from the Anaimalai foothills, ripened naturally for deep
              sweetness, bright aroma, and a truly satisfying bite.
            </p>
            <span className="footer-chip">Season 2026 · Mar – Jun</span>
          </div>

          <div className="footer-links">
            <p className="footer-title">Explore</p>
            <a href="#story">Our Origin</a>
            <a href="#varieties">Mango Collection</a>
            <a href="#philosophy">Growing Method</a>
            <a href="#contact">Reserve</a>
          </div>

          <div className="footer-links">
            <p className="footer-title">Connect</p>
            <a href={`tel:${phoneNumber}`}>{phoneDisplay}</a>
            <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
            <a
              href="https://wa.me/919976759956"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a href={mapsLink} target="_blank" rel="noopener noreferrer">
              Google Maps
            </a>
          </div>
        </SectionReveal>

        <p className="footer-note">
          © {year} MKKS Organics · Anaimalai Foothills, Pollachi · Tamil Nadu, India
        </p>
      </div>
    </footer>
  );
}
