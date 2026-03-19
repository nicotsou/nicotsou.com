---
# Feature: Site Layout
status: current
last-extracted: 2026-03-19
files: src/components/Layout/Layout.js, src/components/Layout/Header/index.js, src/components/Layout/Header/Nav.js, src/components/Layout/Footer.js, src/components/Layout/Icon.js, src/components/Layout/Logo.js, src/components/Layout/AuthorAside.js, src/components/Layout/Divider.js, gatsby-browser.js
---

## Summary
Provides the shared chrome for all pages: a global style injector wrapper, a top navigation header with breadcrumb, a footer with social links and copyright, an author byline aside for content pages, and reusable divider and logo components.

## Current Implementation

### Entry Points
- `gatsby-browser.js` `wrapPageElement` — wraps every page in `<Layout>`, which injects `normalize.css` and `<GlobalStyles>`
- Each page/template individually renders `<Header>`, `<Footer>`, and optionally `<AuthorAside>` — there is no automatic layout composition beyond the `<Layout>` wrapper

### Key Files
| File | Role |
|---|---|
| `gatsby-browser.js` | Calls `wrapPageElement → <Layout>` for every page; also handles `onServiceWorkerUpdateReady` → `window.location.reload()` |
| `src/components/Layout/Layout.js` | Renders `normalize.css` + `<GlobalStyles>` — no visible markup, purely a style injector |
| `src/components/Layout/Header/index.js` | Top navigation bar: Logo (small, links to `/`), centered `Label2` breadcrumb, empty `IconPlaceholder` for balance. Accepts `breadcrumb` (text or link text) and optional `breadcrumbLink` props. |
| `src/components/Layout/Header/Nav.js` | Renders a menu icon SVG — currently not used in the `Header` component (⚠️ unused/placeholder) |
| `src/components/Layout/Icon.js` | Generic SVG icon wrapper; applies `rgb(var(--text-color))` to `.stroke` and `.fillable` SVG classes. Used by `Footer.js` and `Nav.js`. |
| `src/components/Layout/Footer.js` | Social icon links (YouTube, X, GitHub) from `siteMetadata` + dynamic copyright year range starting from 2021 |
| `src/components/Layout/Logo.js` | SVG logo with two size variants (`Logo.sizes.small` = 2em, `Logo.sizes.large` = 3em). SVG paths styled via CSS custom properties. |
| `src/components/Layout/AuthorAside.js` | Author bio block with avatar image, configurable body text (`children`), and author name from `siteMetadata`. Preceded by a `<Divider>`. |
| `src/components/Layout/Divider.js` | Styled `<hr>` with a box-shadow underline, 6rem margin. Also exports `DividerStyles` for reuse in `BlogStyles.js`. |

### Data Flow
```
Every page:
  gatsby-browser.js wrapPageElement
    → <Layout>
        → normalize.css
        → <GlobalStyles />  (Colors, Variables, ColorStyles, AnchorStyles, TextDecorationStyles)

Pages with Header (all except homepage and 404):
  <Header breadcrumb="Blog" />
  <Header breadcrumb="Talks" breadcrumbLink="/talks" />
  <Header breadcrumb="Courses" />
  <Header breadcrumb="Links" />
  → renders: [small Logo → /] [breadcrumb text] [empty div]

Footer (all pages):
  <Footer /> or <styled(Footer) css={SectionStyles}>
  → useStaticQuery → site.siteMetadata.social
  → renders: [YouTube icon] [X icon] [GitHub icon] | [© year NT]
  → year range: 2021 to current year (abbreviated)

AuthorAside (blog + talk templates):
  <AuthorAside>{custom text}</AuthorAside>
  → useStaticQuery → avatar.jpg + siteMetadata.author.name/social
  → renders: [Divider] [Avatar → x.com link] [children text] [author name Label3]
```

### Conventions Applied
- `Logo` uses `rgb(var(--text-color))` for SVG stroke/fill — adapts to dark mode automatically
- `Footer` social icons use `opacity: 0.5` on hover (not `color` change) — consistent with the link hover convention
- `Header` breadcrumb renders as `Label2` (Ubuntu 300, 0.85rem uppercase) — follows typography scale

## Dependencies
- **Depends on:** design-system (CSS custom properties, Typography tokens)
- **Required by:** every page and template

## Boundaries
- ⚠️ `Nav.js` (menu icon) is imported and rendered in tests but NOT used by `Header/index.js` — do not wire it up without a mobile navigation design decision
- Do NOT add `<GlobalStyles>` inside individual pages or components — it is already injected by `Layout.js` via `gatsby-browser.js`
- Do NOT change `Footer` social links away from `siteMetadata` — the values are authoritative in `gatsby-config.js`
- The `Header` uses a three-column flex layout (Logo | breadcrumb | IconPlaceholder) to center the breadcrumb. Do NOT remove `IconPlaceholder` without adjusting the layout

## Acceptance Criteria
- [ ] Every page has `normalize.css` applied
- [ ] Every page has `GlobalStyles` (CSS custom properties) applied
- [ ] The `Header` displays the Logo linking to `/`, a centered breadcrumb label, and is consistent across content pages
- [ ] When `breadcrumbLink` is provided to `Header`, the breadcrumb is a clickable `Link`
- [ ] The `Footer` displays YouTube, X, and GitHub icon links
- [ ] The `Footer` copyright year updates dynamically and shows a range (e.g., "2021-26") after 2021
- [ ] `Logo` SVG paths are styled with `--text-color` (adapts to dark mode)
- [ ] `AuthorAside` renders the avatar, custom body text, and author name

## Extension Points
- Add a navigation menu: implement `Nav.js` and add it to `Header/index.js`
- Add a new social link to Footer: add to `siteMetadata.social` in `gatsby-config.js` and add the icon + link in `Footer.js`
- Change the Logo: replace the SVG files (`nt-logo-58px.svg`, `nt-logo-40px.svg`) in `src/images/` and ensure the SVG has `.circle` and `.letters` classes for CSS targeting
