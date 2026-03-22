import { useState, useEffect, useRef } from 'react';
import { varieties, MIN_ORDER_VALUE, outOfStockVarieties, beyondMangoProducts } from '../content.jsx';
import { formatCurrency, getCartSubtotal } from '../order.js';
import { siteConfig } from '../siteConfig.js';
import { ChevronDownIcon } from './icons.jsx';
import { triggerHaptic } from '../utils.js';

function VarietyItem({ variety, isExpanded, onToggle, cart, onUpdateQuantity }) {
  const kg = cart[variety.id] ?? 0;
  return (
    <div className={`accordion-item${isExpanded ? ' is-expanded' : ''}${kg > 0 ? ' in-cart' : ''}`}>
      <button
        className="accordion-trigger"
        onClick={onToggle}
        aria-expanded={isExpanded}
        type="button"
      >
        <img
          className="accordion-thumb"
          src={variety.image}
          alt={variety.alt}
          width="46"
          height="46"
          loading="lazy"
          decoding="async"
        />
        <div className="accordion-info">
          <span className="accordion-name">{variety.name}</span>
          <div className="accordion-price-row">
            <span className="acc-p-num">{formatCurrency(variety.pricePerKg)}</span>
            <span className="acc-p-unit">/ kg</span>
            {siteConfig.promotion?.active && siteConfig.promotion.overrides[variety.id] && (
              <span className="offer-chip">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                  <line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
                OFFER
              </span>
            )}
          </div>
        </div>
        <div className="accordion-trigger-right">
          {!isExpanded && (
            <span className="accordion-add-btn" aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add
            </span>
          )}
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
          <div className="accordion-tier-row">
            <div>
              <div className="accordion-tier-price">
                {formatCurrency(variety.pricePerKg)}{' '}
                <span className="accordion-tier-unit">/ kg</span>
              </div>
              {siteConfig.promotion?.active && siteConfig.promotion.overrides[variety.id] && (
                <div className="price-context-row">
                  <span className="price-original">
                    {formatCurrency(siteConfig.promotion.overrides[variety.id].originalPrice)}
                  </span>
                  <span className="save-badge">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                      <polyline points="17 6 23 6 23 12"/>
                    </svg>
                    Save {formatCurrency(siteConfig.promotion.overrides[variety.id].originalPrice - variety.pricePerKg)}/kg
                  </span>
                </div>
              )}
            </div>
            <div
              className={`accordion-qty${kg > 0 ? ' in-cart' : ''}`}
              aria-label={`${variety.name} quantity in kg`}
            >
              <button
                className="qty-btn"
                onClick={() => onUpdateQuantity(variety.id, -1)}
                disabled={kg === 0}
                aria-label={`Remove 1 kg of ${variety.name}`}
                type="button"
              >
                −
              </button>
              <span className="qty-value" aria-live="polite">
                {kg === 0 ? '0' : `${kg} kg`}
              </span>
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
  );
}

