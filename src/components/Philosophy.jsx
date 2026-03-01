import SectionReveal from './SectionReveal.jsx';
import { philosophySteps } from '../data/content.jsx';

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

        <ol className="timeline-track" aria-label="Farming process">
          {philosophySteps.map((step) => (
            <li key={step.title} className="timeline-step">
              <span className="icon" aria-hidden="true">
                {step.icon}
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
