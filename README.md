# NexusAI — Premium AI SaaS Template

A **$79 premium-grade** AI SaaS website template for Envato ThemeForest. Built with Hono + TypeScript, deployable to Cloudflare Pages in minutes.

---

## 🌐 Live Demo

| Page | URL |
|------|-----|
| Landing Page | `/` |
| Dashboard UI | `/dashboard` |
| Features | `/features` |
| Pricing | `/pricing` |
| Blog | `/blog` |
| Contact | `/contact` |
| Login | `/login` |
| Sign Up | `/signup` |
| Variant: Dark Hero | `/variant-dark` |
| Variant: Minimal | `/variant-minimal` |

---

## ✅ Completed Features

### Landing Page
- [x] Sticky header with dark/light mode toggle
- [x] Animated hero with typed text effect + gradient orbs
- [x] Hero stats bar with animated counters
- [x] Interactive AI demo interface (Content / Image / Code / Chat)
- [x] Features grid with micro-interactions + comparison table
- [x] How It Works — 3-step visual flow
- [x] Pricing table (3 tiers, monthly/yearly toggle)
- [x] Testimonials grid (6 cards) + trust badges
- [x] FAQ accordion
- [x] Final CTA section with email capture
- [x] Comprehensive footer with social links

### Dashboard UI
- [x] Collapsible sidebar with navigation, usage meter, user info
- [x] Topbar with search, notifications, theme toggle
- [x] Overview tab: KPI cards, usage chart (Chart.js), activity feed, quick projects
- [x] Generate tab: AI generation studio with model/tone/length controls, live output
- [x] Projects tab: search, filters, view toggle, project cards
- [x] Templates tab: 12+ templates across 7 categories

### Additional Pages
- [x] Features page — full feature showcase with alternating layouts + integrations
- [x] Pricing page — standalone pricing with billing toggle
- [x] Blog page — 6-card grid with featured article
- [x] Contact page — 3 contact cards + full contact form
- [x] Login page — split layout with social auth + password toggle
- [x] Sign Up page — split layout with benefits + password strength meter

### Design System
- [x] CSS custom properties for dark/light theme switching
- [x] 7 gradient definitions + brand color palette
- [x] Full typography scale (Inter + JetBrains Mono)
- [x] Button variants: Primary, Outline, Ghost, XL, SM
- [x] Form components: Input, Textarea, Select, Checkbox, Range
- [x] Animation utilities: AOS scroll animations, counters, typed text, pulse glow

### Landing Page Variants
- [x] **Variant Dark Hero** — Purple-gradient dark hero with grid background
- [x] **Variant Minimal** — Light-mode, email-capture-centric minimal hero

---

## 🎨 Design System

### Colors
```
Primary:     #6366f1 (Indigo)
Secondary:   #8b5cf6 (Purple)
Accent:      #06b6d4 (Cyan)
Success:     #10b981 (Emerald)
Warning:     #f59e0b (Amber)
Danger:      #ef4444 (Red)
```

### Typography
- **Headings**: Inter (800–900 weight)
- **Body**: Inter (400–600 weight)
- **Code**: JetBrains Mono

### Dark Mode
- Background: `#0a0a0f` (base), `#111118` (surface), `#1a1a26` (card)
- Text: `#f0f0ff` (primary), `#a0a0b8` (secondary), `#6060a0` (muted)

### Light Mode
- Background: `#f8f8fc` (base), `#ffffff` (surface/card)
- Text: `#0f0f1a` (primary), `#40405a` (secondary), `#8080a0` (muted)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Hono v4 + TypeScript |
| Build | Vite 6 |
| Deployment | Cloudflare Pages / Workers |
| Icons | Font Awesome 6.5 |
| Fonts | Google Fonts (Inter) |
| Charts | Chart.js 4.4 (CDN) |
| Process | PM2 |

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Build
npm run build

# Start (sandbox/development)
pm2 start ecosystem.config.cjs

# Deploy to Cloudflare Pages
npm run deploy
```

---

## 📁 File Structure

```
webapp/
├── src/
│   ├── index.tsx          ← All routes + HTML templates
│   └── renderer.tsx       ← JSX renderer (unused — HTML returned directly)
├── public/static/
│   ├── css/
│   │   ├── design-system.css   ← Tokens, reset, shared utilities
│   │   ├── components.css      ← All page component styles
│   │   ├── dashboard.css       ← Dashboard-specific styles
│   │   └── landing.css         ← Landing-specific extras
│   └── js/
│       ├── main.js             ← Theme toggle, animations, interactions
│       └── dashboard.js        ← Dashboard tabs, charts, generation
├── ecosystem.config.cjs   ← PM2 config
├── vite.config.ts         ← Vite + Hono build
├── wrangler.jsonc         ← Cloudflare config
└── package.json
```

---

## 🔧 Customization

### Change Brand Name
Search and replace `NexusAI` / `nexusai` in `src/index.tsx`

### Change Colors
Edit CSS variables in `public/static/css/design-system.css`:
```css
--primary: #6366f1;       /* Change to your brand color */
--gradient-brand: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
```

### Add Pages
Add new routes in `src/index.tsx`:
```typescript
app.get('/new-page', (c) => c.html(myNewPage()))
```

---

## 📄 License
This template is intended for sale on Envato Market.
All assets use free/open-source resources. No copyrighted stock images.

---

**Deployment**: Cloudflare Pages ✅ | **Status**: Production Ready ✅ | **Last Updated**: Nov 2024
