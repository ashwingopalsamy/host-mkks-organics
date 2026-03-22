import { storyBullets } from '../content.jsx';

export default function Story() {
  return (
    <section className="section-story" id="story">
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