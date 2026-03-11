# MKKS Organics Web App

Static React/Vite storefront for MKKS Organics. The site keeps the original premium orchard presentation and uses a client-side reservation flow that builds a structured WhatsApp request.

## Stack
- React 19
- Vite 7
- Framer Motion
- Static assets from `public/`
- Vercel static hosting

## Core Product Flow
1. Browse the landing page and mango varieties.
2. Open the reservation sheet from the hero, varieties section, or top bar.
3. Select mango quantities by pack size.
4. Enter delivery details.
5. Send a structured reservation request to WhatsApp.

No backend, database, authentication, or paid API is required.

## Project Structure
```text
src/
  App.jsx
  main.jsx
  index.css
  components/
  data/
  utils/
  test/
public/
  assets/
tests/
  e2e/
index.html
vercel.json
vite.config.js
vitest.config.js
playwright.config.js
```

## Key Source Files
- `src/data/content.jsx`: page content, varieties, contact links, season dates
- `src/data/siteConfig.js`: canonical brand and contact config
- `src/components/ReservationForm.jsx`: active reservation sheet UI
- `src/utils/order.js`: order math and WhatsApp message helpers

## Local Development
Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Preview the production build locally:

```bash
npm run build
npm run preview
```

## Quality Checks
Lint:

```bash
npm run lint
```

Unit tests:

```bash
npm run test:unit
```

End-to-end tests:

```bash
npm run test:e2e
```

## Deployment
### Vercel
1. Import the repository into Vercel.
2. Framework preset: `Vite`.
3. Build command: `npm run build`
4. Output directory: `dist`

The app is designed for static hosting and WhatsApp-based ordering only.

## Content Notes
- Canonical phone/WhatsApp number: `+91 99767 59956`
- Minimum order value: `₹350`
- Season dates are manually configured in `src/data/siteConfig.js`

## Maintenance Notes
- Keep schema/contact details in `index.html` aligned with `src/data/siteConfig.js`
- If varieties or pricing change, update `src/data/content.jsx`
- If the reservation message format changes, update `src/utils/order.js` and the associated tests
