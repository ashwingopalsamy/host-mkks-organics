import { useState, useRef, useEffect } from 'react';
import { whatsappFloatLink, phoneNumber } from '../content.jsx';
import { WhatsAppIcon, PhoneIcon, CloseIcon } from './icons.jsx';

export default function CombinedFAB({ hide }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const fabRef = useRef(null);

  useEffect(() => {
    if (!isExpanded) return;
    const handleClickOutside = (e) => {
      if (fabRef.current && !fabRef.current.contains(e.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [isExpanded]);

  if (hide) return null;

  return (
    <div className={`combined-fab${isExpanded ? ' is-expanded' : ''}`} ref={fabRef}>
      {isExpanded && (
        <div className="fab-options">
          <a
            className="fab-option fab-whatsapp"
            href={whatsappFloatLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon />
            <span>WhatsApp</span>
          </a>
          <a
            className="fab-option fab-phone"
            href={`tel:${phoneNumber}`}
            aria-label="Call us"
          >
            <PhoneIcon />
            <span>Call</span>
          </a>
        </div>
      )}
      <button
        className="fab-trigger"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-label={isExpanded ? 'Close contact options' : 'Contact us'}
        type="button"
      >
        {isExpanded ? <CloseIcon /> : <WhatsAppIcon />}
      </button>
    </div>
  );
}
