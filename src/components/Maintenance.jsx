import { useRef } from 'react';
import { usePostHog } from '@posthog/react';
import { careSteps } from '../content.jsx';
import LazyVideo from './LazyVideo.jsx';
import { useSectionTracker } from '../analytics.js';

export default function Maintenance() {
  const sectionRef = useRef(null);
  const posthog = usePostHog();

  // Virtual page view: section 'maintenance' → path '/maintenance'
  useSectionTracker('maintenance', sectionRef, posthog);

  return (
    <section className="section section-maintenance" id="maintenance" ref={sectionRef}>
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">Meticulous Care</p>
          <h2>An Orchard Grown with Intention</h2>
          <p className="section-intro">
            Great mangoes don't happen by accident. See the daily dedication,
            natural soil building, and careful canopy management that makes
            our harvest exceptional.
          </p>
        </header>

        <div className="maintenance-cards">
          {careSteps.map((step, index) => (
            <article key={step.id} className="maintenance-card">
              <div className="maintenance-media">
                {step.type === 'video' ? (
                  <LazyVideo
                    src={step.media}
                    poster={step.poster}
                    aria-label={`Video demonstrating ${step.title.toLowerCase()}`}
                  />
                ) : (
                  <img
                    src={step.media}
                    alt={step.title}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <span className="maintenance-step-badge" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
              <div className="maintenance-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
