import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { whatsappLink } from '../data/content.jsx';
import { WhatsAppIcon, CalendarCheckIcon } from './icons.jsx';

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
        <motion.picture
          style={{
            y: imageY,
            scale: imageScale,
            display: 'block',
            width: '100%',
            height: '100%',
          }}
        >
          <source
            type="image/webp"
            srcSet="/assets/images/hero-primary-600.webp 600w, /assets/images/hero-primary-900.webp 900w, /assets/images/hero-primary-1400.webp 1400w"
            sizes="100vw"
          />
          <img
            src="/assets/images/hero-primary-optimized.jpg"
            alt="Mango orchard in the Anaimalai foothills, Pollachi"
            fetchPriority="high"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.picture>
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
          <div className="hero-main">
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
                  <CalendarCheckIcon />
                </span>
                Reserve Mangoes
              </a>
              <a
                className="btn btn-whatsapp"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="btn-icon btn-icon-whatsapp" aria-hidden="true">
                  <WhatsAppIcon />
                </span>
                WhatsApp Us
              </a>
            </motion.div>
          </div>

          <aside className="hero-aside" aria-label="Farm highlights">
            <p className="hero-aside-label">From Our Estate</p>

            <figure className="hero-aside-media">
              <img
                src="/assets/images/aside-primary.webp"
                alt="MKKS Organics estate in the Anaimalai foothills"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="hero-aside-chip">Pollachi · Anaimalai Foothills</figcaption>
            </figure>

            <div className="hero-meta-grid" aria-label="Farm metrics">
              <article className="hero-meta">
                <p className="hero-meta-value">10+ Years</p>
                <p className="hero-meta-text">Organic stewardship</p>
              </article>
              <article className="hero-meta">
                <p className="hero-meta-value">10 Acres</p>
                <p className="hero-meta-text">Single-estate harvest</p>
              </article>
            </div>

            <p className="hero-aside-note">
              Hand-picked batches, clean-grown end to end, dispatched straight from our orchard.
            </p>
          </aside>
        </motion.article>
      </div>
    </section>
  );
}
