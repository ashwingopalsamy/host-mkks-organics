# MKKS Organics Landing Page

A single-page, mobile-first, premium static landing page for an organic mango farm in Pollachi, Tamil Nadu.

## Stack
- HTML5
- CSS3
- Minimal vanilla JavaScript
- Local optimized WebP assets

## Project Structure
```text
host-mkks-organics/
├── assets/
│   └── images/
│       ├── gallery-bloom.webp
│       ├── gallery-branches.webp
│       ├── gallery-canopy.webp
│       ├── gallery-kachcha.webp
│       ├── gallery-orchard-1.webp
│       ├── gallery-orchard-2.webp
│       ├── hero-orchard-900.webp
│       ├── hero-orchard-1400.webp
│       ├── hero-orchard.webp
│       ├── story-farm-1000.webp
│       ├── story-farm.webp
│       ├── var-alphonso.webp
│       ├── var-banganapalli.webp
│       ├── var-imampasand.webp
│       └── var-malgova.webp
├── .gitignore
├── ATTRIBUTION.md
├── index.html
├── script.js
└── styles.css
```

## Local Preview
Run any static server from the project root.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Sections Included
- Immersive hero with cinematic orchard imagery and glass CTA panel
- Story split section
- Mango varieties glass-card grid
- Farming philosophy timeline
- Masonry-style gallery
- Why buy from us icon grid
- Contact decision section with phone, WhatsApp, and map embed
- Floating WhatsApp CTA

## SEO and Metadata Included
- Title and description
- Keywords:
  - `organic mango Pollachi`
  - `premium mango Tamil Nadu`
  - `farm direct mango South India`
- Open Graph metadata
- Twitter card metadata
- JSON-LD `LocalBusiness` schema

## Performance Notes
- WebP used for all images.
- Hero image has responsive `srcset` variants (900w, 1400w, 2200w).
- Below-the-fold images use `loading="lazy"` and `decoding="async"`.
- JS is lightweight (`script.js` is under 3 KB).
- CSS is loaded with preload + non-blocking pattern.
- Animations are lightweight and capped under 500ms for interactions.
- `prefers-reduced-motion` support is included.

## Contact Detail Placeholders
Update these in `index.html` before production launch:
- Phone number (`tel:` links)
- WhatsApp number (`wa.me` links)
- Farm name/address text if needed
- Domain-specific OG/Twitter image URLs (if your final domain requires absolute URLs)

## Deployment

### Vercel
1. Push this folder to a GitHub repository.
2. In Vercel, click **Add New Project** and import the repo.
3. Framework preset: **Other** (or no framework).
4. Build command: leave empty.
5. Output directory: `.`
6. Deploy.

### Netlify
1. Push this folder to a GitHub repository.
2. In Netlify, click **Add new site** -> **Import an existing project**.
3. Select the repository.
4. Build command: leave empty.
5. Publish directory: `.`
6. Deploy site.

### GitHub Pages
1. Push this folder to GitHub.
2. Open repo **Settings** -> **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Branch: `main`, folder: `/ (root)`.
5. Save and wait for GitHub Pages deployment URL.

## Attribution
Image source links are listed in `ATTRIBUTION.md`.
