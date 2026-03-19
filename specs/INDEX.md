# Spec Index — nicotsou.com
last-updated: 2026-03-19

16 features extracted. Each spec is self-contained: read `agents.md` + one spec to work on any feature.

---

## Feature List

| # | Name | Spec File | Primary Files | Depends On | Complexity |
|---|---|---|---|---|---|
| 1 | Design System | [design-system.md](./design-system.md) | `src/styles/Colors.js`, `src/styles/Typography.js`, `src/styles/GlobalStyles.js`, `src/styles/LandingTypography.js`, `src/components/Layout/Divider.js`, `src/components/Layout/Layout.js` | — (foundational) | M |
| 2 | Dark Mode | [dark-mode.md](./dark-mode.md) | `src/styles/GlobalStyles.js`, `src/styles/Colors.js`, `src/styles/BlogStyles.js`, `src/pages/index.js` | design-system | S |
| 3 | Blog Post Rendering | [blog-post-rendering.md](./blog-post-rendering.md) | `src/templates/blogPost.js`, `src/styles/BlogStyles.js`, `content/blog/` | design-system, dark-mode, code-syntax-highlighting, image-optimization, seo-meta, site-layout, newsletter-signup, dynamic-cover-preview, content-pipeline | L |
| 4 | Code Syntax Highlighting | [code-syntax-highlighting.md](./code-syntax-highlighting.md) | `src/styles/CodeHighlighter.js`, `gatsby-config.js` | design-system | S |
| 5 | Talk Pages | [talk-pages.md](./talk-pages.md) | `src/templates/talkPage.js`, `src/pages/talks.js`, `content/talks/` | design-system, dark-mode, code-syntax-highlighting, image-optimization, seo-meta, site-layout, newsletter-signup, dynamic-cover-preview, post-listing, content-pipeline | M |
| 6 | Course Pages | [course-pages.md](./course-pages.md) | `src/templates/coursePage.js`, `src/pages/courses/tltr-typescript/index.js`, `content/courses/tltr-typescript/` | design-system, dark-mode, code-syntax-highlighting, image-optimization, seo-meta, site-layout, content-pipeline | M |
| 7 | TLTR TypeScript Landing | [tltr-typescript-landing.md](./tltr-typescript-landing.md) | `src/pages/tltr-ts-landing.js`, `src/components/tltr-typescript/Hero.js`, `src/components/tltr-typescript/NotifyPrompt.js`, `src/styles/LandingTypography.js` | design-system, blog-post-rendering, seo-meta, site-layout | M |
| 8 | Dynamic Cover Preview | [dynamic-cover-preview.md](./dynamic-cover-preview.md) | `src/components/DynamicCover.js` | design-system, image-optimization | S |
| 9 | Post Listing (Homepage) | [post-listing.md](./post-listing.md) | `src/pages/index.js`, `src/components/PostList.js`, `src/components/PostItem.js` | design-system, dynamic-cover-preview, image-optimization, seo-meta, site-layout, content-pipeline | S |
| 10 | SEO Meta Generation | [seo-meta.md](./seo-meta.md) | `src/components/seo.js`, `gatsby-config.js` | content-pipeline | S |
| 11 | Site Layout | [site-layout.md](./site-layout.md) | `src/components/Layout/` (Header, Footer, Logo, AuthorAside, Divider, Layout), `gatsby-browser.js` | design-system | M |
| 12 | Newsletter Signup | [newsletter-signup.md](./newsletter-signup.md) | `src/components/SignUp.js` | design-system | S |
| 13 | Links Page | [links-page.md](./links-page.md) | `src/pages/links.js`, `content/links/links.json` | design-system, seo-meta, site-layout | S |
| 14 | Content Pipeline | [content-pipeline.md](./content-pipeline.md) | `gatsby-node.js`, `gatsby-config.js` | — (foundational) | M |
| 15 | Image Optimization | [image-optimization.md](./image-optimization.md) | `gatsby-config.js` (remark-images, plugin-sharp, plugin-image) | content-pipeline | S |
| 16 | PWA, Analytics & Sitemap | [pwa-analytics.md](./pwa-analytics.md) | `gatsby-config.js` (manifest, offline, gtag, sitemap), `gatsby-browser.js` | content-pipeline | S |

---

## Dependency Graph

```
design-system ←── dark-mode
     ↑                ↑
     │        blog-post-rendering
     │        talk-pages
     │        course-pages
     │        tltr-typescript-landing
     │        post-listing
     │        site-layout
     │        newsletter-signup
     │        links-page
     │
content-pipeline ←── blog-post-rendering
                 ←── talk-pages
                 ←── course-pages
                 ←── post-listing
                 ←── image-optimization
                 ←── pwa-analytics
                 ←── seo-meta

image-optimization ←── blog-post-rendering
                   ←── talk-pages
                   ←── course-pages
                   ←── dynamic-cover-preview
                   ←── site-layout (avatar)

dynamic-cover-preview ←── blog-post-rendering
                      ←── talk-pages
                      ←── post-listing

seo-meta ←── blog-post-rendering
         ←── talk-pages
         ←── course-pages
         ←── post-listing
         ←── tltr-typescript-landing
         ←── links-page

code-syntax-highlighting ←── blog-post-rendering
                         ←── talk-pages
                         ←── course-pages
```

---

## Complexity Key
- **S** (Small): ≤3 files, self-contained, minimal integration surface
- **M** (Medium): 4–8 files, moderate integration, GraphQL queries or multi-component coordination
- **L** (Large): 8+ files, multiple cross-cutting dependencies, content pipeline integration

---

## Content Type Summary

| Content Type | Folder | `type` value | Sort field | URL prefix | Template |
|---|---|---|---|---|---|
| Blog post | `content/blog/[slug]/` | `post` | `date` ASC | `/{slug}` | `blogPost.js` |
| Talk | `content/talks/[slug]/` | `talk` | `date` ASC | `/talks/{slug}` | `talkPage.js` |
| Course lesson | `content/courses/tltr-typescript/[module]/[lesson]/` | `course` | `order` ASC | `/courses/tltr-typescript/{slug}` | `coursePage.js` |

---

## Known Caveats
- `Header/Nav.js` renders a menu icon but is not used by `Header/index.js` — placeholder component
- `SignUp.js` stores the fetch Promise (not its resolved value) in state — confirmation screen appears immediately on submit, not on API success
- `tltr-typescript-landing.js` overrides semantic CSS variables at page scope via `createGlobalStyle` — this bypasses the dark mode system intentionally for that page
- `content/mdPages/` is an empty directory not referenced in `gatsby-config.js` or `gatsby-node.js` — orphaned stub, not part of any active content pipeline
