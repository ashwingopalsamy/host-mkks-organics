/* eslint-disable react-refresh/only-export-components */
import { siteConfig } from './siteConfig.js';

export const varieties = [
  {
    id: 'imam-pasand',
    name: 'Imam Pasand',
    image: '/assets/images/var-imampasand-720.webp',
    imageSrcSet: '/assets/images/var-imampasand-480.webp 480w, /assets/images/var-imampasand-720.webp 720w',
    alt: 'Imam Pasand mangoes',
    description: 'Floral perfume up front, then silky sweetness that melts fast. The kind of mango that makes people pause after the first bite.',
    pricing: [
      { id: '1kg', weight: '1 kg', price: 250 },
      { id: '2kg', weight: '2 kg', price: 500 },
      { id: '5kg', weight: '5 kg', price: 1000 },
    ],
  },
  {
    id: 'banganapalli',
    name: 'Banganapalli',
    image: '/assets/images/var-banganapalli-720.webp',
    imageSrcSet: '/assets/images/var-banganapalli-480.webp 480w, /assets/images/var-banganapalli-720.webp 720w',
    alt: 'Banganapalli mangoes',
    description: 'Clean honeyed sweetness with a gentle citrus lift. Smooth, fiberless flesh that keeps you reaching for one more slice.',
    pricing: [
      { id: '1kg', weight: '1 kg', price: 120 },
      { id: '2kg', weight: '2 kg', price: 240 },
      { id: '5kg', weight: '5 kg', price: 500 },
    ],
  },
  {
    id: 'alphonso-reserve',
    name: 'Alphonso Reserve',
    image: '/assets/images/var-alphonso-720.webp',
    imageSrcSet: '/assets/images/var-alphonso-480.webp 480w, /assets/images/var-alphonso-720.webp 720w',
    alt: 'Alphonso mangoes',
    description: 'Deep saffron flesh, creamy body, balanced tang. Open the box and the aroma announces dessert before serving.',
    pricing: [
      { id: '1kg', weight: '1 kg', price: 150 },
      { id: '2kg', weight: '2 kg', price: 300 },
      { id: '5kg', weight: '5 kg', price: 650 },
    ],
  },
  {
    id: 'sendhooram',
    name: 'Sendhooram',
    image: '/assets/images/var-sendhooram-720.webp',
    imageSrcSet: '/assets/images/var-sendhooram-480.webp 480w, /assets/images/var-sendhooram-720.webp 720w',
    alt: 'Sendhooram mangoes',
    description: 'Bright sweet-tang pop with juicy aromatic flesh. A lively crowd-pleaser that disappears first at family tables.',
    pricing: [
      { id: '1kg', weight: '1 kg', price: 100 },
      { id: '2kg', weight: '2 kg', price: 200 },
      { id: '5kg', weight: '5 kg', price: 400 },
    ],
  },
];

export const MIN_ORDER_VALUE = siteConfig.minimumOrderValue;

export const philosophySteps = [
  {
    title: 'Decade-Long Soil Stewardship',
    description: 'For over 10 years, our soil in the Anaimalai foothills has never seen synthetic fertilizer. Organic compost and strict soil-rest cycles build healthier roots and better natural flavour.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 17c3.5 0 5-2.5 9-2.5S17.5 17 21 17" />
        <path d="M7 14V7m5 7V5m5 9V8" />
      </svg>
    ),
  },
  {
    title: 'Absolute Tree Ripening',
    description: 'A great mango cannot be rushed. Every fruit stays on the branch until natural maturity, free from calcium carbide and ethylene gas, so sugars and aroma develop fully.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 4c4.5 0 8 3.3 8 7.5S16.5 19 12 19s-8-3.3-8-7.5S7.5 4 12 4Z" />
        <path d="M12 8v7m-3-3h6" />
      </svg>
    ),
  },
  {
    title: 'Meticulous Hand Harvest',
    description: 'Each fruit is hand-harvested with stem intact by trained farm hands. This careful small-batch process minimizes bruising and protects texture at the table.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M6 12c0-2.5 2-4.5 4.5-4.5h3C16 7.5 18 9.5 18 12s-2 4.5-4.5 4.5h-3C8 16.5 6 14.5 6 12Z" />
        <path d="M12 7v10" />
      </svg>
    ),
  },
  {
    title: 'Pristine Direct Dispatch',
    description: 'Harvested, packed, and dispatched within hours from our orchard to your city, so each mango reaches you fragrant, fresh, and ready to impress.',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3.5" y="7" width="17" height="10" rx="2" />
        <path d="M8 17v2m8-2v2M3.5 11h17" />
      </svg>
    ),
  },
];

