import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  MIN_ORDER_VALUE,
  phoneDisplay,
  phoneNumber,
  varieties,
  sampleBox,
} from '../content.jsx';
import { siteConfig } from '../siteConfig.js';
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  formatCurrency,
  getCartItemCount,
  getCartLines,
  getCartSubtotal,
  getDisabledReason,
} from '../order.js';
import { WhatsAppIcon, BackArrowIcon, CloseIcon, PhoneIcon, CopyIcon, PackageIcon, TrashIcon } from './icons.jsx';
import { triggerHaptic } from '../utils.js';

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

export default function ReservationForm({ isOpen, onClose, cart: externalCart, onCartChange, onClearCart }) {
  const [activeTab, setActiveTab] = useState(0);
  const [customerDetails, setCustomerDetails] = useState(INITIAL_CUSTOMER);
  const [fallbackState, setFallbackState] = useState({ copied: false, blocked: false, error: false });
  const [showNotes, setShowNotes] = useState(false);
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const formRef = useRef(null);
  const bodyRef = useRef(null);
  const closeButtonRef = useRef(null);
  const nameInputRef = useRef(null);

  const switchTab = (tab) => {
    setActiveTab(tab);
    bodyRef.current?.scrollTo?.(0, 0);
  };

  const cart = externalCart ?? {};
  const setCart = onCartChange ?? (() => { });

  const [tasteBoxInCart, setTasteBoxInCart] = useState(false);
  const tasteBoxTotal = tasteBoxInCart ? sampleBox.price : 0;

  const cartLines = useMemo(() => getCartLines(cart, varieties), [cart]);
  const totalItems = useMemo(() => getCartItemCount(cart), [cart]);
  const cartTotal = useMemo(() => getCartSubtotal(cart, varieties), [cart]);
  const activeField = useMemo(() => {
    if (!customerDetails.name.trim()) return 'name';
    if (!customerDetails.flat.trim()) return 'flat';
    if (!customerDetails.addressLine1.trim()) return 'addressLine1';
    if (!customerDetails.pin.trim() || !/^[1-9][0-9]{5}$/.test(customerDetails.pin.trim())) return 'pin';
    return null;
  }, [customerDetails]);

  const disabledReason = useMemo(
    () =>
      getDisabledReason({
        itemCount: totalItems + (tasteBoxInCart ? 1 : 0),
        subtotal: cartTotal + tasteBoxTotal,
        minimumOrderValue: MIN_ORDER_VALUE,
        customerDetails,
      }),
    [cartTotal, tasteBoxTotal, customerDetails, totalItems, tasteBoxInCart]
  );
  const tasteBoxLine = tasteBoxInCart
    ? `Taste Box (${sampleBox.description}): *${formatCurrency(sampleBox.price)}*`
    : null;
  const whatsAppMessage = useMemo(
    () =>
      buildWhatsAppMessage({
        lines: cartLines,
        productSubtotal: cartTotal + tasteBoxTotal,
        customer: customerDetails,
        brandName: siteConfig.brandName,
        tasteBoxLine,
      }),
    [cartLines, cartTotal, tasteBoxTotal, tasteBoxLine, customerDetails]
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

  const sampleBoxAdded = tasteBoxInCart;

  const handleAddSampleBox = useCallback(() => {
    setTasteBoxInCart(true);
    triggerHaptic();
  }, []);

  const handleRemoveSampleBox = useCallback(() => {
    setTasteBoxInCart(false);
    triggerHaptic();
  }, []);

  const updateCustomerField = (field, value) => {
    setCustomerDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = useCallback(() => {
    setFallbackState({ copied: false, blocked: false, error: false });
    setActiveTab(0);
    onClose();
  }, [onClose]);

  const handleClear = useCallback(() => {
    onClearCart?.();
    setActiveTab(0);
    bodyRef.current?.scrollTo?.(0, 0);
  }, [onClearCart]);

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

  // Auto-focus first empty required field when Step 2 opens
  useEffect(() => {
    if (activeTab !== 1) return;
    requestAnimationFrame(() => nameInputRef.current?.focus());
  }, [activeTab]);
  // Close delivery tooltip on outside click
  useEffect(() => {
    if (!showDeliveryInfo) return;
    const handler = (e) => {
      if (!e.target.closest('.rf-delivery-wrap')) setShowDeliveryInfo(false);
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [showDeliveryInfo]);



  if (!isOpen) return null;

  return (
    <div
      className="reservation-page"
      ref={formRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reserve-form-title"
    >
      {/* Nav row */}
      <header className="rf-header-nav">
        <button className="rf-nav-btn" onClick={handleClose} aria-label="Go back" type="button">
          <BackArrowIcon />
        </button>
        <div className="rf-header-mid">
          <h2 id="reserve-form-title" className="rf-header-title">
            {activeTab === 1
              ? <>Almost <span className="rf-title-green">Yours</span></>
              : <>Build your <span className="rf-title-accent">Mango Box</span></>}
          </h2>
        </div>
        <button className="rf-nav-btn" onClick={handleClose} aria-label="Close" ref={closeButtonRef} type="button">
          <CloseIcon />
        </button>
      </header>

      {/* Whisper hairline: step progress */}
      <div className="rf-progress" aria-hidden="true">
        <div className={`rf-progress-fill${activeTab === 1 ? ' is-full' : ''}`} />
      </div>

      <div className="reservation-body" ref={bodyRef}>
        {activeTab === 0 && (
          <div className="reservation-panel" role="tabpanel">

            {/* Taste Box: V2: always shown in cart tab */}
            <div className={`rf-taste-card${tasteBoxInCart ? ' is-minimized' : ''}`}>
                <div className="rf-taste-head">
                  <div className="rf-taste-title">
                    <span className="rf-taste-chip-label">★ Taste Box</span>
                  </div>
                  <div className="rf-taste-thumbs">
                    {['alphonso', 'banganapalli', 'sendhooram'].map(id => {
                      const v = varieties.find(v => v.id === id);
                      return v ? (
                        <img key={id} className="rf-taste-thumb" src={v.image} alt={v.name} loading="lazy" decoding="async" />
                      ) : null;
                    })}
                  </div>
                </div>
                {!tasteBoxInCart && <div className="rf-taste-sep" />}
                <div className="rf-taste-body" style={tasteBoxInCart ? { paddingTop: 0 } : {}}>
                  {!tasteBoxInCart && (
                    <>
                      <div className="rf-taste-chips">
                        {sampleBox.items.map(item => {
                          const v = varieties.find(v => v.id === item.varietyId);
                          return v ? (
                            <span key={item.varietyId} className="rf-taste-item-chip">
                              <span className="rf-taste-item-qty">{item.count}×</span>
                              <span className="rf-taste-item-name">{v.name}</span>
                            </span>
                          ) : null;
                        })}
                      </div>
                      <p className="rf-taste-desc">Most customers end up ordering 3 kg+ after this. Six mangoes to find yours.</p>
                    </>
                  )}
                  <div className="rf-taste-footer" style={tasteBoxInCart ? { paddingTop: 0, border: 'none' } : {}}>
                    <span className="rf-taste-price">₹{sampleBox.price}</span>
                    {tasteBoxInCart ? (
                      <div className="rf-taste-added-state">
                        <button 
                          className="rf-taste-add is-added" 
                          type="button"
                          style={{ cursor: 'default' }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M5 12l5 5L19 7" />
                          </svg>
                          Added
                        </button>
                        <button className="rf-taste-added-remove" onClick={handleRemoveSampleBox} type="button">
                          Remove
                        </button>
                      </div>
                    ) : (
                      <button className="rf-taste-add" onClick={handleAddSampleBox} type="button">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            
            {/* Variety list: Option 5: circular thumbs, ghost Add → green qty */}
            <p className="rf-sec-label">Choose Varieties</p>
            <div className="rf-variety-list">
              {varieties.map((variety) => {
                const kg = cart[variety.id] ?? 0;
                return (
                  <div key={variety.id} className="rf-variety-row">
                    <img
                      className="rf-variety-thumb"
                      src={variety.image}
                      alt={variety.alt}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="rf-variety-info">
                      <div className="rf-variety-name">{variety.name}</div>
                      {siteConfig.promotion?.active && siteConfig.promotion.overrides[variety.id] ? (
                        <div className="rf-variety-price-row">
                          <span className="rf-variety-original">
                            {formatCurrency(siteConfig.promotion.overrides[variety.id].originalPrice)}
                          </span>
                          <span className="rf-variety-price">{formatCurrency(variety.pricePerKg)}/kg</span>
                          <span className="offer-chip" style={{ fontSize: '9px', padding: '1px 6px 2px 4px' }}>
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                              <line x1="7" y1="7" x2="7.01" y2="7"/>
                            </svg>
                            OFFER
                          </span>
                        </div>
                      ) : (
                        <div className="rf-variety-price">{formatCurrency(variety.pricePerKg)}/kg</div>
                      )}
                    </div>
                    {kg === 0 ? (
                      <button
                        className="rf-variety-add"
                        onClick={() => updateQuantity(variety.id, 1)}
                        aria-label={`Add ${variety.name}`}
                        type="button"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        Add
                      </button>
                    ) : (
                      <div className="rf-variety-qty" aria-label={`${variety.name} quantity in kg`}>
                        <button
                          className="rf-qty-btn"
                          onClick={() => updateQuantity(variety.id, -1)}
                          aria-label={`Remove 1 kg of ${variety.name}`}
                          type="button"
                        >
                          −
                        </button>
                        <span className="rf-qty-val" aria-live="polite">{kg} kg</span>
                        <button
                          className="rf-qty-btn"
                          onClick={() => updateQuantity(variety.id, 1)}
                          disabled={kg >= 10}
                          aria-label={`Add 1 kg of ${variety.name}`}
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="reservation-panel" role="tabpanel">

            {/* Name — standalone card */}
            <div className={`rf-field-card${activeField === 'name' ? ' is-active' : ''}`}>
              <div className="rf-fl-row">
                <input
                  ref={nameInputRef}
                  id="customer-name"
                  type="text"
                  className="rf-fl-input"
                  placeholder=" "
                  autoComplete="name"
                  value={customerDetails.name}
                  onChange={(e) => updateCustomerField('name', e.target.value)}
                />
                <label className="rf-fl-label" htmlFor="customer-name">Full Name</label>
              </div>
            </div>

            {/* Address — unified card, dense rows */}
            <div className={`rf-field-card${['flat', 'addressLine1', 'pin'].includes(activeField) ? ' is-active' : ''}`}>
              <div className="rf-fl-row">
                <input
                  id="customer-flat"
                  type="text"
                  className="rf-fl-input"
                  placeholder=" "
                  autoComplete="address-line1"
                  value={customerDetails.flat}
                  onChange={(e) => updateCustomerField('flat', e.target.value)}
                />
                <label className="rf-fl-label" htmlFor="customer-flat">Flat / Building</label>
              </div>
              <div className="rf-fl-row">
                <input
                  id="customer-address1"
                  type="text"
                  className="rf-fl-input"
                  placeholder=" "
                  autoComplete="address-line2"
                  value={customerDetails.addressLine1}
                  onChange={(e) => updateCustomerField('addressLine1', e.target.value)}
                />
                <label className="rf-fl-label" htmlFor="customer-address1">Street / Area</label>
              </div>
              <div className="rf-fl-row">
                <input
                  id="customer-address2"
                  type="text"
                  className="rf-fl-input"
                  placeholder=" "
                  autoComplete="address-level3"
                  value={customerDetails.addressLine2}
                  onChange={(e) => updateCustomerField('addressLine2', e.target.value)}
                />
                <label className="rf-fl-label" htmlFor="customer-address2">
                  Landmark{' '}
                  <span className="rf-field-optional">(optional)</span>
                </label>
              </div>
              {/* City + PIN — 2 columns */}
              <div className="rf-field-row-split">
                <div className="rf-fl-row">
                  <input
                    id="customer-city"
                    type="text"
                    className="rf-fl-input"
                    placeholder=" "
                    autoComplete="address-level2"
                    value={customerDetails.city}
                    onChange={(e) => updateCustomerField('city', e.target.value)}
                  />
                  <label className="rf-fl-label" htmlFor="customer-city">City</label>
                </div>
                <div className={`rf-fl-row${customerDetails.pin.length === 6 && !/^[1-9][0-9]{5}$/.test(customerDetails.pin) ? ' rf-fl-row--error' : ''}`}>
                  <input
                    id="customer-pin"
                    type="text"
                    className="rf-fl-input"
                    inputMode="numeric"
                    placeholder=" "
                    maxLength={6}
                    autoComplete="postal-code"
                    value={customerDetails.pin}
                    onChange={(e) => updateCustomerField('pin', e.target.value.replace(/\D/g, ''))}
                  />
                  <label className="rf-fl-label" htmlFor="customer-pin">PIN Code</label>
                  {customerDetails.pin.length === 6 && !/^[1-9][0-9]{5}$/.test(customerDetails.pin) && (
                    <span className="rf-field-error">Invalid PIN code</span>
                  )}
                </div>
              </div>
              <div className="rf-fl-row">
                <input
                  id="customer-state"
                  type="text"
                  className="rf-fl-input"
                  placeholder=" "
                  autoComplete="address-level1"
                  value={customerDetails.state}
                  onChange={(e) => updateCustomerField('state', e.target.value)}
                />
                <label className="rf-fl-label" htmlFor="customer-state">State</label>
              </div>
            </div>

            {/* Notes — hidden by default */}
            {!showNotes ? (
              <button className="rf-add-note-btn" type="button" onClick={() => setShowNotes(true)}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add a note
              </button>
            ) : (
              <div className="rf-field-card">
                <div className="rf-field-row">
                  <label className="rf-field-label" htmlFor="customer-notes">Note</label>
                  <textarea
                    id="customer-notes"
                    className="rf-field-input"
                    rows="2"
                    placeholder="Preferred contact time, gifting note..."
                    value={customerDetails.notes}
                    onChange={(e) => updateCustomerField('notes', e.target.value)}
                    autoFocus
                    style={{ resize: 'none', lineHeight: 1.5 }}
                  />
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      <div className="reservation-footer">

        {/* Item rows — always visible in tab 0; collapsible accordion in tab 1 */}
        {(cartLines.length > 0 || tasteBoxInCart) && (
          <>
            {/* Tab 0: show items directly, no collapse */}
            {activeTab === 0 && (
              <div className="rf-footer-items">
                {tasteBoxInCart && (
                  <div className="rf-footer-row">
                    <div className="rf-footer-row-left">
                      <div className="rf-footer-dot" />
                      <span className="rf-footer-name">Taste Box</span>
                      <span className="rf-footer-sep-dot">·</span>
                      <span className="rf-footer-qty">{sampleBox.items.reduce((s, i) => s + i.count, 0)} pcs</span>
                    </div>
                    <div className="rf-footer-row-right">
                      <span className="rf-footer-price-pill">{formatCurrency(sampleBox.price)}</span>
                      <button className="rf-footer-remove" onClick={handleRemoveSampleBox} type="button" aria-label="Remove Taste Box">×</button>
                    </div>
                  </div>
                )}
                {cartLines.map((line) => (
                  <div key={line.id} className="rf-footer-row">
                    <div className="rf-footer-row-left">
                      <div className="rf-footer-dot" />
                      <span className="rf-footer-name">{line.name}</span>
                      <span className="rf-footer-sep-dot">·</span>
                      <span className="rf-footer-qty">{line.kg} kg</span>
                    </div>
                    <span className="rf-footer-price-pill">{formatCurrency(line.subtotal)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 1: items collapse + always-visible billing breakdown */}
            {activeTab === 1 && (
              <>
                {/* Collapsible items list only — no delivery inside */}
                <div className={`rf-order-collapse${showOrderSummary ? ' is-open' : ''}`}>
                  <div className="rf-footer-items">
                    {tasteBoxInCart && (
                      <div className="rf-footer-row">
                        <div className="rf-footer-row-left">
                          <div className="rf-footer-dot" />
                          <span className="rf-footer-name">Taste Box</span>
                          <span className="rf-footer-sep-dot">·</span>
                          <span className="rf-footer-qty">{sampleBox.items.reduce((s, i) => s + i.count, 0)} pcs</span>
                        </div>
                        <div className="rf-footer-row-right">
                          <span className="rf-footer-price-pill">{formatCurrency(sampleBox.price)}</span>
                          <button className="rf-footer-remove" onClick={handleRemoveSampleBox} type="button" aria-label="Remove Taste Box">×</button>
                        </div>
                      </div>
                    )}
                    {cartLines.map((line) => (
                      <div key={line.id} className="rf-footer-row">
                        <div className="rf-footer-row-left">
                          <div className="rf-footer-dot" />
                          <span className="rf-footer-name">{line.name}</span>
                          <span className="rf-footer-sep-dot">·</span>
                          <span className="rf-footer-qty">{line.kg} kg</span>
                        </div>
                        <span className="rf-footer-price-pill">{formatCurrency(line.subtotal)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Toggle row */}
                <button
                  className="rf-order-toggle"
                  type="button"
                  onClick={() => setShowOrderSummary(p => !p)}
                  aria-expanded={showOrderSummary}
                  aria-label="View order details"
                >
                  <div className="rf-order-toggle-left">
                    <span className="rf-order-toggle-lbl">Your order</span>
                    <span className="rf-order-toggle-count">
                      {' · '}{totalItems + (tasteBoxInCart ? 1 : 0)} item{totalItems + (tasteBoxInCart ? 1 : 0) !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <svg className={`rf-order-chevron${showOrderSummary ? ' is-open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* Always-visible billing breakdown */}
                <div className="rf-billing-summary">
                  <div className="rf-billing-row">
                    <span className="rf-billing-lbl">Subtotal</span>
                    <span className="rf-billing-val">{formatCurrency(cartTotal + tasteBoxTotal)}</span>
                  </div>
                  <div className="rf-delivery-wrap">
                    <div className="rf-billing-row rf-billing-delivery">
                      <div className="rf-delivery-left">
                        <span>Packing &amp; Delivery</span>
                        <button
                          className={`rf-why-pill${showDeliveryInfo ? ' is-open' : ''}`}
                          type="button"
                          onClick={() => setShowDeliveryInfo(p => !p)}
                          aria-label="Why does delivery vary?"
                        >
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
                          </svg>
                          Why?
                        </button>
                      </div>
                      <span className="rf-billing-val rf-delivery-tbd">Varies by location</span>
                    </div>
                    {showDeliveryInfo && (
                      <div className="rf-delivery-inline">
                        Your mangoes travel straight from our Anaimalai orchard to your doorstep, hand-packed in protective trays, not a warehouse shelf. <strong>We charge only what the courier charges us, zero markup.</strong> The exact cost depends on your pincode and is confirmed over WhatsApp before you pay anything.
                      </div>
                    )}
                  </div>
                  <div className="rf-billing-row rf-billing-total">
                    <span className="rf-billing-lbl">Total</span>
                    <span className="rf-billing-val">{formatCurrency(cartTotal + tasteBoxTotal)} <span className="rf-plus-delivery">+ delivery</span></span>
                  </div>
                </div>

                <div className="rf-footer-sep" />
              </>
            )}
          </>
        )}

        {(totalItems > 0 || tasteBoxInCart) && (cartTotal + tasteBoxTotal) < MIN_ORDER_VALUE && (
          <div className="rf-min-nudge">
            <div className="rf-min-nudge-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <div className="rf-min-nudge-body">
              <div className="rf-min-nudge-main">
                Add {formatCurrency(MIN_ORDER_VALUE - (cartTotal + tasteBoxTotal))} more to continue
              </div>
              <div className="rf-min-nudge-sub">
                Minimum order is{' '}
                <span className="order-note-min">&#8377;{MIN_ORDER_VALUE}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 0 ? (
          (totalItems > 0 || tasteBoxInCart) && (
            <>
              <button className={`rf-cta rf-cta-bone${(cartTotal + tasteBoxTotal) < MIN_ORDER_VALUE ? ' is-disabled' : ''}`} onClick={() => switchTab(1)} disabled={(cartTotal + tasteBoxTotal) < MIN_ORDER_VALUE} type="button">
                <div className="rf-cta-left">
                  <span className="rf-cta-label">Next: Delivery Details</span>
                  <span className="rf-cta-arrow">→</span>
                </div>
                <span className="rf-cta-price">{formatCurrency(cartTotal + tasteBoxTotal)}</span>
              </button>
              <button className="rf-start-over" onClick={handleClear} type="button">Start over</button>
            </>
          )
        ) : (
          <>
            {/* Guarantee chip — Option E: border breath + text shimmer */}
            <div className="rf-guarantee-chip" aria-label="No payment now: reserve first">
              <div className="rf-guarantee-icon">
                <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8.5 12l2.2 2.2 4.8-4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="rf-guarantee-text">
                <span className="rf-guarantee-main">No payment now. Reserve first.</span>
                <span className="rf-guarantee-sub">We confirm availability, delivery charges &amp; details over WhatsApp.</span>
              </div>
            </div>

            <button
              className={`rf-cta rf-cta-green${disabledReason ? ' is-disabled' : ''}`}
              onClick={handleSendRequest}
              type="button"
              disabled={Boolean(disabledReason)}
            >
              <div className="rf-cta-left">
                <span className="btn-icon btn-icon-whatsapp rf-cta-wa-icon" aria-hidden="true"><WhatsAppIcon /></span>
                <span className="rf-cta-label">Reserve Now</span>
              </div>
              <span className="rf-cta-price">{formatCurrency(cartTotal + tasteBoxTotal)} <span className="rf-plus-delivery">+ delivery</span></span>
            </button>
            <button className="rf-start-over" onClick={handleClear} type="button">Start over</button>
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
    </div>
  );
}