import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { varieties, MIN_ORDER_VALUE, phoneNumber as PHONE } from '../data/content.jsx';
import { WhatsAppIcon } from './icons.jsx';

// Haptic feedback utility
const triggerHaptic = () => {
  if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
    try {
      window.navigator.vibrate([15]);
    } catch {
      // Ignore
    }
  }
};

function buildWhatsAppUrl(cart, total, customerDetails) {
  const lines = Object.entries(cart)
    .filter(([_, qty]) => qty > 0)
    .map(([variantId, qty]) => {
      const [name, weightStr] = variantId.split('|');
      const variety = varieties.find((v) => v.name === name);
      const tier = variety.pricing.find((p) => p.weight === weightStr);
      const lineTotal = tier.price * qty;
      return `• *${name}* — ${weightStr} × ${qty}\n  _₹${lineTotal.toLocaleString('en-IN')}_`;
    });

  const text = [
    '🧾 *New Order from MKKS Organics*',
    '',
    ...lines,
    '',
    `*Product Total: ₹${total.toLocaleString('en-IN')}*`,
    '📦 _Shipping charges will be calculated separately._',
    '',
    '*Customer Details:*',
    `Name: ${customerDetails.name}`,
    `Address: ${customerDetails.address}`,
  ].join('\n');

  return `https://wa.me/${PHONE.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

export default function ReservationForm({ isOpen, onClose }) {
  // State: { "VarietyName|Weight": quantity }
  const [cart, setCart] = useState({});
  const [customerDetails, setCustomerDetails] = useState({ name: '', address: '' });

  const updateQuantity = (variantId, delta) => {
    triggerHaptic();
    setCart((prev) => {
      const current = prev[variantId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [variantId]: next };
    });
  };

  const cartTotal = useMemo(() => {
    let total = 0;
    Object.entries(cart).forEach(([variantId, qty]) => {
      if (qty === 0) return;
      const [name, weightStr] = variantId.split('|');
      const variety = varieties.find((v) => v.name === name);
      if (variety) {
        const tier = variety.pricing.find((p) => p.weight === weightStr);
        if (tier) total += tier.price * qty;
      }
    });
    return total;
  }, [cart]);

  const totalItems = Object.values(cart).reduce((sum, q) => sum + q, 0);
  const belowMin = cartTotal < MIN_ORDER_VALUE;
  const isFormIncomplete = !customerDetails.name.trim() || !customerDetails.address.trim();
  const canSubmit = totalItems > 0 && !belowMin && !isFormIncomplete;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cart-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          
          {/* Bottom Sheet */}
          <motion.div
            className="cart-modal-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 32 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.05}
            onDragEnd={(e, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                onClose();
              }
            }}
          >
            <div className="cart-modal-handle-wrap">
              <div className="cart-modal-handle" />
            </div>

            <div className="cart-modal-header">
              <h3>Reserve Mangoes</h3>
              <button className="cart-modal-close" onClick={onClose} aria-label="Close cart">
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
                    <div key={variety.name} className="reserve-form-variety">
                      <div className="reserve-variety-header">
                        <h5>{variety.name}</h5>
                      </div>
                      <div className="reserve-variety-tiers">
                        {variety.pricing.map((tier) => {
                          const variantId = `${variety.name}|${tier.weight}`;
                          const qty = cart[variantId] || 0;
                          return (
                            <div key={tier.weight} className="reserve-tier-row">
                              <div className="reserve-tier-info">
                                <span className="reserve-tier-weight">{tier.weight}</span>
                                <span className="reserve-tier-price">₹{tier.price}</span>
                              </div>
                              <div className="reserve-qty">
                                <button className="qty-btn" onClick={() => updateQuantity(variantId, -1)} disabled={qty === 0}>
                                  −
                                </button>
                                <span className="qty-value">{qty}</span>
                                <button className="qty-btn" onClick={() => updateQuantity(variantId, 1)}>
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
                    onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                  />
                </div>
                <div className="reserve-input-group">
                  <label htmlFor="customer-address">Complete Delivery Address</label>
                  <textarea
                    id="customer-address"
                    className="reserve-input"
                    rows="3"
                    placeholder="Enter flat, building, street, and pin code..."
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                  />
                </div>
              </div>

              <div className="cart-summary">
                <div className="cart-summary-total">
                  <span>Product Total</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>

                {totalItems > 0 && belowMin && (
                  <div className="cart-min-warn">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm.75 11.25h-1.5v-1.5h1.5v1.5Zm0-3h-1.5v-5h1.5v5Z" />
                    </svg>
                    <span>Minimum order is ₹{MIN_ORDER_VALUE}</span>
                  </div>
                )}
                <p className="shipping-note-form">Shipping charges calculated separately during confirmation.</p>
              </div>
            </div>

            <div className="cart-modal-footer">
              <a
                className={`btn btn-whatsapp reserve-submit-btn ${!canSubmit ? 'is-disabled' : ''}`}
                href={!canSubmit ? undefined : buildWhatsAppUrl(cart, cartTotal, customerDetails)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!canSubmit) {
                    e.preventDefault();
                    triggerHaptic();
                  }
                }}
              >
                <span className="btn-icon btn-icon-whatsapp" aria-hidden="true">
                  <WhatsAppIcon />
                </span>
                Send Order via WhatsApp
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
