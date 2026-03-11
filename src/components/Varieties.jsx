import SectionReveal from './SectionReveal.jsx';
import VarietyCard from './VarietyCard.jsx';
import { varieties, MIN_ORDER_VALUE } from '../data/content.jsx';

export default function Varieties({ onReserveClick }) {
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
            <SectionReveal as="div" key={v.name} delay={0.1}>
              <VarietyCard variety={v} />
            </SectionReveal>
          ))}
        </div>

        <SectionReveal as="div" className="reserve-cta-wrapper" delay={0.2} style={{ marginTop: '3rem', textAlign: 'center' }}>
          <button className="btn btn-primary" style={{ paddingInline: '2.5rem', minHeight: '3.5rem', fontSize: '1.05rem' }} onClick={onReserveClick}>
            Reserve Mangoes
          </button>
          <p className="reserve-note" style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Minimum order ₹{MIN_ORDER_VALUE} · Shipping calculated separately
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
