import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * SectionReveal — fades and slides content into view when it enters the viewport.
 * Uses Framer Motion's useInView for a lightweight, performant scroll-reveal.
 */
export default function SectionReveal({
  children,
  className = '',
  as = 'div',
  direction = 'up',
  delay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });

  const yStart = direction === 'left' ? 0 : direction === 'right' ? 0 : 24;
  const xStart = direction === 'left' ? -24 : direction === 'right' ? 24 : 0;

  const Component = motion[as] || motion.div;

  return (
    <Component
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: yStart, x: xStart }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: yStart, x: xStart }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Component>
  );
}
