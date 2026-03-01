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
          <h1>Mangoes from the Anaimalai Foothills.</h1>
          <p className="hero-intro">
            Tree-ripened. Chemical-free. Hand-harvested at natural maturity and dispatched
            directly from our orchard near Marappagoundenpudhur.
          </p>

          <div className="hero-meta">
            <span className="pill">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 21s-6.5-5.3-6.5-11a6.5 6.5 0 1 1 13 0c0 5.7-6.5 11-6.5 11Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle cx="12" cy="10" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              Anaimalai Foothills, Pollachi
            </span>
          </div>

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
              Reserve This Season
            </a>
            <a
              className="btn btn-secondary"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
}
