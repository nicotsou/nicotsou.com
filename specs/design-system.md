---
# Feature: Design System
status: current
last-extracted: 2026-03-19
files: src/styles/Colors.js, src/styles/Typography.js, src/styles/GlobalStyles.js, src/styles/LandingTypography.js, src/components/Layout/Divider.js, src/components/Layout/Layout.js
---

## Summary
Defines all visual tokens — colors, typography, and global resets — used across the entire site. Provides reusable `css` snippets and Styled Components for every design token.

## Current Implementation

### Entry Points
- `gatsby-browser.js` calls `wrapPageElement`, which wraps every page in `Layout.js`
- `Layout.js` imports `normalize.css` and renders `<GlobalStyles />`, injecting all CSS custom properties and global styles into the DOM on every page

### Key Files
| File | Role |
|---|---|
| `src/styles/Colors.js` | Declares all color tokens as CSS custom properties with raw RGB channel values (`--name-value: r, g, b`). Also exports the `Pride` gradient snippet. |
| `src/styles/Typography.js` | Exports every type token as both a `css` snippet (`*Styles`) and a styled component. 14 tokens: Body1-3, Heading1-6, Label1-3, Code, Aside1-2. |
| `src/styles/GlobalStyles.js` | Composes Colors + semantic variables + color scheme + anchor styles + base body typography via `createGlobalStyle`. Exported as a React component. |
| `src/styles/LandingTypography.js` | Two TLTR-brand-specific font tokens: `ProximaFont` (proxima-nova) and `TltrFont` (flegrei), loaded from Adobe Typekit. Used only on the TLTR landing page. |
| `src/components/Layout/Divider.js` | Exports `DividerStyles` (a `css` snippet) and `Divider` (a styled `hr`). Reused in BlogStyles.js for `<hr>` in Markdown and in AuthorAside.js. |
| `src/components/Layout/Layout.js` | Root wrapper rendered by `gatsby-browser.js`. Applies `normalize.css` + `GlobalStyles`. |

### Data Flow
```
gatsby-browser.js
  └── wrapPageElement → Layout.js
        ├── normalize.css (third-party CSS reset)
        └── GlobalStyles (React component)
              ├── <Colors />        → injects --*-value CSS custom properties to :root
              ├── <Variables />     → sets semantic vars (--text-color, --bg-color, etc.)
              ├── <ColorStyles />   → applies semantic vars to body; dark mode overrides
              ├── <FontFixStyles /> → -webkit-font-smoothing
              ├── <AnchorStyles />  → global anchor color: inherit; hover: 50% opacity
              └── <TextDecorationStyles /> → html { Body1Styles }; strong/b font-weight
```

### Conventions Applied
- All color values stored as raw RGB channels so any consumer can write `rgba(var(--name-value), 0.5)` (Color System section in AGENTS.md)
- Each type token dual-exports: a `css` snippet for composition and a styled component for direct use (Typography Scale section)
- `createGlobalStyle` is only used in `src/styles/` files (Styled Components section)

## Dependencies
- **Depends on:** nothing (foundational layer)
- **Required by:** every other feature — all components, templates, and pages import tokens from this system

## Boundaries
- Do NOT add new color tokens to `Colors.js` without approval — they must fit the existing teal/leather palette
- Do NOT modify `Typography.js` token values without approval — every rendered text element across the site is affected
- Do NOT change the anchor color rules in `GlobalStyles.js` — `color: inherit` is intentional and must not be overridden with custom link colors
- Do NOT use `createGlobalStyle` outside of `src/styles/` files
- Do NOT use hex/rgb literals for foreground/background — always route through CSS custom properties

## Acceptance Criteria
- [ ] All CSS custom properties defined in `Colors.js` are accessible as `var(--name-value)` in any styled component
- [ ] Every typography token exports both a `*Styles` `css` object and a named styled component
- [ ] `<GlobalStyles />` renders without errors on every page (verified by wrapping in `Layout.js`)
- [ ] `normalize.css` is applied before all custom styles
- [ ] `a`, `a:visited`, `a:active` all inherit color from their parent
- [ ] `a:hover` renders at 50% opacity of `--text-color`

## Extension Points
- Add a new color: declare `--new-name-value: r, g, b` in the `:root` block of `Colors.js`
- Add a new type token: export both a `css` snippet and a named styled component in `Typography.js`
- Add a new semantic variable: declare in the `Variables` `createGlobalStyle` block in `GlobalStyles.js` and add its dark-mode override in `ColorStyles`
