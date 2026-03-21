---
# Feature: Dark Mode
status: current
last-extracted: 2026-03-19
files: src/styles/GlobalStyles.js, src/styles/Colors.js, src/styles/BlogStyles.js, src/pages/index.js
---

## Summary
Automatically adapts the site's color scheme to the OS dark-mode preference using CSS custom property swaps, with no JavaScript involvement. Includes diagram color inversion and a June-only Pride gradient easter egg.

## Current Implementation

### Entry Points
- `GlobalStyles.js` — `ColorStyles` block contains the `@media (prefers-color-scheme: dark)` rule that swaps semantic CSS variables
- `BlogStyles.js` — blog content images with `alt` text starting with `"Diagram"` are inverted in dark mode
- `src/pages/index.js` and `src/styles/BlogStyles.js` — blockquotes and the homepage tagline apply the Pride gradient during June (month index 5)

### Key Files
| File | Role |
|---|---|
| `src/styles/Colors.js` | Declares all raw palette tokens; exports the `Pride` CSS gradient used during June |
| `src/styles/GlobalStyles.js` | `Variables` sets light-mode defaults; `ColorStyles` adds dark-mode overrides via `@media (prefers-color-scheme: dark)` |
| `src/styles/BlogStyles.js` | Applies `filter: invert() mix-blend-mode: plus-lighter` to images whose `alt` starts with `"Diagram"` inside `@media (prefers-color-scheme: dark)` |
| `src/pages/index.js` | Applies `Pride` snippet to the homepage tagline when `new Date().getMonth() === 5` |

### Data Flow
```
Browser OS setting (prefers-color-scheme)
  └── CSS media query in ColorStyles (GlobalStyles.js)
        ├── light: --text-color = --leather-value
        │         --bg-color   = --white-value
        │         --caption-color = --leather-value
        │
        └── dark:  --text-color = --white-value
                   --bg-color   = --dark-leather-value
                   --caption-color = --white-value

All styled components read rgb(var(--text-color)) or rgba(var(--bg-color), …)
→ automatically adapt without any JS re-render

BlogStyles.js — diagram inversion:
  img[alt^='Diagram'] inside .gatsby-resp-image-wrapper
    @media (prefers-color-scheme: dark)
      filter: invert(); mix-blend-mode: plus-lighter

Pride easter egg:
  JavaScript date check at render time → month === 5
  → applies Rainbow gradient css snippet to blockquotes (BlogStyles) and
    homepage tagline (index.js)
```

### Conventions Applied
- Dark mode implemented entirely via CSS — no JS theme toggle, no `localStorage`, no React context (Dark Mode section in AGENTS.md)
- All component colors route through `--text-color` / `--bg-color` semantic variables (Color System section)

## Dependencies
- **Depends on:** design-system (Colors.js CSS custom properties are the mechanism)
- **Required by:** blog-post-rendering (diagram inversion), post-listing (Pride tagline)

## Boundaries
- Do NOT add a JS-based dark mode toggle — the design is CSS-only, OS-preference-driven
- Do NOT hardcode `color` or `background` values in components — always use semantic variables so dark mode works automatically
- Do NOT remove the `mix-blend-mode: plus-lighter` from diagram inversion — it prevents white backgrounds from becoming black
- The Pride gradient during June is intentional — do not remove or gate it behind a setting

## Acceptance Criteria
- [ ] Body background is `rgb(var(--dark-leather-value))` when OS is in dark mode
- [ ] Body text is `rgb(var(--white-value))` when OS is in dark mode
- [ ] Images with `alt` starting with `"Diagram"` are visually inverted in dark mode
- [ ] Images with `alt` NOT starting with `"Diagram"` are not inverted in dark mode
- [ ] During June (month 5), the homepage tagline displays the Pride rainbow gradient
- [ ] During June (month 5), blockquotes in blog posts display the Pride rainbow gradient
- [ ] Outside of June, blockquotes render with default styling

## Extension Points
- To add a new element to dark mode: use `rgb(var(--text-color))` or `rgba(var(--bg-color), …)` — it adapts automatically
- To add a seasonal style: follow the `new Date().getMonth() === N && SomeStyle` pattern used in `index.js` and `BlogStyles.js`
- To add a new diagram-like inversion class: extend the `:has(img[alt^='…'])` selector in `BlogStyles.js`
