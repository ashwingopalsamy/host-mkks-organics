import SectionReveal from './SectionReveal.jsx';
import { benefits } from '../data/content.jsx';

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

        <div className="benefit-grid">
          {benefits.map((b) => (
            <article key={b.title} className="benefit-card">
              <span className="benefit-icon" aria-hidden="true">
                {b.icon}
              </span>
              <h3>{b.title}</h3>
              <p>{b.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
