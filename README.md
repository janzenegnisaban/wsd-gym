# WSD GYM Website

Premium multi-page static website for WSD GYM (Olongapo City), built with plain HTML/CSS/JS and an iOS-inspired glass design language.

This README is written so you can recreate the whole project from scratch.

---

## 1) Project Overview

- **Type:** Static website (no build tools required)
- **Stack:** HTML, CSS, Vanilla JavaScript
- **Style direction:** Modern iOS-inspired UI/UX (glass surfaces, clean spacing, subtle motion)
- **Pages:** Home, Membership, Locations, Promo, Contacts, Gallery, Invest, Video
- **Optional integration:** Google Places reviews via API key (`config.js`)

---

## 2) File Structure

```text
wsd-gym-main/
  index.html
  membership.html
  locations.html
  promo.html
  contacts.html
  gallery.html
  invest.html
  video.html
  styles.css
  script.js
  config.js
  config.example.js
  (image assets...)
```

### What each file does

- `styles.css`  
  All visual styling, responsive rules, iOS glass look, component styles.

- `script.js`  
  Navigation toggle, active state behavior, scroll progress bar, reveal animations, carousel logic, optional Google reviews rendering.

- `config.js`  
  Optional API key holder. Keep API key commented out if not using reviews.

- `config.example.js`  
  Setup notes for Google Maps JavaScript + Places API.

- `*.html`  
  Individual pages that share the same header/footer/components.

---

## 3) Run Locally

No installation needed.

### Option A: Open directly
- Double-click `index.html`.

### Option B: Use local server (recommended)
- VS Code Live Server, or any static server.
- Example (if Python installed):
  ```bash
  python -m http.server 5500
  ```
  Then open [http://localhost:5500](http://localhost:5500).

---

## 4) Rebuild From Scratch (Step-by-Step)

## Step 1: Create base pages

Create these HTML files:
- `index.html`
- `membership.html`
- `locations.html`
- `promo.html`
- `contacts.html`
- `gallery.html`
- `invest.html`
- `video.html`

Each page should include:
- Shared `<head>` with Google Fonts + `styles.css`
- Shared header/navigation
- Main page-specific content section(s)
- Shared footer
- Scripts before `</body>`:
  - `config.js`
  - `script.js`

## Step 2: Add shared header/footer

Use consistent nav links on every page:
- Home
- Membership
- Locations / Schedule
- New / Promo / Events
- Contacts
- Gallery
- Invest / Franchise

Set `.active` class on current page link.

## Step 3: Add global style tokens

In `styles.css`, define:
- Typography (`--font-display`, `--font-body`)
- Colors (`--ios-*`, `--accent`, tints)
- Elevation and radii (`--shadow-ios-*`, `--radius-ios`)
- Glass tokens (`--glass-bg`, `--glass-stroke`)

These tokens make visual updates easy and consistent.

## Step 4: Build reusable UI components

Create component classes in CSS:
- Header/nav: `.header`, `.nav`, `.nav-link`, `.nav-toggle`
- Buttons: `.btn`, `.btn-primary`, `.btn-secondary`
- Cards/surfaces: membership/promo/contact/location/facility cards
- Sections: `.section`, `.container`, `.section-title`
- Media blocks: `.carousel-*`, `.photo-card`, `.new-gallery-card`
- Footer: `.footer`, `.footer-content`, `.footer-nav`

## Step 5: Add JavaScript behaviors

In `script.js` include:
- Mobile nav open/close
- Close nav on link click
- Header scroll state
- Scroll progress indicator
- Reveal-on-scroll behavior (`.reveal-section`)
- Tagline in/out animation
- Carousel controls
- Optional Google review loading (if API key is set)

## Step 6: Add content and assets

Replace placeholder text/images with final WSD GYM content:
- Address
- Phone/email/Facebook links
- Membership prices
- Schedules
- Promo content
- Gallery assets

## Step 7: Validate responsiveness

Test at minimum:
- 320px (small phone)
- 768px (tablet)
- 1024px+ (desktop)

---

## 5) Page Blueprint

## `index.html` (Home)
- Hero intro + CTA buttons
- New gallery teaser
- Main image carousel
- Quick info cards

## `membership.html`
- Membership plans cards
- Membership image (framed, scaled)
- Tabata section image + pricing
- Benefits, services, FAQ

## `locations.html`
- Branch/location cards
- Schedule blocks
- Map embed section

## `promo.html`
- Featured promo card/banner
- Promo grid
- Events section

## `contacts.html`
- Contact cards
- Business hours
- Contact info blocks

## `gallery.html`
- New uploads grid
- Gym photos
- Community photos
- Video links list

## `invest.html`
- Franchise pitch
- Benefits
- CTA section

## `video.html`
- Video-focused layout (legacy/support page)

---

## 6) Design System Notes (Current Direction)

- **Style:** Premium + minimal + iOS-inspired
- **Noise reduction:** Less glow/shimmer/ripple, cleaner shadows
- **Glass effect:** Used on nav/cards/feature surfaces via backdrop blur + translucent backgrounds
- **Image principles:**
  - Important images framed lightly
  - Use `object-fit: contain` where full image must appear
  - Use `object-fit: cover` where visual consistency matters (grids/carousels)
  - Keep max width/height constraints for balanced layout

---

## 7) Content Rules Used

- Business hours standardized to:  
  **Monday - Saturday: 8:30 AM - 9:00 PM**  
  **Sunday: CLOSED**

- Contact links point to official Facebook profile and channels.

---

## 8) Optional Google Reviews Setup

If you want live Google review cards:

1. Open `config.example.js` and follow the steps.
2. Enable APIs in Google Cloud:
   - Maps JavaScript API
   - Places API
3. Create restricted API key.
4. In `config.js`, set:
   ```js
   window.GOOGLE_PLACES_API_KEY = 'YOUR_API_KEY';
   ```
5. Keep it commented out if not using live reviews.

---

## 9) Editing Guide

### Update prices or text
- Edit relevant HTML page directly.

### Update visual style globally
- Edit `:root` tokens and shared classes in `styles.css`.

### Swap images
- Replace file path in HTML `<img src="...">`.
- Keep image dimensions optimized for web (recommended).

### Add new section
1. Add HTML block with existing component classes.
2. Add matching CSS block if needed.
3. Add `.reveal-section` if you want scroll reveal behavior.

---

## 10) Deployment

Can be deployed to any static host:
- GitHub Pages
- Netlify
- Vercel (static)
- cPanel/shared hosting

Upload all files preserving relative paths.

---

## 11) Maintenance Checklist

- [ ] Verify all nav links on all pages
- [ ] Verify hours content consistency
- [ ] Check mobile menu behavior
- [ ] Check carousel buttons/indicators
- [ ] Check image loading and framing
- [ ] Validate footer links and contact details
- [ ] Run final responsive pass (mobile/tablet/desktop)

---

## 12) Quick Start If Rebuilding Fast

1. Copy shared header/footer into all pages.
2. Reuse section/card classes from `styles.css`.
3. Reconnect `script.js` and `config.js`.
4. Add your final content + assets.
5. Test responsive behavior and publish.

---

If you want, I can also create a second file: `BUILD-CHECKLIST.md` with a strict copy-paste launch checklist (design, content, SEO, performance, deployment).
