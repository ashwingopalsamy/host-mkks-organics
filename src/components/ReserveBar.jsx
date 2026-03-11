import { motion, AnimatePresence } from 'framer-motion';
import { WhatsAppIcon } from './icons.jsx';
import { varieties, MIN_ORDER_VALUE, phoneNumber as PHONE } from '../data/content.jsx';

function buildWhatsAppUrl(selections) {
  const lines = varieties
    .filter((v) => selections[v.name])
    .map((v) => {
      const s = selections[v.name];
      const qty = s.qty || 1;
      const lineTotal = s.price * qty;
      return qty > 1
        ? `• ${v.name} — ${s.weight} × ${qty} — ₹${lineTotal.toLocaleString('en-IN')}`
        : `• ${v.name} — ${s.weight} — ₹${lineTotal.toLocaleString('en-IN')}`;
    });

  const total = varieties.reduce((sum, v) => {
    const s = selections[v.name];
    return s ? sum + s.price * (s.qty || 1) : sum;
  }, 0);

  const text = [
    '🥭 New Order from MKKS Organics',
    '',
    ...lines,
    '',
    `Product Total: ₹${total.toLocaleString('en-IN')}`,
    '📦 Shipping charges will be calculated separately.',
    '',
    'Please share your name and delivery location to confirm.',
  ].join('\n');

  return `https://wa.me/${PHONE.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

export default function ReserveBar({ selections }) {
  const selected = varieties.filter((v) => selections[v.name]);
  const hasItems = selected.length > 0;

  const total = selected.reduce((sum, v) => {
    const s = selections[v.name];
    return sum + s.price * (s.qty || 1);
  }, 0);
  const belowMin = total < MIN_ORDER_VALUE;

  const summary = selected
    .map((v) => {
      const s = selections[v.name];
      const qty = s.qty || 1;
      return qty > 1 ? `${s.weight} ${v.name} ×${qty}` : `${s.weight} ${v.name}`;
    })
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
            <div className="reserve-info">
              <p className="reserve-summary">
                <span className="reserve-summary-label">Your Selection</span>
                <span className="reserve-summary-items">{summary}</span>
              </p>
              <p className={`reserve-total${belowMin ? ' is-below-min' : ''}`}>
                <span className="reserve-total-amount">₹{total.toLocaleString('en-IN')}</span>
                {belowMin && (
                  <span className="reserve-min-warn">
                    Min. order ₹{MIN_ORDER_VALUE}
                  </span>
                )}
              </p>
            </div>
            <a
              className="btn reserve-btn"
              href={buildWhatsAppUrl(selections)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="btn-icon btn-icon-whatsapp" aria-hidden="true">
                <WhatsAppIcon />
              </span>
              Reserve via WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
