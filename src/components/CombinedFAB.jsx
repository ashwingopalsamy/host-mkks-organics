import { whatsappFloatLink } from '../content.jsx';
import { WhatsAppIcon, ShoppingBagIcon } from './icons.jsx';

export default function CombinedFAB({ hide, onReserveClick }) {
  if (hide) return null;

  return (
    <div className="dual-fab">
      {/* Cart FAB — opens Reserve Mangoes form */}
      <button
        className="dual-fab-btn dual-fab-cart"
        onClick={(e) => onReserveClick?.(e.currentTarget)}
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
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}
