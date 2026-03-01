import SectionReveal from './SectionReveal.jsx';
import { galleryImages } from '../data/content.jsx';

export default function Gallery() {
  return (
    <section className="section section-gallery" id="gallery">
      <div className="container">
        <SectionReveal as="header" className="section-head">
          <p className="eyebrow">From the Orchard</p>
          <h2>Where Flavour Begins</h2>
          <p className="section-intro">
            Bloom to ripening, this is the cycle behind the sweetness, fragrance, and soft texture
            you taste at home.
          </p>
        </SectionReveal>

        <div className="gallery-grid">
          {galleryImages.map((img) => (
            <figure key={img.src} className="gallery-item">
              <img
                src={img.src}
                width={img.w}
                height={img.h}
                alt={img.alt}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
