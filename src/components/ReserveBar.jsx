import { motion, AnimatePresence } from 'framer-motion';
import { varieties, phoneNumber as PHONE } from '../data/content.jsx';

function buildWhatsAppUrl(quantities) {
  const lines = varieties
    .filter((v) => quantities[v.name] > 0)
    .map((v) => `• ${quantities[v.name]} kg ${v.name}`);

  const text = [
    'Hello MKKS Organics, I would like to reserve:',
    '',
    ...lines,
    '',
    'Please confirm availability and pricing.',
  ].join('\n');

  return `https://wa.me/${PHONE.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

export default function ReserveBar({ quantities }) {
  const selected = varieties.filter((v) => quantities[v.name] > 0);
  const hasItems = selected.length > 0;

  const summary = selected
    .map((v) => `${quantities[v.name]} kg ${v.name}`)
    .join(', ');

  return (
    <AnimatePresence>
      {hasItems && (
        <motion.div
          className="reserve-bar"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        >
          <div className="reserve-bar-inner">
            <p className="reserve-summary">
              <span className="reserve-summary-label">Your Selection</span>
              <span className="reserve-summary-items">{summary}</span>
            </p>
            <a
              className="btn reserve-btn"
              href={buildWhatsAppUrl(quantities)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="btn-icon btn-icon-whatsapp" aria-hidden="true">
                <svg viewBox="0 0 32 32">
                  <path
                    d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2.1 7L3 29l6.5-2c2 1.1 4.2 1.7 6.5 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3Zm0 23.5c-2 0-3.9-.6-5.5-1.6l-.4-.2-3.9 1.2 1.3-3.8-.3-.4c-1.2-1.8-1.8-3.8-1.8-5.9C5.4 10 10.1 5.4 16 5.4s10.6 4.6 10.6 10.4S21.9 26.5 16 26.5Zm5.8-7.8c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1c-2-.9-3.3-2.9-3.4-3.1-.2-.3 0-.5.1-.7s.3-.3.4-.5.2-.3.3-.5 0-.4 0-.5-.7-1.8-1-2.4c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.5 1 2.9 1.2 3.1c.1.2 2.1 3.4 5.1 4.6.7.3 1.3.5 1.7.6.7.2 1.4.1 1.9.1.6-.1 1.8-.8 2.1-1.5.3-.8.3-1.4.2-1.5s-.2-.2-.5-.3Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              Reserve via WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
