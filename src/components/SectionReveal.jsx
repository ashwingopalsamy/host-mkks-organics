import { useRef, useEffect, useState } from 'react';

/**
 * SectionReveal - fades and slides content into view when it enters the viewport.
 * Uses IntersectionObserver + CSS class toggle instead of Framer Motion for performance.
 */
export default function SectionReveal({
  children,
  className = '',
  as: Tag = 'div',
  direction = 'up',
  delay = 0,
  ...rest
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { rootMargin: '-60px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const dirClass = `reveal-${direction}`;
  const visClass = isVisible ? 'is-visible' : '';

  return (
    <Tag
      ref={ref}
      className={`reveal ${dirClass} ${visClass} ${className}`.trim()}
      style={delay > 0 ? { transitionDelay: `${delay}s` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
