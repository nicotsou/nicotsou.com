---
# Feature: Post Listing (Blog Homepage)
status: current
last-extracted: 2026-03-19
files: src/pages/index.js, src/components/PostList.js, src/components/PostItem.js
---

## Summary
The homepage (`/`) displays the site identity (logo, tagline, bio) and a chronological list of all blog posts. Hovering any post title triggers the DynamicCover preview. The tagline is sourced from a `quote` frontmatter field on one of the posts.

## Current Implementation

### Entry Points
- `src/pages/index.js` — Gatsby file-based page at `/`

### Key Files
| File | Role |
|---|---|
| `src/pages/index.js` | Homepage: renders Logo, tagline (from `quote` frontmatter), bio label, and `<PostList>` of all posts sorted by date DESC. Manages DynamicCover hover state. |
| `src/components/PostList.js` | Styled `<ul>` wrapper (`list-style: none`, `margin-top: 5rem`). Accepts `onMouseLeave` to clear the cover preview. |
| `src/components/PostItem.js` | Styled `<li>` + Gatsby `<Link>`. Font: Merriweather 300, 1.25rem. Fires `onLinkHover` (passed as `onMouseEnter`). |

### Data Flow
```
gatsby build / page request
  → GraphQL query on index.js:
      allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "post" } } }
        sort: { frontmatter: { date: DESC } }
      )
      → nodes: [{ excerpt, fields.slug, frontmatter: { date, title, description, quote, cover } }]

index.js render:
  → find first node with frontmatter.quote → display as tagline (Aside1 styled)
  → map all nodes → <PostItem to={slug} onLinkHover={() => handlePostHover(node)}>
  → <DynamicCover visible={isCoverVisible} cover={highlightedPost?.frontmatter?.cover} />

Hover interaction:
  PostItem.onMouseEnter → index.js handlePostHover(node)
    → setHighlightedPost(node)  (retains last value for fade-out)
    → setIsCoverVisible(true)
  PostList.onMouseLeave → handlePostHover(null)
    → setIsCoverVisible(false)  (does NOT clear highlightedPost)
```

### Conventions Applied
- `Aside1` (Merriweather 300, 1.8rem) for the tagline; `Label1` (Ubuntu 300) for the bio line — both from Typography.js
- Pride gradient applied to tagline during June (`new Date().getMonth() === 5 && Pride`) — seasonal easter egg
- `Logo` renders as size `Logo.sizes.large` (default, 3em) on the homepage
- No `<Header>` component — the homepage uses `<Logo>` directly with top margin `calc(100vh * 20 / 100)` for vertical centering

## Dependencies
- **Depends on:** design-system, dynamic-cover-preview, image-optimization, seo-meta, site-layout (Footer, Logo), content-pipeline
- **Required by:** nothing (leaf feature)

## Boundaries
- The `quote` field is read from the first post that has it — it is NOT a dedicated frontmatter field on the homepage itself; do not add a separate `quote.md` content file
- `PostItem` hardcodes the link font as Merriweather 300 (not a token from Typography.js) — do NOT change this to a generic body font
- The homepage has no `<Header>` — do not add one; the Logo serves as navigation

## Acceptance Criteria
- [ ] `/` renders a list of all blog posts sorted by date (newest first)
- [ ] The Logo is displayed at the top with ~20vh top margin
- [ ] A tagline sourced from the `quote` field of a post is displayed below the logo
- [ ] Author bio ("Nicos Tsourektsidis, Software Architect. Based in Zurich, CH") is displayed below the tagline
- [ ] Hovering a post title triggers the DynamicCover background preview
- [ ] Moving the cursor off the post list fades out the background preview
- [ ] During June, the tagline renders with the Pride rainbow gradient

## Extension Points
- Change the tagline: add or update a `quote` frontmatter field on any blog post (the first node with this field wins)
- Add a post listing filter (e.g., by tag): extend the GraphQL filter in `index.js` and add a frontmatter field in `gatsby-node.js` `createSchemaCustomization`
- Add a second listing section (e.g., featured posts): add a second GraphQL query or filter nodes client-side after the existing query
