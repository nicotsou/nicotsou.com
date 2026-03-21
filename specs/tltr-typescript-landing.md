---
# Feature: TLTR TypeScript Landing Page
status: current
last-extracted: 2026-03-19
files: src/pages/tltr-ts-landing.js, src/components/tltr-typescript/Hero.js, src/components/tltr-typescript/NotifyPrompt.js, src/styles/LandingTypography.js
---

## Summary
A standalone marketing/landing page for the TLTR TypeScript course at `/tltr-ts-landing`, with a custom dark TLTR brand theme, decorative hero section, course pitch copy, and an enrollment call-to-action linking to Gumroad.

## Current Implementation

### Entry Points
- `src/pages/tltr-ts-landing.js` — Gatsby file-based page at `/tltr-ts-landing`

### Key Files
| File | Role |
|---|---|
| `src/pages/tltr-ts-landing.js` | Page component; overrides semantic CSS variables to TLTR dark theme, renders `<Hero>`, course pitch copy using `BlogStyles`, and `<NotifyPrompt>` |
| `src/components/tltr-typescript/Hero.js` | Full-viewport-height hero with absolutely-positioned decorative shapes (9 PNG images), a large animated gradient title ("TLTR; TypeScript"), and an embedded `<NotifyPrompt>` |
| `src/components/tltr-typescript/NotifyPrompt.js` | CTA button linking to `https://nicotsou.gumroad.com/l/TLTR-typescript` ("Enroll now") and a "Work in progress" disclaimer label |
| `src/styles/LandingTypography.js` | Two brand-specific font tokens: `ProximaFont` (proxima-nova, weight 800) and `TltrFont` (flegrei, weight 800), loaded from Adobe Typekit (`https://use.typekit.net/fnw5vds.css`) |

### Data Flow
```
User visits /tltr-ts-landing
  → tltr-ts-landing.js
      → <GlobalStyleModifier /> (createGlobalStyle)
          overrides :root vars:
            --text-color  = --white-value
            --bg-color    = --tltr-blue-value
            --caption-color = --white-value
          (forces light-text-on-dark-blue regardless of OS color scheme)
      → <Seo title image=courseThumbImage>
          <link rel="stylesheet" href="https://use.typekit.net/fnw5vds.css" />
        </Seo>         ← Adobe Typekit fonts loaded only on this page
      → <Hero />
          → HeroFrame (fixed full-viewport dark background)
          → BackgroundCircle (large oval in --tltr-blue-value)
          → Shape1–Shape9 (decorative PNGs, aria-hidden)
          → <Tltr> "TLTR;" in TltrFont + gradient (--tltr-awesome-value → dark red)
          → <CourseName> "TypeScript" in ProximaFont + white-to-grey gradient
          → <NotifyPrompt />
      → <Article> with BlogStyles (course pitch text)
      → <Footer />
```

### Conventions Applied
- `createGlobalStyle` used in the page file itself (exception: this is the only page that overrides semantic vars at page scope, not inside `GlobalStyles.js`)
- `BlogStyles` applied to the pitch copy article section (same markdown rendering styles as content pages)
- Decorative images set `role="presentation" aria-hidden="true"` (accessibility)

## Dependencies
- **Depends on:** design-system (CSS custom properties overridden), blog-post-rendering (BlogStyles for article copy), seo-meta, site-layout (Footer)
- **Required by:** nothing (leaf feature)

## Boundaries
- The Typekit stylesheet (`https://use.typekit.net/fnw5vds.css`) is injected as a child of `<Seo>` — do NOT move it to `gatsby-browser.js` as it would load on every page
- `ProximaFont` and `TltrFont` are TLTR-brand-specific — do NOT use them outside of TLTR-branded pages
- The `GlobalStyleModifier` overrides `--text-color` and `--bg-color` on this page only — do NOT use this pattern on other pages; it bypasses the dark mode system
- `NotifyPrompt` links to a hardcoded Gumroad URL — changing the enrollment platform requires updating this component

## Acceptance Criteria
- [ ] `/tltr-ts-landing` renders with a dark blue (`--tltr-blue-value`) background in both light and dark OS modes
- [ ] Text on the page is white regardless of OS color scheme
- [ ] The hero section displays the 9 decorative shapes as presentation images
- [ ] "TLTR;" title displays in the flegrei font with a gradient from `--tltr-awesome-value` to dark red
- [ ] "TypeScript" subtitle displays in proxima-nova at clamp(3rem, 15vw, 7rem)
- [ ] "Enroll now" button links to `https://nicotsou.gumroad.com/l/TLTR-typescript`
- [ ] "Work in progress" disclaimer is visible near the CTA
- [ ] Course pitch article body renders with BlogStyles typography
- [ ] Adobe Typekit stylesheet is loaded only on this page, not site-wide

## Extension Points
- Update enrollment URL: change `href` in `NotifyPrompt.js`
- Add a new decorative shape: add a shape import and a new `styled.img` with `Shape` CSS base and `--hero-shape-*` custom property values in `Hero.js`
- Add page sections: add styled sections below `<Hero>` in `tltr-ts-landing.js` following the `BlogStyles` + `SectionStyles` pattern
