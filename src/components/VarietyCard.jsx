export default function VarietyCard({ variety }) {
  const { name, description, image, imageSrcSet, alt, pricing } = variety;

  const varietyClass = `variety-${name.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <article className={`variety-card ${varietyClass}`}>
      <div className="variety-img-wrap">
        <img
          src={image}
          srcSet={imageSrcSet}
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
          width="900"
          height="675"
          alt={alt}
          loading="lazy"
          decoding="async"
        />
      </div>
      
      <div className="variety-content">
        <h3>{name}</h3>
        <p>{description}</p>

        <div className="variety-actions-list">
          {pricing.map((tier) => (
            <div key={tier.weight} className="tier-row is-catalog-only">
              <div className="tier-info">
                <span className="tier-weight">{tier.weight}</span>
                <span className="tier-price">₹{tier.price.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
