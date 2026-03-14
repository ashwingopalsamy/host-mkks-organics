/* eslint-disable react-refresh/only-export-components */
import { siteConfig } from './siteConfig.js';

export const varieties = [
  {
    id: 'alphonso',
    name: 'Alphonso',
    pricePerKg: 130,
    image: '/images/var-alphonso-720.webp',
    imageSrcSet: '/images/var-alphonso-480.webp 480w, /images/var-alphonso-720.webp 720w',
    alt: 'Alphonso mangoes',
    description: 'Deep saffron flesh, creamy body, balanced tang. Open the box and the aroma announces dessert before serving.',
  },
  {
    id: 'banganapalli',
    name: 'Banganapalli',
    pricePerKg: 80,
    image: '/images/var-banganapalli-720.webp',
    imageSrcSet: '/images/var-banganapalli-480.webp 480w, /images/var-banganapalli-720.webp 720w',
    alt: 'Banganapalli mangoes',
    description: 'Clean honeyed sweetness with a gentle citrus lift. Smooth, fiberless flesh that keeps you reaching for one more slice.',
  },
  {
    id: 'sendhooram',
    name: 'Sendhooram',
    pricePerKg: 80,
    image: '/images/var-sendhooram-720.webp',
    imageSrcSet: '/images/var-sendhooram-480.webp 480w, /images/var-sendhooram-720.webp 720w',
    alt: 'Sendhooram mangoes',
    description: 'Bright sweet-tang pop with juicy aromatic flesh. A lively crowd-pleaser that disappears first at family tables.',
  },
  {
    id: 'imam-pasand',
    name: 'Imam Pasand',
    pricePerKg: 200,
    image: '/images/var-imampasand-720.webp',
    imageSrcSet: '/images/var-imampasand-480.webp 480w, /images/var-imampasand-720.webp 720w',
    alt: 'Imam Pasand mangoes',
    description: 'Floral perfume up front, then silky sweetness that melts fast. The kind of mango that makes people pause after the first bite.',
  },
];

export const MIN_ORDER_VALUE = siteConfig.minimumOrderValue;

export const varietyBadges = {
  'imam-pasand': 'Most Popular',
  'sendhooram': 'Best Value',
};

export const sampleBox = {
  name: 'Taste Box',
  description: '1 kg each — Banganapalli, Sendhooram, Alphonso & Imam Pasand',
  price: 250,  // bundle price; at per-kg rates total is ₹490 (1×₹80 + 1×₹80 + 1×₹130 + 1×₹200)
  items: [
    { varietyId: 'banganapalli', kg: 1 },
    { varietyId: 'sendhooram',   kg: 1 },
    { varietyId: 'alphonso',     kg: 1 },
    { varietyId: 'imam-pasand',  kg: 1 },
  ],
};

export const storyBullets = [
  {
    title: 'Decade of Organic Stewardship',
    text: '10+ years of zero synthetic fertilizers. Compost-fed soil in the Anaimalai foothills builds deeper roots and richer flavour.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20h10" />
        <path d="M10 20c5.5-2.5.8-6.4 3-10" />
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
      </svg>
    ),
  },
  {
    title: 'Tree-Ripened, Zero Chemical',
    text: 'Every fruit stays on the branch until natural maturity. No calcium carbide, no ethylene gas, no shortcuts.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4c4.5 0 8 3.3 8 7.5S16.5 19 12 19s-8-3.3-8-7.5S7.5 4 12 4Z" />
        <path d="M12 8v7m-3-3h6" />
      </svg>
    ),
  },
  {
    title: 'Farm-Direct, Same-Day Dispatch',
    text: 'Hand-harvested, packed, and dispatched within hours from our 10-acre estate straight to your door.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="7" width="17" height="10" rx="2" />
        <path d="M8 17v2m8-2v2M3.5 11h17" />
      </svg>
    ),
  },
];

export const galleryImages = [
  { src: '/images/gallery-orchard-new-1.webp', alt: 'Orchard detail', w: 900, h: 1600 },
  { src: '/images/gallery-orchard-new-2.webp', alt: 'Mango cluster', w: 1200, h: 1600 },
  { src: '/images/gallery-orchard-new-3.webp', alt: 'Dense orchard canopy', w: 1600, h: 900 },
  { src: '/images/gallery-orchard-new-4.webp', alt: 'Low angle orchard view', w: 1200, h: 1600 },
  { src: '/images/gallery-orchard-new-5.webp', alt: 'Mango processing', w: 1600, h: 1200 },
  { src: '/images/gallery-orchard-new-6.webp', alt: 'Mango farm worker', w: 1600, h: 1200 },
];

export const careSteps = [
  {
    id: 'traps',
    title: 'Strategic Insect Trapping',
    desc: 'Colour-tuned sticky panels and light traps are placed at canopy height to intercept leaf-miners and stem borers before they reach the fruit. Every trap is positioned to avoid contact with pollinating bees and butterflies.',
    media: '/images/care-process-4.webp',
    type: 'image',
  },
  {
    id: 'eco-control',
    title: 'Targeted Pheromone Lures',
    desc: 'Species-specific pheromone capsules mimic fruit-fly mating signals, drawing males into sealed collectors before they can damage a single mango. The lure is biological, residue-free, and invisible to every other orchard visitor.',
    media: '/images/care-process-2-opt.mp4',
    poster: '/images/care-process-2-poster.webp',
    type: 'video',
  },
  {
    id: 'floor-management',
    title: 'Orchard Floor Management',
    desc: "We carefully prune and clear the grass and fallen leaves directly beneath each tree's canopy. This thoughtful process prevents competitive weed growth and eliminates hiding spots for unwanted insects, keeping the soil healthy.",
    media: '/images/care-process-3-opt.mp4',
    poster: '/images/care-process-3-poster.webp',
    type: 'video',
  },
];

export const whatsappReserveLink = `https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent('Hello MKKS Organics, please share availability and pricing for this season.')}`;
export const whatsappFloatLink = `https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent("Hello MKKS Organics, I want to book this season's mangoes.")}`;
export const phoneNumber = siteConfig.phoneNumberE164;
export const phoneDisplay = siteConfig.phoneDisplay;
export const mapsLink = siteConfig.mapsUrl;
export const instagramHandle = siteConfig.instagramHandle;
export const instagramLink = siteConfig.instagramUrl;
