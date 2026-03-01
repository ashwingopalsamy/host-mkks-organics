import { motion } from 'framer-motion';
import SectionReveal from './SectionReveal.jsx';
import { galleryImages } from '../data/content.jsx';

const itemVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Gallery() {
  return (
    <section className="section section-gallery" id="gallery">
      <div className="container">
        <SectionReveal as="header" className="section-head">
          <p className="eyebrow">From the Orchard</p>
          <h2>Seasons in the Anaimalai Foothills</h2>
          <p className="section-intro">
            Bloom, growth, ripening, and canopy — an unfiltered view of the cycle that shapes every fruit.
          </p>
        </SectionReveal>

        <div className="gallery-grid">
          {galleryImages.map((img, i) => (
            <motion.figure
              key={img.src}
              className="gallery-item"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.06 }}
            >
              <img
                src={img.src}
                width={img.w}
                height={img.h}
                alt={img.alt}
                loading="lazy"
                decoding="async"
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
