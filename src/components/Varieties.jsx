import SectionReveal from './SectionReveal.jsx';
import { varieties } from '../data/content.jsx';

export default function Varieties({ quantities, onQuantityChange }) {
  return (
    <section className="section section-varieties" id="varieties">
      <div className="container">
        <SectionReveal as="header" className="section-head">
          <h2>Pick Your Favourite Bite</h2>
          <p className="eyebrow">The Collection</p>
          <p className="section-intro">
            Every variety has a distinct flavour profile. We harvest only at natural maturity so
            sweetness, aroma, and texture land exactly right.
          </p>
        </SectionReveal>

        <div className="variety-grid">
          {varieties.map((v) => {
            const qty = quantities[v.name] || 0;
            return (
              <article
                key={v.name}
                className={`variety-card${qty > 0 ? ' has-qty' : ''}`}
              >
                <div className="variety-img-wrap">
                  <img
                    src={v.image}
                    width="900"
                    height="675"
                    alt={v.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="variety-content">
                  <h3>{v.name}</h3>
                  <p>{v.description}</p>

                  <div className="variety-qty">
                    <button
                      className="qty-btn qty-btn-minus"
                      aria-label={`Decrease ${v.name} quantity`}
                      onClick={() => onQuantityChange(v.name, Math.max(0, qty - 1))}
                      disabled={qty === 0}
                    >
                      <svg viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </button>
                    <span className="qty-value" aria-live="polite">
                      {qty} <span className="qty-unit">kg</span>
                    </span>
                    <button
                      className="qty-btn qty-btn-plus"
                      aria-label={`Increase ${v.name} quantity`}
                      onClick={() => onQuantityChange(v.name, qty + 1)}
                    >
                      <svg viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
