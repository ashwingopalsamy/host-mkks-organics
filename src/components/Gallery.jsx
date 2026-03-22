import { galleryImages } from '../content.jsx';

export default function Gallery() {
  return (
    <section className="section section-gallery" id="gallery">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">From the Orchard ✦ The Legacy</p>
          <h2>Where Flavour Begins</h2>
          <p className="section-intro">
            Bloom to ripening, this is the cycle behind the sweetness, fragrance, and soft texture
            you taste at home.
          </p>
        </header>

        <div className="carousel gallery-carousel">
          {galleryImages.map((img) => (
            <figure key={img.src} className="gallery-item carousel-item">
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

        <div className="swipe-hint">
          <span className="swipe-hint-inner" aria-hidden="true">← Swipe →</span>
        </div>
      </div>
    </section>
  );
}
