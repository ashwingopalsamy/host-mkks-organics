import { seasonStart, seasonEnd } from '../data/content.jsx';

/**
 * SeasonBadge — client-side season indicator using hardcoded dates.
 * Shows contextual messaging based on current date relative to harvest season.
 */
export default function SeasonBadge() {
  const now = new Date();
  const msPerDay = 86_400_000;

  let label;
  let variant;

  if (now < seasonStart) {
    const days = Math.ceil((seasonStart - now) / msPerDay);
    label = days <= 1 ? 'Season opens tomorrow' : `Season opens in ${days} days`;
    variant = 'upcoming';
  } else if (now <= seasonEnd) {
    const weekNum = Math.ceil((now - seasonStart) / (7 * msPerDay));
    label = `Week ${weekNum} of harvest — order now`;
    variant = 'active';
  } else {
    label = 'Season ended — see you next year';
    variant = 'ended';
  }

  return (
    <div className={`season-badge season-badge--${variant}`} aria-live="polite">
      <span className="season-badge-dot" aria-hidden="true" />
      <span className="season-badge-text">{label}</span>
    </div>
  );
}
