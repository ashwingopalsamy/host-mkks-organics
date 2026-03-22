import { useCallback, useRef } from 'react';
import { ShoppingBagIcon, MapPinIcon } from './icons.jsx';

export default function Topbar({ onReserveClick, cartItemCount = 0 }) {
  const topbarRef = useRef(null);

  const handleOrderClick = useCallback(
    (e) => {
      if (cartItemCount > 0) {
        onReserveClick?.(e.currentTarget);
      } else {
        const section = document.querySelector('#varieties');
        if (!section) return;
        const offset = (topbarRef.current?.offsetHeight ?? 0) + 16;
        const y = section.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    },
    [cartItemCount, onReserveClick],
  );

  const handleContactClick = useCallback(() => {
    const section = document.querySelector('#contact');
    if (!section) return;
    const offset = (topbarRef.current?.offsetHeight ?? 0) + 16;
    const y = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, []);

  return (
    <header className="topbar-island" id="top" ref={topbarRef}>
      <div className="island-brand">
        <img
          className="island-logo"
          src="/images/mkks-organics-logo.png"
          width="320"
          height="320"
          alt="MKKS Organics logo"
        />
        <span className="island-name">MKKS Organics</span>
      </div>

      <span className="island-divider" aria-hidden="true" />

      <div className="island-actions">
        <button
          className="island-btn"
          onClick={handleOrderClick}
          aria-label={
            cartItemCount > 0
              ? `View cart (${cartItemCount} items)`
              : 'Browse mangoes'
          }
          type="button"
        >
          <ShoppingBagIcon />
          <span className="island-btn-label">Order</span>
          {cartItemCount > 0 && (
            <span className="island-badge">{cartItemCount}</span>
          )}
        </button>

        <button
          className="island-btn"
          onClick={handleContactClick}
          aria-label="Go to contact"
          type="button"
        >
          <MapPinIcon />
          <span className="island-btn-label">Contact</span>
        </button>
      </div>
    </header>
  );
}

