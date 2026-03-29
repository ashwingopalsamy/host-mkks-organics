import { useRef, useEffect } from 'react';
import { usePostHog } from '@posthog/react';
import { storyBullets } from '../content.jsx';
import { useSectionTracker } from '../analytics.js';

export default function Story() {
  const sectionRef = useRef(null);
  const posthog = usePostHog();

  // Virtual page view: section 'story' → path '/story'
  useSectionTracker('story', sectionRef, posthog);

  // Track individual story card views — fires once per card, per session
  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.story-card');
    if (!cards?.length) return;

    const fired = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const title = entry.target.querySelector('.story-card-title')?.textContent || 'unknown';
            const idx = Array.from(cards).indexOf(entry.target);
            const key = `card_${idx}`;
            if (!fired.has(key)) {
              fired.add(key);
              posthog?.capture('story_card_viewed', {
                card_index: idx + 1,
                card_title: title,
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="section-story" id="story" ref={sectionRef}>
      <header className="story-header">
        <p className="eyebrow">The Legacy</p>
        <h2>Ten Years of Growing Mangoes Worth Remembering.</h2>
      </header>

      <div className="story-cards">
        {storyBullets.map((bullet, index) => (
          <article className="story-card" key={bullet.title}>
            <img
              className="story-card-img"
              src={bullet.image}
              alt={bullet.title}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <div className="story-card-body">
              <div className="story-card-head">
                <span
                  className={`story-icon${bullet.iconGreen ? ' story-icon--green' : ''}`}
                  aria-hidden="true"
                >
                  {bullet.icon}
                </span>
                <h3 className="story-card-title">{bullet.title}</h3>
              </div>
              <p className="story-card-copy">{bullet.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}