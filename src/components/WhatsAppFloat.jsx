import { motion } from 'framer-motion';
import { whatsappFloatLink } from '../data/content.jsx';
import { WhatsAppIcon } from './icons.jsx';

export default function WhatsAppFloat({ hide }) {
  return (
    <motion.a
      className="whatsapp-float"
      href={whatsappFloatLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: hide ? 0 : 1,
        scale: hide ? 0.8 : 1,
        y: hide ? 20 : 0,
      }}
      transition={{
        duration: 0.35,
        delay: hide ? 0 : 1.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ pointerEvents: hide ? 'none' : 'auto' }}
    >
      <WhatsAppIcon aria-hidden="true" />
    </motion.a>
  );
}
