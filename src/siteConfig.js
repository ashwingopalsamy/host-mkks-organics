const whatsAppNumber = '919843715599';

export const siteConfig = {
  brandName: 'MKKS Organics',
  orchardName: 'MKKS Organics Orchard',
  phoneNumberE164: '+919843715599',
  phoneDisplay: '+91 98437 15599',
  whatsAppNumber,
  instagramUrl: 'https://www.instagram.com/mkks.organics/',
  instagramHandle: '@mkks.organics',
  mapsUrl: 'https://maps.app.goo.gl/TH8UJBpJFkpxY5is5',
  minimumOrderValue: 240,
  packagingDelivery: 50,
  promotion: {
    active: true,
    label: 'Season Starting Offer',
    subtitle: 'Prices dropped across all varieties',
    overrides: {
      alphonso:      { originalPrice: 150, offerPrice: 130 },
      banganapalli:  { originalPrice: 100, offerPrice: 80 },
      sendhooram:    { originalPrice: 100, offerPrice: 80 },
      'imam-pasand': { originalPrice: 250, offerPrice: 200 },
    },
  },
};
