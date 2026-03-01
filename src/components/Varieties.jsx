import SectionReveal from './SectionReveal.jsx';
import { varieties } from '../data/content.jsx';

export default function Varieties() {
  return (
    <section className="section section-varieties" id="varieties">
      <div className="container">
        <SectionReveal as="header" className="section-head">
          <h2>Pick Your Favourite Bite</h2>
          <p className="eyebrow">The Collection</p>
          <p className="section-intro">
            Every variety has a distinct flavour profile. We harvest only at natural maturity so
            sweetness, aroma, and texture land exactly right.
          </p>
        </SectionReveal>

        <div className="variety-grid">
          {varieties.map((v) => (
            <article key={v.name} className="variety-card">
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
