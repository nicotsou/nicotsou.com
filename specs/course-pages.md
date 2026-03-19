---
# Feature: Course Pages
status: current
last-extracted: 2026-03-19
files: src/templates/coursePage.js, src/pages/courses/tltr-typescript/index.js, content/courses/tltr-typescript/
---

## Summary
Renders individual lesson pages for the TLTR TypeScript course, supporting either a YouTube video embed or a cover image as the hero, with module breadcrumb navigation and prev/next lesson links.

## Current Implementation

### Entry Points
- `gatsby-node.js` `createPages` — queries all `markdownRemark` nodes where `frontmatter.type === "course"`, sorted by `order ASC` (not date), and creates each at `/courses/tltr-typescript/[slug]` using `src/templates/coursePage.js`
- `src/pages/courses/tltr-typescript/index.js` — file-based page at `/courses/tltr-typescript` (course index)

### Key Files
| File | Role |
|---|---|
| `src/templates/coursePage.js` | Lesson page template; shows module name as breadcrumb, conditionally renders a cover image or a `<Video>` embed, renders article body, optional "read article" link, author aside, and prev/next lesson navigation |
| `src/components/Video.js` | Responsive YouTube embed using `react-player`; width 100vw, aspect ratio 2048:4096, max 1250px wide, border-radius at ≥1300px |
| `content/courses/tltr-typescript/[module]/[lesson]/index.md` | Source Markdown per lesson with required `order` and `module` frontmatter fields |

### Data Flow
```
content/courses/tltr-typescript/[module]/[lesson]/index.md  (type: course)
  → gatsby-transformer-remark → MarkdownRemark node (sorted by order ASC)

gatsby-node.js createPages
  → createPage({
      path: `courses/tltr-typescript${slug}`,
      component: coursePage.js,
      context: { id, previousPageId, nextPageId, type: 'course' }
    })

coursePage.js (CoursePageTemplate)
  → GraphQL query: CoursePageBySlug
      → { html, fields.slug, frontmatter: { title, date, description, youtubeVideoId, module, articleSlug, cover } }
      → previous (filtered by type: course) → { fields.slug, frontmatter.title }
      → next    (filtered by type: course)  → { fields.slug, frontmatter.title }
  → renders:
      <Seo title image=courseThumbImage />    ← uses hardcoded thumbnail, NOT cover
      <Header breadcrumb="Courses" />
      <CodeHighlighter />
      <Label2>
        <Link to="/courses/tltr-typescript">TLTR; Typescript</Link> \ {module}
      </Label2>
      <Heading1>{title}</Heading1>
      IF cover && !youtubeVideoId → <GatsbyImage cover />
      IF youtubeVideoId           → <Video id={youtubeVideoId} />
      <ArticleSection html />
      IF articleSlug → <Link to={articleSlug}>Read the article</Link>
      <AuthorAside>
        links to GitHub for suggesting improvements (uses fields.slug to construct URL)
      </AuthorAside>
      prev → `/courses/tltr-typescript${prev.fields.slug}`
      next → "Next up: {title} →"
      <Footer />
```

### Conventions Applied
- Lessons sorted by `order` integer (not by `date`) — the `order` field controls sequence
- `type: 'course'` passed as GraphQL variable to filter prev/next queries to same content type
- SEO image is a hardcoded thumbnail (`content/assets/tltr-ts-thumb.jpg`), not the lesson cover — intentional branding
- The "suggest improvements" link constructs a GitHub edit URL using `fields.slug`

## Dependencies
- **Depends on:** design-system, dark-mode, code-syntax-highlighting, image-optimization, seo-meta, site-layout, content-pipeline
- **Required by:** nothing (leaf feature)

## Boundaries
- Do NOT sort course lessons by `date` — they are ordered by the `order` integer field only
- The `order` field determines lesson sequence; gaps between values are acceptable (e.g., 100, 200, 700)
- Do NOT render both a cover image and a `<Video>` — `youtubeVideoId` takes precedence; cover is shown only when `youtubeVideoId` is absent
- Do NOT change the SEO thumbnail from `tltr-ts-thumb.jpg` — it is a consistent brand image for the course, not per-lesson
- `module` is required — it is rendered in the breadcrumb; omitting it breaks navigation context

## Acceptance Criteria
- [ ] Navigating to `/courses/tltr-typescript/[slug]` renders the lesson title as `<h1>`
- [ ] Module name appears in the breadcrumb as a `Label2` with a clickable link to the course index
- [ ] When `youtubeVideoId` is set, a `<Video>` embed is shown instead of the cover image
- [ ] When only `cover` is set (no `youtubeVideoId`), the cover image is shown
- [ ] When neither is set, neither cover nor video is shown
- [ ] Prev lesson link reads "← Previous"; next reads "Next up: [title] →"
- [ ] Lessons are ordered by `order` ASC, not by date
- [ ] When `articleSlug` is set, a "Read the article" link is rendered after the article body

## Extension Points
- Add a new lesson: create a new `index.md` in the appropriate module folder with a unique `order` value
- Add a new module: create a new folder inside `content/courses/tltr-typescript/` and set `module` frontmatter on its lessons
- Add a new course: create a new `gatsby-source-filesystem` entry in `gatsby-config.js`, a new `createPages` query in `gatsby-node.js` filtering on a new `type` value, and a new template in `src/templates/`
