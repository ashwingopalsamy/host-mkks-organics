import { motion } from 'framer-motion';
import SectionReveal from './SectionReveal.jsx';
import { varieties } from '../data/content.jsx';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Varieties() {
  return (
    <section className="section section-varieties" id="varieties">
      <div className="container">
        <SectionReveal as="header" className="section-head">
          <h2>Pick Your Favourite Bite, by Season</h2>
          <p className="eyebrow">The Collection</p>
          <p className="section-intro">
            Every variety has a distinct flavour profile and a short window. We harvest only at
            natural maturity so sweetness, aroma, and texture land exactly right.
          </p>
        </SectionReveal>

        <motion.div
          className="variety-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {varieties.map((v) => (
            <motion.article
              key={v.name}
              className="variety-card"
              variants={cardVariants}
            >
              <div className="variety-img-wrap">
                <img
                  src={v.image}
                  width="900"
                  height="675"
                  alt={v.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="variety-content">
                <h3>{v.name}</h3>
                <p>{v.description}</p>
                <p className="season-window">{v.season}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
