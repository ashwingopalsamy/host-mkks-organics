import SectionReveal from './SectionReveal.jsx';
import LazyVideo from './LazyVideo.jsx';

export default function Story() {
  return (
    <section className="section section-story" id="story">
      <div className="container split-layout">
        <SectionReveal as="article" className="story-copy" direction="left" delay={0.1}>
          <p className="eyebrow">The Legacy</p>
          <h2>Ten Years of Growing Mangoes Worth Remembering.</h2>
          <p>
            Started by Mr. Chandraprabhu Sundaramoorthy, our 10-acre estate in
            the Anaimalai foothills was built around one idea: mangoes should taste as memorable as they
            look. Every season, we grow for flavour first, not speed.
          </p>
          <p>
            Zero synthetic chemicals. Zero artificial ripening. No shortcuts. Just clean, organic
            fruit left on the tree until the sweetness deepens and the aroma opens up naturally.
          </p>
        </SectionReveal>

        <SectionReveal as="figure" className="story-image" direction="right" delay={0.2}>
          <LazyVideo
            src="/assets/videos/story-legacy-720.mp4"
            poster="/assets/videos/story-legacy-poster.webp"
            ariaLabel="Organic mango farm landscape in Pollachi"
            style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
          />
        </SectionReveal>
      </div>
    </section>
  );
}
