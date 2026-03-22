import { useRef } from 'react';
import { CalendarCheckIcon, ChevronDownIcon, PhoneIcon, WhatsAppIcon } from './icons.jsx';
import { phoneNumber, whatsappReserveLink } from '../content.jsx';

export default function Hero({ onReserveClick }) {
  const sectionRef = useRef(null);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('varieties');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home" aria-label="Hero" ref={sectionRef}>
      {/* Absolutely positioned behind the panel — no layout impact */}
      <div className="hero-bg-fill" aria-hidden="true">
        <img
          src="/images/hero-primary-900.webp"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="hero-media" aria-hidden="true">
        <img
          src="/images/aside-primary.webp"
          alt="Mango orchard in the Anaimalai foothills, Pollachi"
          fetchPriority="high"
        />
      </div>


      <div className="container hero-content">
        <article className="hero-panel reveal reveal-up is-visible">
          <div className="hero-main">
            <p className="eyebrow">MKKS Organics ✦ Pollachi</p>
            <h1>Organic Mangoes from an Orchard in Anaimalai Foothills.</h1>
            <p className="hero-intro">
              A decade of zero synthetic fertilizers and zero chemical ripening.{' '}
              Our 10-acre single estate is hand-harvested and dispatched straight to your door.
            </p>

            <div className="hero-cta">
              <button className="btn btn-primary hero-cta-main" onClick={(event) => onReserveClick?.(event.currentTarget)}>
                <span className="btn-icon" aria-hidden="true">
                  <CalendarCheckIcon />
                </span>
                <span className="btn-label">Reserve Mangoes</span>
              </button>
              <a className="btn hero-cta-icon" href={`tel:${phoneNumber}`} aria-label="Call us">
                <span className="btn-icon" aria-hidden="true"><PhoneIcon /></span>
              </a>
              <a className="btn hero-cta-icon hero-cta-wa" href={whatsappReserveLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <span className="btn-icon btn-icon-whatsapp" aria-hidden="true"><WhatsAppIcon /></span>
              </a>
            </div>
          </div>

          <aside className="hero-aside" aria-label="Farm highlights">
            <p className="hero-aside-label">From Our Estate</p>
            <figure className="hero-aside-media">
              <img
                src="/images/aside-primary.webp"
                alt="MKKS Organics estate in the Anaimalai foothills"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="hero-aside-chip">Pollachi - Anaimalai Foothills</figcaption>
            </figure>
            <div className="hero-meta-grid" aria-label="Farm metrics">
              <article className="hero-meta">
                <p className="hero-meta-value">A Decade</p>
                <p className="hero-meta-text">Organic stewardship</p>
              </article>
              <article className="hero-meta">
                <p className="hero-meta-value">10-Acre</p>
                <p className="hero-meta-text">Single-estate harvest</p>
              </article>
            </div>
            <p className="hero-aside-note">
              Hand-picked batches, clean-grown end to end, dispatched straight from our orchard.
            </p>
          </aside>
        </article>

        <button
          className="hero-scroll-indicator"
          onClick={handleScrollDown}
          aria-label="Scroll to varieties"
          type="button"
        >
          <ChevronDownIcon />
        </button>
      </div>
    </section>
  );
}