const whatsAppNumber = '919976759956';
const inquiryMessage = "Hello MKKS Organics, I'd like to know more about this season's mango collection.";

export const siteConfig = {
  brandName: 'MKKS Organics',
  orchardName: 'MKKS Organics Orchard',
  orchardLocation: 'Anaimalai Foothills, Pollachi, Tamil Nadu',
  phoneNumberE164: '+919976759956',
  phoneDisplay: '+91 99767 59956',
  whatsAppNumber,
  email: 'mkks.organics@gmail.com',
  instagramUrl: 'https://www.instagram.com/mkks.organics/',
  instagramHandle: '@mkks.organics',
  mapsUrl: 'https://maps.app.goo.gl/TH8UJBpJFkpxY5is5',
  schemaAddress: {
    locality: 'Pollachi',
    region: 'Tamil Nadu',
    country: 'IN',
  },
  seasonStart: '2026-03-15',
  seasonEnd: '2026-06-30',
  minimumOrderValue: 350,
  inquiryMessage,
  inquiryWhatsAppUrl: `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(inquiryMessage)}`,
};
