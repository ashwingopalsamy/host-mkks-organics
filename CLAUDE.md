# MKKS Organics — AI Context

## What This Is

Static React/Vite storefront for MKKS Organics, a premium organic mango farm in Pollachi, Tamil Nadu (Anaimalai foothills). Customers browse mango varieties, build a cart, fill delivery details, and send a pre-formatted reservation request via WhatsApp. **No backend, no database, no authentication, no payments.** The entire ordering flow ends in `window.open(whatsAppUrl)`.

Deployed at: `https://mkksorganics.vercel.app` (Vercel static hosting).

---

## Stack

- React 19, Vite 7
- Framer Motion (animations, `AnimatePresence` for reservation form)
- CSS custom properties only - no Tailwind, no CSS modules, no styled-components
- Vercel static hosting (`vercel.json` present, no functions)

---

## Project Structure

```
src/
  App.jsx                   # Root - owns cart state, reservation open/close state
  main.jsx                  # Entry point
  index.css                 # All styles: design tokens + component rules
  components/
    Topbar.jsx              # Nav bar with cart count badge + Reserve CTA
    Hero.jsx                # Full-bleed hero with Reserve CTA
    VarietyAccordion.jsx    # Variety cards with qty selectors (shares cart with App)
    ReservationForm.jsx     # Full-page slide-in modal: Select tab + Delivery tab
    CartBar.jsx             # Sticky bottom bar, shown when cart has items
    CombinedFAB.jsx         # Floating action button (WhatsApp + Reserve), shown when cart is empty
    Story.jsx               # Farm story section
    Maintenance.jsx         # Organic care process section (pheromone lures, traps, floor mgmt)
    Gallery.jsx             # Photo gallery
    Contact.jsx             # Contact / find us section
    Footer.jsx
    SectionReveal.jsx       # IntersectionObserver scroll-reveal wrapper
    LazyVideo.jsx           # IntersectionObserver-based lazy video component
    icons.jsx               # Inline SVG icon components
  siteConfig.js             # SINGLE SOURCE OF TRUTH: brand name, phone, WhatsApp number,
                            #   email, Instagram, Maps URL, min order value, address
  content.jsx               # Page content: varieties array, pricing, badges, sample box,
                            #   story bullets, gallery images, care steps, computed links
  order.js                  # Pure functions: cart math, WhatsApp message builder
public/
  images/                   # Hero, variety, gallery, OG images (webp, responsive srcsets)
index.html                  # SEO meta, OG tags, schema.org LocalBusiness JSON-LD,
                            #   Google Fonts (Cormorant Garamond + Outfit)
```

---

## Cart Data Model

The cart lives in `App.jsx` as a plain object passed down as props:

```js
// Shape: { [varietyId]: kgQuantity }
// varietyId = slug from varieties[].id e.g. "imam-pasand"
const cart = {
  "imam-pasand": 3,   // 3 kg of Imam Pasand
  "alphonso": 2,       // 2 kg of Alphonso
}
```

- `varietyId`: slug from `varieties[].id` in `content.jsx`
- Value is kg ordered (integer 1–10). Key absent = not in cart.
- Cart is cleared on successful WhatsApp send.
- `order.js` contains all cart logic as pure functions - nothing stateful.

---

## Ordering Flow

1. User increments qty via `VarietyAccordion` or `ReservationForm` (Tab 0).
2. `CartBar` appears when `cart` has any entries; `CombinedFAB` hides.
3. `ReservationForm` opens as full-page modal (Framer Motion scale + opacity).
4. Tab 1 collects delivery details (`customerDetails` state, local to `ReservationForm`).
5. `buildWhatsAppMessage()` in `order.js` constructs the plain-text message.
6. "Send on WhatsApp" calls `window.open(whatsAppUrl, '_blank')`.
7. Fallback: if popup is blocked, tries `navigator.clipboard.writeText`, shows manual options.

Validation gate (`getDisabledReason`): requires at least one item, subtotal >= ₹300 (min order), name filled, address fields filled.

---

## Design System

All in `src/index.css`. Key tokens:

| Token | Value | Purpose |
|---|---|---|
| `--font-display` | Cormorant Garamond (serif) | Headings, luxury feel |
| `--font-body` | Outfit (sans) | Body text, UI labels |
| `--bg-base` | `#0d100a` | Page background (near-black) |
| `--bg-elevated` | `#161914` | Card/panel surface |
| `--bg-surface` | `#1c201a` | Interactive/hover surface |
| `--accent-mango` | `#d4a23a` | Primary CTA color |
| `--accent-leaf` | `#4a9b5a` | Secondary accent (organic/farm) |
| `--accent-earth` | `#a67c52` | Tertiary (earthen tones) |
| `--section-pad` | `clamp(4rem, 10vw, 8rem)` | Vertical section padding |
| `--container` | `min(1120px, 100% - gutter*2)` | Max-width container |

Design aesthetic: "Dark luxury estate — Cormorant Garamond + Outfit, luminance-model elevation, tight radii (max 12px containers), no box-shadows".

---

## Key Constraints

- **No backend.** Never introduce API calls, server functions, or external services beyond WhatsApp links.
- **No payment processing.** Pricing shown is indicative; final amount confirmed over WhatsApp.
- **Static deploy.** `vercel.json` has no rewrites or functions. Keep it that way.
- **Content is centralized.** All contact info lives in `siteConfig.js`. Pricing and copy live in `content.jsx`. Never hardcode phone numbers, prices, or brand strings in components.
- **Schema.org + OG tags** in `index.html` must stay in sync with `siteConfig.js` when contact details change. The two are not linked at build time.

---

## Content Update Guide

| What changed | Where to update |
|---|---|
| Phone / WhatsApp number | `src/siteConfig.js` + `index.html` (tel, schema.org) |
| Email / Instagram / Maps | `src/siteConfig.js` + `index.html` schema.org |
| Variety names, descriptions, pricing | `src/content.jsx` → `varieties` array |
| Minimum order value | `src/siteConfig.js` → `minimumOrderValue` |
| Sample/Popular Pack bundle | `src/content.jsx` → `sampleBox` |
| WhatsApp message format | `src/order.js` → `buildWhatsAppMessage()` |
| Farm story bullets | `src/content.jsx` → `storyBullets` |
| Gallery images | `src/content.jsx` → `galleryImages` + drop webp into `public/images/` |
| Organic care steps | `src/content.jsx` → `careSteps` |
| SEO / OG title / description | `index.html` head |

---

## Local Dev

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # Output: dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint
```

---

## Deployment

Vercel - import repo, framework preset: Vite, build: `npm run build`, output: `dist`. No env vars required.
