import SectionReveal from './SectionReveal.jsx';
import { storyBullets } from '../content.jsx';

export default function Story() {
  return (
    <section className="section section-story" id="story">
      <div className="container">
        <SectionReveal as="header" className="section-head">
          <p className="eyebrow">The Legacy</p>
          <h2>Ten Years of Growing Mangoes Worth Remembering.</h2>
        </SectionReveal>

        <div className="story-bullets">
          {storyBullets.map((bullet, index) => (
            <SectionReveal as="article" className="story-bullet" key={bullet.title} delay={0.05 * index}>
              <span className="story-bullet-icon" aria-hidden="true">{bullet.icon}</span>
              <div className="story-bullet-content">
                <h3>{bullet.title}</h3>
                <p>{bullet.text}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
