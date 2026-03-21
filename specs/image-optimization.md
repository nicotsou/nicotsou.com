---
# Feature: Image Optimization
status: current
last-extracted: 2026-03-19
files: gatsby-config.js
---

## Summary
Processes and optimizes all images at build time — generating responsive image sets with blur-up placeholders for cover images, and handling inline Markdown images with full-bleed responsive layout.

## Current Implementation

### Entry Points
- `gatsby-plugin-image` + `gatsby-plugin-sharp` + `gatsby-transformer-sharp` — enables `GatsbyImage` and `getImage()` helper used in templates
- `gatsby-remark-images` — processes Markdown-embedded images (in `content/blog/*/images/`)

### Key Files
| File | Role |
|---|---|
| `gatsby-config.js` | Configures `gatsby-remark-images` with `maxWidth: 1050` and `backgroundColor: 'transparent'` for Markdown images; MDX variant uses `maxWidth: 1900` |
| `src/templates/blogPost.js` | Cover image: `gatsbyImageData(width: 2300, placeholder: BLURRED, quality: 95)` for full-size, `width: 900, quality: 80` for prev/next thumbnails |
| `src/templates/talkPage.js` | Same cover image config as `blogPost.js` |
| `src/templates/coursePage.js` | Same cover image config as `blogPost.js` |
| `src/components/DynamicCover.js` | Uses `getImage(cover)` + `<GatsbyImage>` with `role="presentation"` |
| `src/components/Layout/AuthorAside.js` | Avatar: `gatsbyImageData(width: 100, placeholder: BLURRED, quality: 95)` |
| `src/styles/BlogStyles.js` | CSS layout rules for `.gatsby-resp-image-wrapper` — full-bleed responsive breakpoints |

### Data Flow
```
Cover images (cover.png in content folder):
  gatsby-source-filesystem → File node
  → gatsby-transformer-sharp → ImageSharp node
  → GraphQL query in template: cover { childImageSharp { gatsbyImageData(…) } }
  → getImage(cover) → GatsbyImage data object
  → <GatsbyImage image={…} alt={title} style={{ width: '100%', minHeight: '67vh' }} />

Markdown inline images:
  ![alt text](images/filename.png) in index.md
  → gatsby-remark-images (build time):
      → creates responsive image set
      → wraps in <span class="gatsby-resp-image-wrapper">
      → adds blur-up placeholder
  → BlogStyles.js CSS:
      .gatsby-resp-image-wrapper:
        → full-bleed at mobile: width 100vw, margin 0 -1rem
        → at ≥780px: full viewport width with calc() offset
        → at ≥1200px: 40% bleed with border-radius

Diagram inversion (dark mode):
  .gatsby-resp-image-wrapper:has(img[alt^='Diagram'])
    @media (prefers-color-scheme: dark)
      filter: invert(); mix-blend-mode: plus-lighter
```

### Conventions Applied
- Cover images use `placeholder: BLURRED` — blurred low-quality placeholder during load
- Markdown diagram images use `alt` starting with `"Diagram"` for automatic dark-mode inversion (Image Conventions section in AGENTS.md)
- `backgroundColor: 'transparent'` in `gatsby-remark-images` prevents white rectangles during image load in dark mode

## Dependencies
- **Depends on:** content-pipeline (File nodes from gatsby-source-filesystem)
- **Required by:** blog-post-rendering, talk-pages, course-pages, dynamic-cover-preview, site-layout (AuthorAside avatar)

## Boundaries
- Do NOT change `placeholder: BLURRED` to `TRACED_SVG` without testing build times — TRACED_SVG is significantly slower
- The `backgroundColor: 'transparent'` in `gatsby-remark-images` must be kept — removing it causes white flash in dark mode
- Cover images must be placed in the same folder as `index.md` and referenced as `'./cover.png'` in frontmatter (relative path)
- The `width: 2300` query parameter for covers is intentional for high-DPI displays — do not reduce without visual testing

## Acceptance Criteria
- [ ] Cover images render with BLURRED placeholder effect during page load
- [ ] Cover images fill the full container width (`width: '100%'`)
- [ ] Inline Markdown images are full-bleed at mobile viewport widths
- [ ] At ≥780px, Markdown images extend to full viewport width
- [ ] At ≥1200px, Markdown images bleed 20% into both margins with border-radius
- [ ] Avatar image in AuthorAside renders as a circular image (via `border-radius: 100%`)
- [ ] DynamicCover renders without breaking when `cover` is null/undefined (GatsbyImage returns null)

## Extension Points
- Change cover image quality: update the `quality` parameter in the `gatsbyImageData` query within the template
- Add a new image type with different processing: add a new `gatsby-source-filesystem` entry and configure a separate `gatsby-remark-images` plugin instance
