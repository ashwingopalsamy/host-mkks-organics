import SectionReveal from './SectionReveal.jsx';
import { varieties, MIN_ORDER_VALUE } from '../data/content.jsx';

export default function Varieties({ selections, onSelect, onQtyChange }) {
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

        {/* Minimum order notice */}
        <div className="min-order-notice">
          <svg className="min-order-icon" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm.75 11.25h-1.5v-1.5h1.5v1.5Zm0-3h-1.5v-5h1.5v5Z" fill="currentColor" />
          </svg>
          <span>
            Minimum order ₹{MIN_ORDER_VALUE} · Shipping calculated separately
          </span>
        </div>

        <div className="variety-grid">
          {varieties.map((v) => {
            const sel = selections[v.name];
            return (
              <article
                key={v.name}
                className={`variety-card${sel ? ' has-qty' : ''}`}
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

                  <div className="price-tier-row">
                    {v.pricing.map((tier) => {
                      const isActive = sel && sel.weight === tier.weight;
                      return (
                        <button
                          key={tier.weight}
                          className={`price-tier-btn${isActive ? ' is-active' : ''}`}
                          onClick={() => onSelect(v.name, tier.weight, tier.price)}
                          aria-pressed={isActive}
                          aria-label={`${tier.weight} ${v.name} for ₹${tier.price}`}
                        >
                          <span className="tier-weight">{tier.weight}</span>
                          <span className="tier-price">₹{tier.price.toLocaleString('en-IN')}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Quantity selector — visible when a tier is selected */}
                  {sel && (
                    <div className="qty-selector">
                      <button
                        className="qty-btn"
                        onClick={() => onQtyChange(v.name, -1)}
                        aria-label={`Decrease quantity of ${v.name}`}
                        disabled={sel.qty <= 1}
                      >
                        −
                      </button>
                      <span className="qty-value" aria-live="polite">{sel.qty || 1}</span>
                      <button
                        className="qty-btn"
                        onClick={() => onQtyChange(v.name, 1)}
                        aria-label={`Increase quantity of ${v.name}`}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
