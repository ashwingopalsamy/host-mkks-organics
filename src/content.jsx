/* eslint-disable react-refresh/only-export-components */
import { siteConfig } from './siteConfig.js';

export const varieties = [
  {
    id: 'alphonso',
    name: 'Alphonso',
    pricePerKg: 130,
    minQty: 2,
    image: '/images/var-alphonso-720.webp',
    imageSrcSet: '/images/var-alphonso-480.webp 480w, /images/var-alphonso-720.webp 720w',
    alt: 'Alphonso mangoes',
    description: 'Deep saffron flesh, creamy body, balanced tang. Open the box and the aroma announces dessert before serving.',
  },
  {
    id: 'banganapalli',
    name: 'Banganapalli',
    pricePerKg: 80,
    minQty: 3,
    image: '/images/var-banganapalli-720.webp',
    imageSrcSet: '/images/var-banganapalli-480.webp 480w, /images/var-banganapalli-720.webp 720w',
    alt: 'Banganapalli mangoes',
    description: 'Clean honeyed sweetness with a gentle citrus lift. Smooth, fiberless flesh that keeps you reaching for one more slice.',
  },
  {
    id: 'sendhooram',
    name: 'Sendhooram',
    pricePerKg: 80,
    minQty: 3,
    image: '/images/var-sendhooram-720.webp',
    imageSrcSet: '/images/var-sendhooram-480.webp 480w, /images/var-sendhooram-720.webp 720w',
    alt: 'Sendhooram mangoes',
    description: 'Bright sweet-tang pop with juicy aromatic flesh. A lively crowd-pleaser that disappears first at family tables.',
  },
  {
    id: 'imam-pasand',
    name: 'Imam Pasand',
    pricePerKg: 200,
    minQty: 2,
    image: '/images/var-imampasand-720.webp',
    imageSrcSet: '/images/var-imampasand-480.webp 480w, /images/var-imampasand-720.webp 720w',
    alt: 'Imam Pasand mangoes',
    description: 'Floral perfume up front, then silky sweetness that melts fast. The kind of mango that makes people pause after the first bite.',
  },
];

export const outOfStockVarieties = [
  { id: 'malgoa', name: 'Malgoa' },
  { id: 'kalapadi', name: 'Kalapadi' },
  { id: 'rumani', name: 'Rumani' },
  { id: 'kilimooku', name: 'Kilimooku' },
  { id: 'naducholai', name: 'Naducholai' },
  { id: 'nattukai', name: 'Nattukai' },
];

export const beyondMangoProducts = [
  { id: 'honey', name: 'Organic Natural Honey', subtitle: 'Raw, unprocessed, from our apiary', emoji: '\u{1F36F}' },
  { id: 'eggs', name: 'Country Chicken Eggs', subtitle: 'Naatukozhi muttai, free-range', emoji: '\u{1F95A}' },
];

export const MIN_ORDER_VALUE = siteConfig.minimumOrderValue;

export const sampleBox = {
  name: 'Taste Box',
  description: '3 varieties, 6 sun-ripened gems. The perfect seat at our table.',
  price: 250,
  items: [
    { varietyId: 'alphonso', count: 2 },
    { varietyId: 'banganapalli', count: 2 },
    { varietyId: 'sendhooram', count: 2 },
  ],
};

export const storyBullets = [
  {
    title: 'Decade of Organic Stewardship',
    text: 'A decade of zero synthetic fertilizers. Compost-fed soil in the Anaimalai foothills builds deeper roots and richer flavour.',
    image: '/images/gallery-orchard-new-1.webp',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20h10" />
        <path d="M10 20c5.5-2.5.8-6.4 3-10" />
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
      </svg>
    ),
  },
  {
    title: 'It Starts with the Blossom',
    text: 'Before a single mango forms, these cream flowers open across every branch. Bees, wind, no intervention. Each cluster that survives becomes a fruit. We don\'t rush this part, because we can\'t.',
    image: '/images/gallery-orchard-new-2.webp',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3m0 14v3M4.22 4.22l2.12 2.12m11.32 11.32 2.12 2.12M2 12h3m14 0h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
  },
  {
    title: 'Tree-Ripened, Zero Chemical',
    text: 'Every fruit stays on the branch until natural maturity. No calcium carbide, no ethylene gas, no shortcuts. What you see here stays here until the mango announces itself ready.',
    image: '/images/gallery-orchard-new-3.webp',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4c4.5 0 8 3.3 8 7.5S16.5 19 12 19s-8-3.3-8-7.5S7.5 4 12 4Z" />
        <path d="M12 8v7m-3-3h6" />
      </svg>
    ),
  },
  {
    title: 'Every Tree, the Same Standard',
    text: 'The same soil treatment, pruning schedule, and patience applied to every tree across our 10-acre estate. No premium plots. Consistency is the only way to guarantee what arrives at your door.',
    image: '/images/gallery-orchard-new-4.webp',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
  },
  {
    title: 'The Trap You Can See Is the Point',
    text: 'That red lure hanging from the branch is a pheromone trap: species-specific bait that draws fruit flies into a sealed collector before they reach the mango. Biological, residue-free. We show it because we have nothing to hide.',
    image: '/images/gallery-orchard-new-5.webp',
    iconGreen: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Farm-Direct, Same-Day Dispatch',
    text: 'Hand-harvested, packed, and dispatched within hours from our estate straight to your door. The clean grass beneath every tree isn\'t just aesthetic. Fallen fruit and overgrowth are where pests breed. We manage the floor so the fruit stays pure.',
    image: '/images/gallery-orchard-new-6.webp',
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