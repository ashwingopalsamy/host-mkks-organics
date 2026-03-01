import SectionReveal from './SectionReveal.jsx';

export default function Story() {
  return (
    <section className="section section-story" id="story">
      <div className="container split-layout">
        <SectionReveal as="article" className="story-copy" direction="left" delay={0.1}>
          <p className="eyebrow">The Legacy</p>
          <h2>10 Years of Uncompromising Purity.</h2>
          <p>
            Pioneered by Mr. Chandraprabhu Sundaramoorthy over a decade ago, our 10-acre estate in 
            Marappagoundenpudhur rests in the mist-touched Anaimalai foothills. What began as a 
            personal mission has become the gold standard for premium, fertilizer-free agriculture.
          </p>
          <p>
            We believe true luxury is crafted by nature and guarded by strict discipline. 
            Zero synthetic chemicals. Zero artificial ripening. Absolutely no shortcuts. 
            Just impeccably clean, organic mangoes matured exactly as we would serve at our own table.
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
