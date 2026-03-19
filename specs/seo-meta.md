---
# Feature: SEO Meta Generation
status: current
last-extracted: 2026-03-19
files: src/components/seo.js, gatsby-config.js
---

## Summary
Injects `<title>`, Open Graph, and Twitter Card meta tags into every page's `<head>`, using page-specific props with site-wide defaults from `gatsby-config.js` siteMetadata.

## Current Implementation

### Entry Points
- `src/components/seo.js` — used as Gatsby's Head API export (`export function Head`) in all templates, and as `<Seo>` in all pages
- `gatsby-config.js` — `siteMetadata` provides the defaults consumed by the `useStaticQuery` in `seo.js`

### Key Files
| File | Role |
|---|---|
| `src/components/seo.js` | Renders head elements directly using Gatsby Head API. Reads `siteMetadata` via `useStaticQuery`. Merges page props with defaults. Accepts optional `children` for page-specific extra head tags. |
| `gatsby-config.js` | `siteMetadata`: `siteUrl`, `title`, `defaultTitle`, `defaultDescription`, `defaultImage` (`/avatar.jpg`), `author.name/bio`, `social.twitter/medium/youtube/github` |

### Data Flow
```
gatsby-config.js siteMetadata
  → useStaticQuery(FooterQuery / BioQuery / Seo staticQuery)
      → site.siteMetadata.*

Per-page call:
  <Seo title="Post Title" description="…" image={cover.publicURL} />
  or
  export function Head({ data }) {
    return <Seo title={data.markdownRemark.frontmatter.title} … />
  }

seo.js resolution:
  seo.title       = props.title       || siteMetadata.title
  seo.description = props.description || siteMetadata.defaultDescription
  seo.image       = siteUrl + (props.image || siteMetadata.defaultImage)
  seo.url         = siteUrl + useLocation().pathname

Rendered tags:
  <html lang="en" amp />
  <meta http-equiv="cache-control" content="public, max-age=0, must-revalidate" />
  <title>{seo.title}</title>
  <meta name="description" />
  <meta name="image" />
  <meta property="og:url" />
  <meta property="og:type" content="article" /> (only when article=true)
  <meta property="og:title" />
  <meta property="og:description" />
  <meta property="og:image" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content={social.twitter} />
  <meta name="twitter:title" />
  <meta name="twitter:description" />
  <meta name="twitter:image" />
  {children}         ← page-specific tags (e.g., Typekit stylesheet on landing page)
```

### Conventions Applied
- Gatsby Head API (`export function Head`) used in templates; direct `<Seo>` component used in page files (Gatsby 5 convention)
- `cover.publicURL` (not `childImageSharp`) is passed as the OG image to get the raw URL without processing

## Dependencies
- **Depends on:** design-system (none), content-pipeline (provides frontmatter data to callers)
- **Required by:** blog-post-rendering, talk-pages, course-pages, post-listing, tltr-typescript-landing, links-page, and 404 page

## Boundaries
- Do NOT add `<html>` or `<body>` tags inside `<Seo>` children — Gatsby Head API does not support body-level tags through this mechanism
- `title` is a required prop (enforced by `PropTypes.string.isRequired`) — every page must provide it
- The `article` prop only adds `og:type: article` — do not use it as a boolean flag for other behavior
- Do NOT inline the Typekit stylesheet globally — it is passed as a child of `<Seo>` only on the TLTR landing page

## Acceptance Criteria
- [ ] Every page has a `<title>` tag with the correct page title
- [ ] Every page has `og:title`, `og:description`, `og:image`, `og:url` tags
- [ ] Pages without a `description` prop use `defaultDescription` from `gatsby-config.js`
- [ ] Pages without an `image` prop use `/avatar.jpg` as the OG image
- [ ] Blog post pages have `og:type: article`
- [ ] Twitter card type is `summary_large_image` on all pages
- [ ] `twitter:creator` is set to `nicotsou`
- [ ] The TLTR landing page loads the Typekit stylesheet only on that page

## Extension Points
- Add a new meta tag globally: add it to `seo.js` directly
- Add a page-specific meta tag: pass it as a child of `<Seo>` in the page/template
- Change the default OG image: update `defaultImage` in `gatsby-config.js` siteMetadata and ensure the new image is in `static/`
