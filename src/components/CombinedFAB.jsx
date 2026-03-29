import { usePostHog } from '@posthog/react';
import { whatsappFloatLink } from '../content.jsx';
import { WhatsAppIcon, ShoppingBagIcon } from './icons.jsx';
import { trackEvent } from '../analytics.js';

export default function CombinedFAB({ hide, onReserveClick }) {
  const posthog = usePostHog();
  if (hide) return null;

  return (
    <div className="dual-fab">
      {/* Cart FAB — opens Reserve Mangoes form */}
      <button
        className="dual-fab-btn dual-fab-cart"
        onClick={(e) => {
          trackEvent('fab_reserve_click', { source: 'fab' }, posthog);
          onReserveClick?.(e.currentTarget);
        }}
        aria-label="Reserve Mangoes"
        type="button"
      >
        <ShoppingBagIcon />
      </button>

      {/* WhatsApp FAB */}
      <a
        className="dual-fab-btn dual-fab-wa"
        href={whatsappFloatLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={() => trackEvent('fab_whatsapp_click', { source: 'fab' }, posthog)}
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}
