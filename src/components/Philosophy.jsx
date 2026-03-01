import { motion } from 'framer-motion';
import SectionReveal from './SectionReveal.jsx';
import { philosophySteps } from '../data/content.jsx';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const stepVariants = {
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

export default function Philosophy() {
  return (
    <section className="section section-philosophy" id="philosophy">
      <div className="container">
        <SectionReveal as="header" className="section-head">
          <p className="eyebrow">The Method</p>
          <h2>The Method Behind the Fruit</h2>
          <p className="section-intro">
            Every step protects flavour, texture, and traceability — from the soil to your table.
          </p>
        </SectionReveal>

        <motion.ol
          className="timeline-track"
          aria-label="Farming process"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {philosophySteps.map((step) => (
            <motion.li
              key={step.title}
              className="timeline-step"
              variants={stepVariants}
            >
              <span className="icon" aria-hidden="true">
                {step.icon}
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
