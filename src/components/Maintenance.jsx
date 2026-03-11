import SectionReveal from './SectionReveal.jsx';
import LazyVideo from './LazyVideo.jsx';
import { careSteps } from '../data/content.jsx';

export default function Maintenance() {
  return (
    <section className="section section-maintenance" id="maintenance">
      <div className="container">
        <SectionReveal as="header" className="section-head">
          <p className="eyebrow">Meticulous Care</p>
          <h2>An Orchard Grown with Intention</h2>
          <p className="section-intro">
            Great mangoes don't happen by accident. See the daily dedication, 
            natural soil building, and careful canopy management that makes 
            our harvest exceptional.
          </p>
        </SectionReveal>

        <div className="maintenance-grid">
          {careSteps.map((step, index) => (
            <SectionReveal
              as="article"
              key={step.id}
              className={`maintenance-card ${step.span ? `span-${step.span}` : ''}`}
              delay={0.1 + index * 0.05}
            >
              <div className="maintenance-media">
                {step.type === 'video' ? (
                  <LazyVideo
                    src={step.media}
                    poster={step.poster}
                    ariaLabel={`Video demonstrating ${step.title.toLowerCase()}`}
                  />
                ) : (
                  <img
                    src={step.media}
                    alt={step.title}
                    width="900"
                    height="1200"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div className="maintenance-overlay" />
              </div>
              
              <div className="maintenance-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
