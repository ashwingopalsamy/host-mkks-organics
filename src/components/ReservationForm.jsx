import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MIN_ORDER_VALUE,
  phoneDisplay,
  phoneNumber,
  varieties,
  sampleBox,
} from '../content.jsx';
import { siteConfig } from '../siteConfig.js';
import {
  applySampleBox,
  isSampleBoxInCart,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  formatCurrency,
  getAppliedBundleDiscount,
  getCartItemCount,
  getCartLines,
  getCartSubtotal,
  getDisabledReason,
} from '../order.js';
import { WhatsAppIcon, BackArrowIcon, CloseIcon, PhoneIcon, CopyIcon, PackageIcon } from './icons.jsx';

const triggerHaptic = () => {
  if (typeof window !== 'undefined' && window.navigator?.vibrate) {
    try { window.navigator.vibrate([15]); } catch { /* ignore */ }
  }
};

const INITIAL_CUSTOMER = {
  name: '',
  flat: '',
  addressLine1: '',
  addressLine2: '',
  city: 'Coimbatore',
  state: 'Tamil Nadu',
  pin: '',
  notes: '',
};

export default function ReservationForm({ isOpen, onClose, cart: externalCart, onCartChange }) {
  const [activeTab, setActiveTab] = useState(0);
  const [customerDetails, setCustomerDetails] = useState(INITIAL_CUSTOMER);
  const [fallbackState, setFallbackState] = useState({ copied: false, blocked: false, error: false });

  const formRef = useRef(null);
  const bodyRef = useRef(null);
  const closeButtonRef = useRef(null);

  const switchTab = (tab) => {
    setActiveTab(tab);
    bodyRef.current?.scrollTo?.(0, 0);
  };

  const cart = externalCart ?? {};
  const setCart = onCartChange ?? (() => {});

  const cartLines = useMemo(() => getCartLines(cart, varieties), [cart]);
  const totalItems = useMemo(() => getCartItemCount(cart), [cart]);
  const cartTotal = useMemo(() => getCartSubtotal(cart, varieties), [cart]);
  const bundleDiscount = useMemo(
    () => getAppliedBundleDiscount(cart, sampleBox, varieties),
    [cart]
  );
  const effectiveSubtotal = cartTotal - bundleDiscount;
  const disabledReason = useMemo(
    () =>
      getDisabledReason({
        itemCount: totalItems,
        subtotal: effectiveSubtotal,
        minimumOrderValue: MIN_ORDER_VALUE,
        customerDetails,
      }),
    [effectiveSubtotal, customerDetails, totalItems]
  );
  const whatsAppMessage = useMemo(
    () =>
      buildWhatsAppMessage({
        lines: cartLines,
        productSubtotal: cartTotal,
        packagingDelivery: siteConfig.packagingDelivery,
        customer: customerDetails,
        brandName: siteConfig.brandName,
        bundleDiscount,
      }),
    [cartLines, cartTotal, bundleDiscount, customerDetails]
  );
  const whatsAppUrl = useMemo(
    () => buildWhatsAppUrl(whatsAppMessage, phoneNumber),
    [whatsAppMessage]
  );

  const updateQuantity = (varietyId, delta) => {
    triggerHaptic();
    setCart((prev) => {
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
    setCart((prev) => applySampleBox(prev, sampleBox));
  };

  const updateCustomerField = (field, value) => {
    setCustomerDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = useCallback(() => {
    setFallbackState({ copied: false, blocked: false, error: false });
    setActiveTab(0);
    onClose();
  }, [onClose]);

  const handleSendRequest = async () => {
    if (disabledReason) {
      triggerHaptic();
      return;
    }

    const popup = window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
    if (popup) {
      handleClose();
      return;
    }

    try {
      await navigator.clipboard.writeText(whatsAppMessage);
      setFallbackState({ copied: true, blocked: true, error: false });
    } catch {
      setFallbackState({ copied: false, blocked: true, error: true });
    }
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => { closeButtonRef.current?.focus(); });
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !formRef.current) return undefined;
    const node = formRef.current;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = node.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    node.addEventListener('keydown', handleKeyDown);
    return () => node.removeEventListener('keydown', handleKeyDown);
  }, [handleClose, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="reservation-page"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          ref={formRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="reserve-form-title"
        >
          <header className="reservation-header">
            <button
              className="reservation-back"
              onClick={handleClose}
              aria-label="Go back"
              type="button"
            >
              <BackArrowIcon />
            </button>
            <h2 id="reserve-form-title">Reserve Mangoes</h2>
            <button
              className="reservation-close"
              onClick={handleClose}
              aria-label="Close reservation form"
              ref={closeButtonRef}
              type="button"
            >
              <CloseIcon />
            </button>
          </header>

          <div className="reservation-tabs" role="tablist">
            <button
              role="tab"
              className={`reservation-tab${activeTab === 0 ? ' is-active' : ''}`}
              aria-selected={activeTab === 0}
              onClick={() => switchTab(0)}
              type="button"
            >
              1. Select Mangoes
            </button>
            <button
              role="tab"
              className={`reservation-tab${activeTab === 1 ? ' is-active' : ''}`}
              aria-selected={activeTab === 1}
              onClick={() => switchTab(1)}
              type="button"
            >
              2. Delivery Details
            </button>
          </div>

          <div className="reservation-body" ref={bodyRef}>
            {activeTab === 0 && (
              <div className="reservation-panel" role="tabpanel">
                {totalItems === 0 && (
                  <div className="reservation-empty-hint">
                    <p>Most people start with 2 kg Imam Pasand.</p>
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
                  </div>
                )}

                <div className="reserve-varieties-list">
                  {varieties.map((variety) => {
                    const kg = cart[variety.id] ?? 0;
                    return (
                      <div key={variety.id} className="reserve-form-variety">
                        <div className="reserve-variety-header">
                          <h5>{variety.name}</h5>
                          <span className="reserve-per-kg">{formatCurrency(variety.pricePerKg)}/kg</span>
                        </div>
                        <div className="reserve-tier-row">
                          <div className="reserve-qty" aria-label={`${variety.name} quantity in kg`}>
                            <button
                              className="qty-btn"
                              onClick={() => updateQuantity(variety.id, -1)}
                              disabled={kg === 0}
                              aria-label={`Remove 1 kg of ${variety.name}`}
                              type="button"
                            >
                              -
                            </button>
                            <span className="qty-value" aria-live="polite">{kg === 0 ? '0' : `${kg} kg`}</span>
                            <button
                              className="qty-btn"
                              onClick={() => updateQuantity(variety.id, 1)}
                              disabled={kg >= 10}
                              aria-label={`Add 1 kg of ${variety.name}`}
                              type="button"
                            >
                              +
                            </button>
                          </div>
                          {kg > 0 && (
                            <span className="reserve-tier-price">{formatCurrency(variety.pricePerKg * kg)}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {activeTab === 1 && (
              <div className="reservation-panel" role="tabpanel">
                <div className="reserve-card">
                  <p className="reserve-card-title">Contact</p>
                  <div className="reserve-input-group">
                    <label htmlFor="customer-name">Full Name</label>
                    <input
                      id="customer-name"
                      type="text"
                      className="reserve-input"
                      placeholder="E.g. Arjun Kumar"
                      value={customerDetails.name}
                      onChange={(e) => updateCustomerField('name', e.target.value)}
                    />
                  </div>
                </div>

                <div className="reserve-card">
                  <p className="reserve-card-title">Delivery Address</p>
                  <div className="reserve-input-group">
                    <label htmlFor="customer-flat">Flat / Building</label>
                    <input
                      id="customer-flat"
                      type="text"
                      className="reserve-input"
                      placeholder="12B, Orchid Apartments"
                      value={customerDetails.flat}
                      onChange={(e) => updateCustomerField('flat', e.target.value)}
                    />
                  </div>
                  <div className="reserve-input-group">
                    <label htmlFor="customer-address1">Street / Area</label>
                    <input
                      id="customer-address1"
                      type="text"
                      className="reserve-input"
                      placeholder="MG Road, RS Puram"
                      value={customerDetails.addressLine1}
                      onChange={(e) => updateCustomerField('addressLine1', e.target.value)}
                    />
                  </div>
                  <div className="reserve-input-group">
                    <label htmlFor="customer-address2">Landmark (Optional)</label>
                    <input
                      id="customer-address2"
                      type="text"
                      className="reserve-input"
                      placeholder="Near Central Mall"
                      value={customerDetails.addressLine2}
                      onChange={(e) => updateCustomerField('addressLine2', e.target.value)}
                    />
                  </div>
                  <div className="reserve-input-row">
                    <div className="reserve-input-group">
                      <label htmlFor="customer-city">City</label>
                      <input
                        id="customer-city"
                        type="text"
                        className="reserve-input"
                        value={customerDetails.city}
                        onChange={(e) => updateCustomerField('city', e.target.value)}
                      />
                    </div>
                    <div className="reserve-input-group">
                      <label htmlFor="customer-pin">PIN Code</label>
                      <input
                        id="customer-pin"
                        type="text"
                        className="reserve-input"
                        inputMode="numeric"
                        placeholder="641001"
                        value={customerDetails.pin}
                        onChange={(e) => updateCustomerField('pin', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="reserve-input-group">
                    <label htmlFor="customer-state">State</label>
                    <input
                      id="customer-state"
                      type="text"
                      className="reserve-input"
                      value={customerDetails.state}
                      onChange={(e) => updateCustomerField('state', e.target.value)}
                    />
                  </div>
                </div>

                <div className="reserve-card reserve-card-muted">
                  <div className="reserve-input-group reserve-notes-group">
                    <label htmlFor="customer-notes">Notes (Optional)</label>
                    <textarea
                      id="customer-notes"
                      className="reserve-input"
                      rows="2"
                      placeholder="Preferred contact time, gifting note..."
                      value={customerDetails.notes}
                      onChange={(e) => updateCustomerField('notes', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="reservation-footer">
            {cartLines.length > 0 && (
              <div className="reservation-summary">
                <div className="reservation-summary-header">
                  <span>Order Total</span>
                  <span>{formatCurrency(effectiveSubtotal + siteConfig.packagingDelivery)}</span>
                </div>
                {cartLines.map((line) => (
                  <div key={line.id} className="reservation-summary-line">
                    <span>{line.name} {line.kg}kg</span>
                    <span>{formatCurrency(line.subtotal)}</span>
                  </div>
                ))}
                {bundleDiscount > 0 && (
                  <div className="reservation-summary-line reservation-summary-discount">
                    <span>Taste Box discount</span>
                    <span>-{formatCurrency(bundleDiscount)}</span>
                  </div>
                )}
                <div className="reservation-summary-line">
                  <span>Packing &amp; Delivery</span>
                  <span>{formatCurrency(siteConfig.packagingDelivery)}</span>
                </div>
              </div>
            )}

            {totalItems > 0 && effectiveSubtotal < MIN_ORDER_VALUE && (
              <div className="cart-min-warn">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm.75 11.25h-1.5v-1.5h1.5v1.5Zm0-3h-1.5v-5h1.5v5Z" />
                </svg>
                <span>Minimum order is {formatCurrency(MIN_ORDER_VALUE)}</span>
              </div>
            )}

            {activeTab === 0 ? (
              totalItems > 0 && (
                <button className="btn btn-primary" onClick={() => switchTab(1)} type="button">
                  Next: Address Details &rarr;
                </button>
              )
            ) : (
              <>
                {disabledReason && (
                  <p className="reserve-validation-note" aria-live="polite">{disabledReason}</p>
                )}
                <button
                  className={`btn btn-whatsapp reserve-submit-btn${disabledReason ? ' is-disabled' : ''}`}
                  onClick={handleSendRequest}
                  type="button"
                  disabled={Boolean(disabledReason)}
                >
                  <span className="btn-icon btn-icon-whatsapp" aria-hidden="true">
                    <WhatsAppIcon />
                  </span>
                  Send on WhatsApp
                </button>
                {fallbackState.blocked && (
                  <div className="reserve-fallback" role="status">
                    <strong>WhatsApp did not open automatically.</strong>
                    <p>
                      {fallbackState.copied
                        ? 'The reservation request has been copied. Open WhatsApp and paste it.'
                        : 'Use the options below if WhatsApp is unavailable.'}
                    </p>
                    {fallbackState.error && <p>Clipboard copy was unavailable on this device.</p>}
                    <div className="fallback-actions">
                      <a className="btn btn-secondary fallback-btn" href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                        <span className="btn-icon btn-icon-whatsapp" aria-hidden="true"><WhatsAppIcon /></span>
                        Open WhatsApp
                      </a>
                      <button
                        className="btn btn-secondary fallback-btn"
                        type="button"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(whatsAppMessage);
                            setFallbackState((prev) => ({ ...prev, copied: true }));
                          } catch { /* ignore */ }
                        }}
                      >
                        <span className="btn-icon" aria-hidden="true"><CopyIcon /></span>
                        {fallbackState.copied ? 'Copied' : 'Copy Message'}
                      </button>
                      <a className="btn btn-secondary fallback-btn" href={`tel:${phoneNumber}`}>
                        <span className="btn-icon" aria-hidden="true"><PhoneIcon /></span>
                        Call {phoneDisplay}
                      </a>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