export const benefits = [
  {
    title: 'Farm-Direct',
    description: 'From our 10-acre estate directly to your door. No middlemen, less delay, and fruit that tastes alive instead of tired.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 12.5 9.5 18 20 7.5" />
      </svg>
    ),
  },
  {
    title: 'Seasonal Only',
    description: 'Available only in the natural harvest window. The wait pays off in sweeter fruit, fuller aroma, and better bite.',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l2.6 2.1" />
      </svg>
    ),
  },
  {
    title: 'Fully Transparent',
    description: 'Our process is open from soil inputs to dispatch. You know exactly how your mangoes were grown, ripened, and handled.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M6 12.5h12M6 8.5h12M6 16.5h8" />
      </svg>
    ),
  },
  {
    title: 'Careful Packing',
    description: 'Each mango is cushioned and packed in small batches, protecting skin and softness so it arrives ready for a perfect slice.',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3.5" y="7" width="17" height="10" rx="2" />
        <path d="M3.5 11h17M8 17v2m8-2v2" />
      </svg>
    ),
  },
];

export const galleryImages = [
  { src: '/assets/images/gallery-orchard-new-1.webp', alt: 'Orchard detail', w: 900, h: 1600 },
  { src: '/assets/images/gallery-orchard-new-2.webp', alt: 'Mango cluster', w: 1200, h: 1600 },
  { src: '/assets/images/gallery-orchard-new-3.webp', alt: 'Dense orchard canopy', w: 1600, h: 900 },
  { src: '/assets/images/gallery-orchard-new-4.webp', alt: 'Low angle orchard view', w: 1200, h: 1600 },
  { src: '/assets/images/gallery-orchard-new-5.webp', alt: 'Mango processing', w: 1600, h: 1200 },
  { src: '/assets/images/gallery-orchard-new-6.webp', alt: 'Mango farm worker', w: 1600, h: 1200 },
];

export const whatsappLink = siteConfig.inquiryWhatsAppUrl;
export const whatsappReserveLink = `https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent('Hello MKKS Organics, please share availability and pricing for this season.')}`;
export const whatsappFloatLink = `https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent("Hello MKKS Organics, I want to book this season's mangoes.")}`;
export const phoneNumber = siteConfig.phoneNumberE164;
export const phoneDisplay = siteConfig.phoneDisplay;
export const mapsLink = siteConfig.mapsUrl;
export const mapEmbed = 'https://www.google.com/maps?q=10.6014675,76.8596599&output=embed';
export const emailAddress = siteConfig.email;
export const instagramHandle = siteConfig.instagramHandle;
export const instagramLink = siteConfig.instagramUrl;

/* Season dates (client-side indicator) */
export const seasonStart = new Date(siteConfig.seasonStart);
export const seasonEnd = new Date(siteConfig.seasonEnd);

/* Maintenance / Care Steps */
export const careSteps = [
  {
    id: 'traps',
    title: 'Strategic Insect Trapping',
    desc: 'Colour-tuned sticky panels and light traps are placed at canopy height to intercept leaf-miners and stem borers before they reach the fruit. Every trap is positioned to avoid contact with pollinating bees and butterflies.',
    media: '/assets/maintenance/care-process-4.webp',
    type: 'image',
  },
  {
    id: 'eco-control',
    title: 'Targeted Pheromone Lures',
    desc: 'Species-specific pheromone capsules mimic fruit-fly mating signals, drawing males into sealed collectors before they can damage a single mango. The lure is biological, residue-free, and invisible to every other orchard visitor.',
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
