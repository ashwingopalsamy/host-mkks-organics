import SectionReveal from './SectionReveal.jsx';
import LazyVideo from './LazyVideo.jsx';

export default function Maintenance() {
  const careSteps = [
    {
      id: 'traps',
      title: 'Strategic Insect Trapping',
      desc: 'Our commitment to zero synthetic pesticides is upheld by using harmless, species-specific insect traps. These careful interventions protect the harvest while allowing beneficial pollinators to continue their vital work uninterrupted.',
      media: '/assets/maintenance/care-process-4.webp',
      type: 'image',
    },
    {
      id: 'eco-control',
      title: 'Eco-Friendly Pheromones',
      desc: 'Instead of harmful chemical sprays, we deploy strategic, non-toxic pheromone traps across the orchard. This targeted approach safely draws away fruit flies without affecting the mangoes or the surrounding ecosystem.',
      media: '/assets/maintenance/care-process-2-opt.mp4',
      poster: '/assets/maintenance/care-process-2-poster.webp',
      type: 'video',
    },
    {
      id: 'floor-management',
      title: 'Orchard Floor Management',
      desc: "We carefully prune and clear the grass and fallen leaves directly beneath each tree's canopy. This thoughtful process prevents competitive weed growth and eliminates hiding spots for unwanted insects, keeping the soil healthy.",
      media: '/assets/maintenance/care-process-3-opt.mp4',
      poster: '/assets/maintenance/care-process-3-poster.webp',
      type: 'video',
    },
  ];

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
