import { useState } from 'react';
import { varieties, varietyBadges, sampleBox, MIN_ORDER_VALUE } from '../content.jsx';
import { formatCurrency, applySampleBox, isSampleBoxInCart } from '../order.js';
import { ChevronDownIcon, PackageIcon } from './icons.jsx';
import SectionReveal from './SectionReveal.jsx';

const triggerHaptic = () => {
  if (typeof window !== 'undefined' && window.navigator?.vibrate) {
    try { window.navigator.vibrate([15]); } catch { /* ignore */ }
  }
};

function VarietyItem({ variety, badge, isExpanded, onToggle, cart, onUpdateQuantity }) {
  const kg = cart[variety.id] ?? 0;
  return (
    <div className={`accordion-item${isExpanded ? ' is-expanded' : ''}`}>
      <button
        className="accordion-trigger"
        onClick={onToggle}
        aria-expanded={isExpanded}
        type="button"
      >
        <div className="accordion-trigger-left">
          <img
            className="accordion-thumb"
            src={variety.image}
            alt={variety.alt}
            width="48"
            height="48"
            loading="lazy"
            decoding="async"
          />
          <span className="accordion-name">{variety.name}</span>
          {badge && <span className="accordion-badge">{badge}</span>}
        </div>
        <div className="accordion-trigger-right">
          {!isExpanded && <span className="accordion-add-hint">Add</span>}
          <ChevronDownIcon className="accordion-chevron" />
        </div>
      </button>

      <div className="accordion-panel" aria-hidden={!isExpanded}>
        <div className="accordion-panel-inner">
          <div className="accordion-media">
            <img
              src={variety.image}
              srcSet={variety.imageSrcSet}
              sizes="(max-width: 767px) 100vw, 50vw"
              alt={variety.alt}
              width="720"
              height="540"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="accordion-desc">{variety.description}</p>
          <div className="accordion-tiers">
            <div className="accordion-tier-row">
              <div className="accordion-tier-info">
                <span className="accordion-tier-price">{formatCurrency(variety.pricePerKg)}/kg</span>
              </div>
              <div className="accordion-qty" aria-label={`${variety.name} quantity in kg`}>
                <button
                  className="qty-btn"
                  onClick={() => onUpdateQuantity(variety.id, -1)}
                  disabled={kg === 0}
                  aria-label={`Remove 1 kg of ${variety.name}`}
                  type="button"
                >
                  -
                </button>
                <span className="qty-value" aria-live="polite">{kg === 0 ? '0' : `${kg} kg`}</span>
                <button
                  className="qty-btn"
                  onClick={() => onUpdateQuantity(variety.id, 1)}
                  disabled={kg >= 10}
                  aria-label={`Add 1 kg of ${variety.name}`}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VarietyAccordion({ cart, onCartChange }) {
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleUpdateQuantity = (varietyId, delta) => {
    triggerHaptic();
    onCartChange((prev) => {
      const current = prev[varietyId] ?? 0;
      const next = Math.max(0, Math.min(10, current + delta));
      if (next === 0) {
        if (!(varietyId in prev)) return prev;
        const nextCart = { ...prev };
        delete nextCart[varietyId];
        return nextCart;
      }
      return { ...prev, [varietyId]: next };
    });
  };

  const sampleBoxAdded = isSampleBoxInCart(cart, sampleBox);

  const handleAddSampleBox = () => {
    if (sampleBoxAdded) return;
    triggerHaptic();
    onCartChange((prev) => applySampleBox(prev, sampleBox));
  };

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

        <div className="accordion-list">
          {varieties.map((v) => (
            <SectionReveal as="div" key={v.id} delay={0.05}>
              <VarietyItem
                variety={v}
                badge={varietyBadges[v.id]}
                isExpanded={expandedId === v.id}
                onToggle={() => handleToggle(v.id)}
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            </SectionReveal>
          ))}
        </div>

        <SectionReveal as="div" className="sample-box-wrap" delay={0.1}>
          <button
            className={`sample-box-cta${sampleBoxAdded ? ' is-added' : ''}`}
            onClick={handleAddSampleBox}
            disabled={sampleBoxAdded}
            type="button"
          >
            <PackageIcon className="sample-box-icon" />
            <div className="sample-box-text">
              <strong>{sampleBox.name}</strong>
              <span>{sampleBox.description}</span>
              <span className="sample-box-price">Rs.{sampleBox.price} + delivery</span>
            </div>
            <span className="sample-box-action">{sampleBoxAdded ? 'Added' : 'Add'}</span>
          </button>
          <p className="reserve-note">
            Minimum order {formatCurrency(MIN_ORDER_VALUE)} - Shipping calculated separately
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
