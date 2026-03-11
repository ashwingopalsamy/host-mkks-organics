import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MIN_ORDER_VALUE,
  phoneDisplay,
  phoneNumber,
  varieties,
} from '../data/content.jsx';
import { siteConfig } from '../data/siteConfig.js';
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  formatCurrency,
  getCartItemCount,
  getCartLines,
  getCartSubtotal,
  getDisabledReason,
  getVariantId,
} from '../utils/order.js';
import { WhatsAppIcon } from './icons.jsx';

const triggerHaptic = () => {
  if (typeof window !== 'undefined' && window.navigator?.vibrate) {
    try {
      window.navigator.vibrate([15]);
    } catch {
      // Ignore unsupported vibration requests.
    }
  }
};

export default function ReservationForm({ isOpen, onClose }) {
  const [cart, setCart] = useState({});
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
    notes: '',
    consentConfirmed: false,
  });
  const [fallbackState, setFallbackState] = useState({
    copied: false,
    blocked: false,
    error: false,
  });

  const sheetRef = useRef(null);
  const closeButtonRef = useRef(null);

  const cartLines = useMemo(() => getCartLines(cart, varieties), [cart]);
  const totalItems = useMemo(() => getCartItemCount(cart), [cart]);
  const cartTotal = useMemo(() => getCartSubtotal(cart, varieties), [cart]);
  const disabledReason = useMemo(
    () =>
      getDisabledReason({
        itemCount: totalItems,
        subtotal: cartTotal,
        minimumOrderValue: MIN_ORDER_VALUE,
        customerDetails,
      }),
    [cartTotal, customerDetails, totalItems]
  );
  const whatsAppMessage = useMemo(
    () =>
      buildWhatsAppMessage({
        lines: cartLines,
        subtotal: cartTotal,
        customer: customerDetails,
        brandName: siteConfig.brandName,
      }),
    [cartLines, cartTotal, customerDetails]
  );
  const whatsAppUrl = useMemo(
    () => buildWhatsAppUrl(whatsAppMessage, phoneNumber),
    [whatsAppMessage]
  );

  const updateQuantity = (variantId, delta) => {
    triggerHaptic();
    setCart((prev) => {
      const current = prev[variantId] ?? 0;
      const next = Math.max(0, current + delta);

      if (next === 0) {
        if (!(variantId in prev)) {
          return prev;
        }

        const nextCart = { ...prev };
        delete nextCart[variantId];
        return nextCart;
      }

      return { ...prev, [variantId]: next };
    });
  };

  const updateCustomerField = (field, value) => {
    setCustomerDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClose = useCallback(() => {
    setFallbackState({ copied: false, blocked: false, error: false });
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
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !sheetRef.current) {
      return undefined;
    }

    const node = sheetRef.current;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusable = node.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (focusable.length === 0) {
        return;
      }

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
        <>
          <motion.div
            className="cart-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
          />

          <motion.div
            className="cart-modal-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 32 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.05}
            onDragEnd={(event, info) => {
              void event;
              if (info.offset.y > 100 || info.velocity.y > 500) {
                handleClose();
              }
            }}
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reserve-form-title"
          >
            <div className="cart-modal-handle-wrap">
              <div className="cart-modal-handle" />
            </div>

            <div className="cart-modal-header">
              <h3 id="reserve-form-title">Reserve Mangoes</h3>
              <button
                className="cart-modal-close"
                onClick={handleClose}
                aria-label="Close reservation sheet"
                ref={closeButtonRef}
                type="button"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="cart-modal-content reserve-form-scroll">
              <div className="reserve-form-section">
                <h4 className="reserve-section-title">Step 1: Select Quantities</h4>
                <div className="reserve-varieties-list">
                  {varieties.map((variety) => (
                    <div key={variety.id} className="reserve-form-variety">
                      <div className="reserve-variety-header">
                        <h5>{variety.name}</h5>
                      </div>
                      <div className="reserve-variety-tiers">
                        {variety.pricing.map((tier) => {
                          const variantId = getVariantId(variety.id, tier.id);
                          const qty = cart[variantId] ?? 0;

                          return (
                            <div key={tier.id} className="reserve-tier-row">
                              <div className="reserve-tier-info">
                                <span className="reserve-tier-weight">{tier.weight}</span>
                                <span className="reserve-tier-price">{formatCurrency(tier.price)}</span>
                              </div>
                              <div className="reserve-qty" aria-label={`${variety.name} ${tier.weight}`}>
                                <button
                                  className="qty-btn"
                                  onClick={() => updateQuantity(variantId, -1)}
                                  disabled={qty === 0}
                                  aria-label={`Remove one ${tier.weight} of ${variety.name}`}
                                  type="button"
                                >
                                  −
                                </button>
                                <span className="qty-value" aria-live="polite">{qty}</span>
                                <button
                                  className="qty-btn"
                                  onClick={() => updateQuantity(variantId, 1)}
                                  aria-label={`Add one ${tier.weight} of ${variety.name}`}
                                  type="button"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reserve-form-section">
                <h4 className="reserve-section-title">Step 2: Delivery Details</h4>
                <div className="reserve-input-group">
                  <label htmlFor="customer-name">Full Name</label>
                  <input
                    id="customer-name"
                    type="text"
                    className="reserve-input"
                    placeholder="E.g. Arjun Kumar"
                    value={customerDetails.name}
                    onChange={(event) => updateCustomerField('name', event.target.value)}
                  />
                </div>
                <div className="reserve-input-group">
                  <label htmlFor="customer-address">Complete Delivery Address</label>
                  <textarea
                    id="customer-address"
                    className="reserve-input"
                    rows="3"
                    placeholder="Enter flat, building, street, city, and pin code..."
                    value={customerDetails.address}
                    onChange={(event) => updateCustomerField('address', event.target.value)}
                  />
                </div>
                <div className="reserve-input-group">
                  <label htmlFor="customer-notes">Notes or Landmark (Optional)</label>
                  <textarea
                    id="customer-notes"
                    className="reserve-input"
                    rows="2"
                    placeholder="Preferred contact time, gifting note, or landmark..."
                    value={customerDetails.notes}
                    onChange={(event) => updateCustomerField('notes', event.target.value)}
                  />
                </div>
                <label className="reserve-consent-row">
                  <input
                    type="checkbox"
                    checked={customerDetails.consentConfirmed}
                    onChange={(event) => updateCustomerField('consentConfirmed', event.target.checked)}
                  />
                  <span>I understand shipping charges will be confirmed separately on WhatsApp.</span>
                </label>
              </div>

              <div className="reserve-form-section">
                <h4 className="reserve-section-title">Step 3: Review Request</h4>
                {cartLines.length > 0 ? (
                  <ul className="reserve-summary-list">
                    {cartLines.map((line) => (
                      <li key={line.id} className="reserve-summary-item">
                        <div>
                          <strong>{line.name}</strong>
                          <span>{line.weight} × {line.quantity}</span>
                        </div>
                        <strong>{formatCurrency(line.subtotal)}</strong>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="reserve-summary-empty">
                    Add boxes from any variety to preview the reservation request before it opens on WhatsApp.
                  </p>
                )}
              </div>

              <div className="cart-summary">
                <div className="cart-summary-total">
                  <span>Product Total</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>

                {totalItems > 0 && cartTotal < MIN_ORDER_VALUE ? (
                  <div className="cart-min-warn">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm.75 11.25h-1.5v-1.5h1.5v1.5Zm0-3h-1.5v-5h1.5v5Z" />
                    </svg>
                    <span>Minimum order is {formatCurrency(MIN_ORDER_VALUE)}</span>
                  </div>
                ) : null}

                <p className="shipping-note-form">
                  This opens a reservation request. Availability, shipping charges, and dispatch timing are confirmed separately on WhatsApp.
                </p>
                <p className="reserve-validation-note" aria-live="polite">
                  {disabledReason ?? 'Ready to send a structured reservation request on WhatsApp.'}
                </p>
              </div>
            </div>

            <div className="cart-modal-footer">
              <button
                className={`btn btn-whatsapp reserve-submit-btn ${disabledReason ? 'is-disabled' : ''}`}
                onClick={handleSendRequest}
                type="button"
                disabled={Boolean(disabledReason)}
              >
                <span className="btn-icon btn-icon-whatsapp" aria-hidden="true">
                  <WhatsAppIcon />
                </span>
                Send Reservation Request on WhatsApp
              </button>

              {fallbackState.blocked ? (
                <div className="reserve-fallback" role="status">
                  <strong>WhatsApp did not open automatically.</strong>
                  <p>
                    {fallbackState.copied
                      ? 'The reservation request has been copied. Open WhatsApp and paste it into a chat with the orchard.'
                      : 'Use the direct phone number below if WhatsApp is unavailable on this device.'}
                  </p>
                  {fallbackState.error ? <p>Clipboard copy was unavailable on this device.</p> : null}
                  <a href={`tel:${phoneNumber}`}>Call {phoneDisplay}</a>
                </div>
              ) : null}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
