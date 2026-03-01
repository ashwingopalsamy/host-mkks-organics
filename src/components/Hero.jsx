import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { whatsappLink } from '../data/content.jsx';

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);

  return (
    <section className="hero" id="home" aria-label="Hero" ref={sectionRef}>
      <div className="hero-media" aria-hidden="true">
        <motion.img
          src="/assets/images/hero-orchard-1400.webp"
          srcSet="/assets/images/hero-orchard-900.webp 900w, /assets/images/hero-orchard-1400.webp 1400w, /assets/images/hero-orchard.webp 2200w"
          sizes="100vw"
          width="2200"
          height="1236"
          alt="Mango orchard canopy in Pollachi"
          fetchPriority="high"
          style={{
            y: imageY,
            scale: imageScale,
          }}
        />
      </div>

      <div className="container hero-content">
        <motion.article
          className="hero-panel"
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <p className="eyebrow">MKKS Organics · Pollachi</p>
          <h1>Organic Mangoes from the Orchards of the Anaimalai Foothills.</h1>
          <p className="hero-intro">
            A decade of uncompromising purity with zero synthetic fertilizers and zero chemical
            ripening. Hand-harvested from our 10-acre estate for rich aroma, deep sweetness, and a
            first-class experience.
          </p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <a className="btn btn-primary" href="#contact">
              <span className="btn-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect
                    x="3.5"
                    y="4.5"
                    width="17"
                    height="16"
                    rx="3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M8 3.2v3M16 3.2v3M3.5 9.4h17M8.6 14.2l2.1 2.1 4.8-4.7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Reserve This Season
            </a>
            <a
              className="btn btn-secondary"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="btn-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32">
                  <path
                    d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2.1 7L3 29l6.5-2c2 1.1 4.2 1.7 6.5 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3Zm0 23.5c-2 0-3.9-.6-5.5-1.6l-.4-.2-3.9 1.2 1.3-3.8-.3-.4c-1.2-1.8-1.8-3.8-1.8-5.9C5.4 10 10.1 5.4 16 5.4s10.6 4.6 10.6 10.4S21.9 26.5 16 26.5Zm5.8-7.8c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1c-2-.9-3.3-2.9-3.4-3.1-.2-.3 0-.5.1-.7s.3-.3.4-.5.2-.3.3-.5 0-.4 0-.5-.7-1.8-1-2.4c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.5 1 2.9 1.2 3.1c.1.2 2.1 3.4 5.1 4.6.7.3 1.3.5 1.7.6.7.2 1.4.1 1.9.1.6-.1 1.8-.8 2.1-1.5.3-.8.3-1.4.2-1.5s-.2-.2-.5-.3Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              WhatsApp Us
            </a>
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
}
