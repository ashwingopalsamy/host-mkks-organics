import { motion } from 'framer-motion';
import SectionReveal from './SectionReveal.jsx';
import { benefits } from '../data/content.jsx';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Benefits() {
  return (
    <section className="section section-benefits" id="why-us">
      <div className="container">
        <SectionReveal as="header" className="section-head">
          <p className="eyebrow">The Premium Standard</p>
          <h2>What Sets Us Apart</h2>
          <p className="section-intro">
            Built to protect the moment that matters most: the first slice, the first aroma, the
            first bite.
          </p>
        </SectionReveal>

        <motion.div
          className="benefit-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {benefits.map((b) => (
            <motion.article
              key={b.title}
              className="benefit-card"
              variants={cardVariants}
            >
              <span className="benefit-icon" aria-hidden="true">
                {b.icon}
              </span>
              <h3>{b.title}</h3>
              <p>{b.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
