---
# Feature: Talk Pages
status: current
last-extracted: 2026-03-19
files: src/templates/talkPage.js, src/pages/talks.js, content/talks/
---

## Summary
Displays a listing of conference talks grouped by year, and individual talk pages with a full-bleed cover, conference attribution, article body, and prev/next navigation.

## Current Implementation

### Entry Points
- `gatsby-node.js` `createPages` — queries all `markdownRemark` nodes where `frontmatter.type === "talk"`, sorted by `date ASC`, and creates each at `/talks/[slug]` using `src/templates/talkPage.js`
- `src/pages/talks.js` — Gatsby file-based page at `/talks`; queries all talks sorted by date DESC and groups them by year

### Key Files
| File | Role |
|---|---|
| `src/templates/talkPage.js` | Individual talk page template; nearly identical to `blogPost.js` but reads `conference` frontmatter field and displays it as a second `Label2` below the date |
| `src/pages/talks.js` | Talks listing page; groups talk nodes by `getFullYear()` and renders each year as a `<PostList>` section headed by a `Label2` year label |
| `content/talks/[slug]/index.md` | Source Markdown with required frontmatter |
| `content/talks/[slug]/cover.png` | Required hero image |

### Data Flow
```
content/talks/[slug]/index.md  (type: talk)
  → gatsby-transformer-remark → MarkdownRemark node

gatsby-node.js createPages
  → createPage({ path: `talks/${slug}`, component: talkPage.js, context: { id, previousPageId, nextPageId } })

talkPage.js (TalkPageTemplate)
  → GraphQL query: TalkPageBySlug
      → { html, frontmatter: { title, date, description, conference, cover } }
      → previous / next  → { fields.slug, frontmatter: { title, cover } }
  → renders:
      <Header breadcrumb="Talks" breadcrumbLink="/talks" />
      <CodeHighlighter />
      <Label2>{date}</Label2>
      <Label2>{conference}</Label2>       ← unique to talks
      <Heading1>{title}</Heading1>
      <GatsbyImage cover />               ← full-bleed, min 67vh
      <ArticleSection html />
      <SignUp />
      <AuthorAside />
      prev/next <Link> → `/talks${slug}`
      <Footer />
      <DynamicCover />

talks.js (listing page)
  → GraphQL: all type:talk sorted by date DESC
  → groups nodes by year → { 2024: [...], 2023: [...] }
  → renders one <PostList> per year, sorted years DESC
  → each item: <PostItem to={`/talks${slug}`}> with DynamicCover hover
```

### Conventions Applied
- `SectionStyles` (max-width 640px/750px) and `BlogStyles` composed identically to `blogPost.js`
- `breadcrumbLink="/talks"` passed to `<Header>` so the breadcrumb is a clickable link back to the listing (unlike blog posts where breadcrumb is plain text)
- Talks prev/next navigation links prefix `/talks` to the raw slug (blog posts do not need this because slugs are root-level)

## Dependencies
- **Depends on:** design-system, dark-mode, code-syntax-highlighting, image-optimization, seo-meta, site-layout, newsletter-signup, dynamic-cover-preview, post-listing (PostItem/PostList components), content-pipeline
- **Required by:** nothing (leaf feature)

## Boundaries
- Talk slugs are prefixed with `/talks/` at the page creation level — do NOT reference them as root-level paths
- The `conference` frontmatter field is required for talks; omitting it renders an empty `Label2` element
- Do NOT reuse the blog post template for talks — the `breadcrumbLink` and `conference` display require the separate `talkPage.js` template

## Acceptance Criteria
- [ ] `/talks` lists all talks, grouped by year in descending order
- [ ] Each year group is headed by a `Label2` year label
- [ ] Hovering a talk title on the listing page triggers the DynamicCover preview
- [ ] Navigating to `/talks/[slug]` renders the talk title as `<h1>`
- [ ] Conference name appears as a `Label2` element below the date
- [ ] The header breadcrumb reads "Talks" and links back to `/talks`
- [ ] Cover image is displayed full-bleed
- [ ] Previous and next talk links navigate to `/talks/[other-slug]`
- [ ] Hovering prev/next link shows DynamicCover preview
- [ ] SEO title is set from frontmatter

## Extension Points
- Add a new field to talk pages: declare in `createSchemaCustomization` in `gatsby-node.js`, add to the `TalkPageBySlug` GraphQL query, and render in `talkPage.js`
- Add a new listing grouping (e.g., by conference): modify the `reduce` logic in `talks.js`
