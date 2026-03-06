# Relocation For Dubai — v2.0

Dubai relocation authority platform for UK residents.

## Quick Start

```bash
npm install
npm run dev        # → http://localhost:3000
npm run build      # production build → /dist
npm run preview    # preview production build locally
```

## Pages

| File | Route | Purpose |
|---|---|---|
| `index.html` | `/` | Homepage — premium gateway |
| `start-here.html` | `/start-here` | 7-step relocation roadmap |
| `pillar-visas.html` | `/visas` | Visas & Residency (Pillar 1) |
| `pillar-business.html` | `/business-setup` | Business Setup (Pillar 2) |
| `pillar-banking.html` | `/banking` | Finance, Banking & Tax (Pillar 3) |
| `pillar-cost.html` | `/cost-of-living` | Cost of Living & Property (Pillar 4) |
| `about.html` | `/about` | About page |
| `contact.html` | `/contact` | Contact page |
| `privacy.html` | `/privacy` | Privacy policy |
| `disclaimer.html` | `/disclaimer` | Disclaimer |

## Structure

```
relocation-for-dubai/
├── index.html
├── start-here.html
├── pillar-visas.html
├── pillar-business.html
├── pillar-banking.html
├── pillar-cost.html
├── about.html / contact.html / privacy.html / disclaimer.html
├── styles.css          ← all styles (single file, no framework)
├── script.js           ← minimal vanilla JS
├── vite.config.js      ← multi-page Vite config
├── vercel.json         ← clean URL rewrites + security headers
├── package.json
└── .vscode/settings.json
```

## Adding New Pages

1. Create `your-page.html`
2. Add to `vite.config.js` under `build.rollupOptions.input`
3. Add rewrite to `vercel.json` for clean URL
4. Add internal links from relevant pillar pages

## Deploying to Vercel

1. Push to GitHub
2. Import repo at vercel.com → New Project
3. Framework: **Vite** | Build: `npm run build` | Output: `dist`
4. Deploy — every `git push` auto-deploys

## Affiliate Link Placeholders

Search for `contact.html` in affiliate boxes to find referral placements.
Replace the contact links with direct affiliate URLs when ready.