function OrderNote({ subtotal, onQuickAdd }) {
  const [popInfo, setPopInfo] = useState(null); // { id, label, key }
  const minimumMet = subtotal >= MIN_ORDER_VALUE;
  const prevSubtotal = useRef(subtotal);
  const [justMet, setJustMet] = useState(false);

  useEffect(() => {
    const wasBelow = prevSubtotal.current < MIN_ORDER_VALUE;
    prevSubtotal.current = subtotal;
    if (wasBelow && subtotal >= MIN_ORDER_VALUE) {
      setJustMet(true);
    }
  }, [subtotal]);

  const handleQuickAdd = (varietyId, qty, label) => {
    triggerHaptic();
    setPopInfo({ id: varietyId, label: `+${label}`, key: Date.now() });
    setTimeout(() => setPopInfo(null), 640);
    onQuickAdd(varietyId, qty);
  };

  const alpha = varieties.find(v => v.id === 'alphonso');
  const banga = varieties.find(v => v.id === 'banganapalli');
  const sendh = varieties.find(v => v.id === 'sendhooram');
  const imam = varieties.find(v => v.id === 'imam-pasand');

  return (
    <div className="order-note">

      {/* Trust block: always visible */}
      <div className="order-note-trust">
        <div className="order-note-trust-head">
          <div className="order-note-check">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12l5 5L19 7" />
            </svg>
          </div>
          <span className="order-note-trust-title">No surprises at checkout</span>
        </div>
        <p className="order-note-trust-body">
          Minimum order from{' '}
          <span className="order-note-min">&#8377;{MIN_ORDER_VALUE}</span>.{' '}
          Packing &amp; delivery{' '}
          <strong className="order-note-delivery">subject to your location</strong>
          &nbsp;and updated after your reservation is confirmed.
        </p>
      </div>

      {/* Quick Starts: always visible, with inline minimum-met badge */}
      <div className="order-note-sugg is-entering">
        <div className="order-note-sugg-head">
          <span className="order-note-sugg-label">Quick Starts</span>
          {minimumMet && (
            <span className={`order-note-met-badge${justMet ? ' is-fresh' : ''}`}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M5 12l5 5L19 7" />
              </svg>
              Minimum reached
            </span>
          )}
        </div>

        {alpha && (
          <div className="order-note-sugg-row sugg-row-1">
            <img
              className="order-note-s-thumb"
              src={alpha.image}
              alt={alpha.alt}
              loading="lazy"
              decoding="async"
            />
            <div className="order-note-s-info">
              <div className="order-note-s-qty">2 kg Alphonso</div>
              <div className="order-note-s-name">meets the minimum</div>
            </div>
            <div className="order-note-s-right">
              <span className="order-note-s-price">&#8377;260</span>
              <button
                className="order-note-s-cta"
                type="button"
                aria-label="Add 2 kg of Alphonso"
                onClick={() => handleQuickAdd('alphonso', 2, '2 kg')}
              >
                {popInfo?.id === 'alphonso' && (
                  <span key={popInfo.key} className="order-note-count-pop">{popInfo.label}</span>
                )}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {banga && (
          <div className="order-note-sugg-row sugg-row-2">
            <img
              className="order-note-s-thumb"
              src={banga.image}
              alt={banga.alt}
              loading="lazy"
              decoding="async"
            />
            <div className="order-note-s-info">
              <div className="order-note-s-qty">3 kg Banganapalli</div>
              <div className="order-note-s-name">meets the minimum</div>
            </div>
            <div className="order-note-s-right">
              <span className="order-note-s-price">&#8377;240</span>
              <button
                className="order-note-s-cta"
                type="button"
                aria-label="Add 3 kg of Banganapalli"
                onClick={() => handleQuickAdd('banganapalli', 3, '3 kg')}
              >
                {popInfo?.id === 'banganapalli' && (
                  <span key={popInfo.key} className="order-note-count-pop">{popInfo.label}</span>
                )}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {sendh && (
          <div className="order-note-sugg-row sugg-row-3">
            <img
              className="order-note-s-thumb"
              src={sendh.image}
              alt={sendh.alt}
              loading="lazy"
              decoding="async"
            />
            <div className="order-note-s-info">
              <div className="order-note-s-qty">3 kg Sendhooram</div>
              <div className="order-note-s-name">meets the minimum</div>
            </div>
            <div className="order-note-s-right">
              <span className="order-note-s-price">&#8377;240</span>
              <button
                className="order-note-s-cta"
                type="button"
                aria-label="Add 3 kg of Sendhooram"
                onClick={() => handleQuickAdd('sendhooram', 3, '3 kg')}
              >
                {popInfo?.id === 'sendhooram' && (
                  <span key={popInfo.key} className="order-note-count-pop">{popInfo.label}</span>
                )}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {imam && (
          <div className="order-note-sugg-row sugg-row-4">
            <img
              className="order-note-s-thumb"
              src={imam.image}
              alt={imam.alt}
              loading="lazy"
              decoding="async"
            />
            <div className="order-note-s-info">
              <div className="order-note-s-qty">2 kg Imam Pasand</div>
              <div className="order-note-s-name">premium pick</div>
            </div>
            <div className="order-note-s-right">
              <span className="order-note-s-price">&#8377;400</span>
              <button
                className="order-note-s-cta"
                type="button"
                aria-label="Add 2 kg of Imam Pasand"
                onClick={() => handleQuickAdd('imam-pasand', 2, '2 kg')}
              >
                {popInfo?.id === 'imam-pasand' && (
                  <span key={popInfo.key} className="order-note-count-pop">{popInfo.label}</span>
                )}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default function VarietyAccordion({ cart, onCartChange }) {
  const [expandedId, setExpandedId] = useState(null);
  const subtotal = getCartSubtotal(cart, varieties);

  const handleToggle = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const handleUpdateQuantity = (varietyId, delta) => {
    triggerHaptic();
    onCartChange(prev => {
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

  const handleQuickAdd = (varietyId, qty) => {
    onCartChange(prev => {
      const current = prev[varietyId] ?? 0;
      return { ...prev, [varietyId]: Math.min(10, current + qty) };
    });
  };

  return (
    <section className="section section-varieties" id="varieties">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">The Collection</p>
          <h2>Pick Your Favourite Bite</h2>
          <p className="section-intro">
            Every variety has a distinct flavour profile. We harvest only at natural maturity so
            sweetness, aroma, and texture land exactly right.
          </p>
        </header>

        {siteConfig.promotion?.active && (
          <div className="promo-banner">
            <div className="promo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
            </div>
            <div className="promo-body">
              <div className="promo-title">{siteConfig.promotion.label}</div>
              <div className="promo-sub">{siteConfig.promotion.subtitle}</div>
            </div>
          </div>
        )}

        <div className="accordion-list">
          {varieties.map(v => (
            <VarietyItem
              key={v.id}
              variety={v}
              isExpanded={expandedId === v.id}
              onToggle={() => handleToggle(v.id)}
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
        </div>

        <OrderNote subtotal={subtotal} onQuickAdd={handleQuickAdd} />

        <div className="oos-section">
          <p className="oos-divider">Out of Stock: Next batch starts soon</p>
          <div className="oos-grid">
            {outOfStockVarieties.map(v => (
              <div key={v.id} className="oos-grid-row">
                <span className="oos-grid-name">{v.name}</span>
                <span className="oos-grid-soon">Soon</span>
              </div>
            ))}
          </div>
        </div>

        <div className="beyond-card">
          <div className="beyond-eyebrow">From Our Estate</div>
          <div className="beyond-title">Beyond Mangoes</div>
          <div className="beyond-items">
            {beyondMangoProducts.map(product => (
              <div key={product.id} className="beyond-item">
                <div className={`beyond-item-icon ${product.id}`}>{product.emoji}</div>
                <div className="beyond-item-info">
                  <div className="beyond-item-name">{product.name}</div>
                  <div className="beyond-item-sub">{product.subtitle}</div>
                </div>
                <span className="beyond-item-soon">SOON</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
