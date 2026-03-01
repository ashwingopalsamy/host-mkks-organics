import SectionReveal from './SectionReveal.jsx';

export default function Story() {
  return (
    <section className="section section-story" id="story">
      <div className="container split-layout">
        <SectionReveal as="article" className="story-copy" direction="left" delay={0.1}>
          <p className="eyebrow">The Legacy</p>
          <h2>Ten Years of Growing Mangoes Worth Remembering.</h2>
          <p>
            Started by Mr. Chandraprabhu Sundaramoorthy, our 10-acre estate in
            Marappagoundenpudhur was built around one idea: mangoes should taste as memorable as they
            look. Every season, we grow for flavour first, not speed.
          </p>
          <p>
            Zero synthetic chemicals. Zero artificial ripening. No shortcuts. Just clean, organic
            fruit left on the tree until the sweetness deepens and the aroma opens up naturally.
          </p>
        </SectionReveal>

        <SectionReveal as="figure" className="story-image" direction="right" delay={0.2}>
          <img
            src="/assets/images/story-farm-1000.webp"
            srcSet="/assets/images/story-farm-1000.webp 1000w, /assets/images/story-farm.webp 1500w"
            sizes="(max-width: 820px) 92vw, 42vw"
            width="1500"
            height="1125"
            alt="Organic mango farm landscape in Pollachi"
            loading="lazy"
            decoding="async"
          />
        </SectionReveal>
      </div>
    </section>
  );
}
