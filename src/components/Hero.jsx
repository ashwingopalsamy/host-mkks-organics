import { useRef } from 'react';
import { CalendarCheckIcon, ChevronDownIcon } from './icons.jsx';

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
      <div className="hero-media" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="/images/hero-primary-600.webp 600w, /images/hero-primary-900.webp 900w, /images/hero-primary-1400.webp 1400w"
            sizes="100vw"
          />
          <img
            src="/images/hero-primary-900.webp"
            alt="Mango orchard in the Anaimalai foothills, Pollachi"
            fetchPriority="high"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </picture>
      </div>

      <div className="container hero-content">
        <article className="hero-panel reveal reveal-up is-visible">
          <div className="hero-main">
            <p className="eyebrow">MKKS Organics - Pollachi</p>
            <h1>Organic Mangoes from the Orchards of the Anaimalai Foothills.</h1>
            <p className="hero-intro">
              A decade of uncompromising purity with zero synthetic fertilizers and zero chemical
              ripening. Hand-harvested from our 10-acre estate for rich aroma, deep sweetness, and a
              first-class experience.
            </p>

            <div className="hero-cta">
              <button className="btn btn-primary" onClick={(event) => onReserveClick?.(event.currentTarget)}>
                <span className="btn-icon" aria-hidden="true">
                  <CalendarCheckIcon />
                </span>
                Reserve Mangoes
              </button>
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
                <p className="hero-meta-value">10+ Years</p>
                <p className="hero-meta-text">Organic stewardship</p>
              </article>
              <article className="hero-meta">
                <p className="hero-meta-value">10 Acres</p>
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
