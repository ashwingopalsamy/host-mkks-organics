import SectionReveal from './SectionReveal.jsx';

export default function Story() {
  return (
    <section className="section section-story" id="story">
      <div className="container split-layout">
        <SectionReveal as="article" className="story-copy" direction="left" delay={0.1}>
          <p className="eyebrow">Our Origin</p>
          <h2>Where the Western Ghats Shape the Climate.</h2>
          <p>
            Our orchard sits in Marappagoundenpudhur, in the mist-touched foothills of the
            Anaimalai Hills near Pollachi. The Western Ghats regulate temperature, rainfall, and
            soil moisture — conditions that cannot be replicated elsewhere.
          </p>
          <p>
            We are a family stewardship, not a commercial operation. Every season is guided by one
            discipline: grow only what we would serve at our own table. No chemicals. No artificial
            ripening. No shortcuts.
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
