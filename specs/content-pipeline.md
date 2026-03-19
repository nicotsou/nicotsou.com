---
# Feature: Content Pipeline
status: current
last-extracted: 2026-03-19
files: gatsby-node.js, gatsby-config.js
---

## Summary
The build-time system that ingests Markdown files, derives URL slugs from folder paths, creates pages for each content type using the appropriate template, customizes the GraphQL schema, and defines short-link redirects.

## Current Implementation

### Entry Points
- `gatsby-node.js` — exports `createPages`, `onCreateNode`, `createSchemaCustomization`
- `gatsby-config.js` — `gatsby-source-filesystem` entries define which directories are sourced

### Key Files
| File | Role |
|---|---|
| `gatsby-node.js` | Three exported functions: page creation, slug generation, schema customization |
| `gatsby-config.js` | `gatsby-source-filesystem` entries for `content/blog`, `content/courses/tltr-typescript`, `content/talks`, `src/images/`, `src/pages/`, `content/assets` |

### Data Flow
```
gatsby-source-filesystem
  → watches: content/blog/, content/courses/tltr-typescript/, content/talks/, src/images/, src/pages/, content/assets/
  → creates File nodes for all files found

gatsby-transformer-remark
  → transforms .md File nodes into MarkdownRemark nodes
  → applies remark plugins (images, prismjs, video, etc.)

onCreateNode (gatsby-node.js)
  → for each MarkdownRemark node:
      createNodeField({ name: 'slug', value: createFilePath(node, getNode) })
      → e.g. content/blog/my-post/index.md → slug: /my-post/

createSchemaCustomization (gatsby-node.js)
  → explicitly types: SiteSiteMetadata, Author, Social, MarkdownRemark, Frontmatter, Fields
  → Frontmatter fields: title, description, date, type, youtubeVideoId, order (Int), module, articleSlug
  → ensures queries return null instead of errors for missing optional fields

createPages (gatsby-node.js)
  → Query 1: allMarkdownRemark where type=post, sort by date ASC
      → forEach post: createPage({ path: slug, component: blogPost.js, context: {id, previousPostId, nextPostId} })

  → Query 2: allMarkdownRemark where type=course, sort by order ASC
      → forEach page: createPage({ path: `courses/tltr-typescript${slug}`, component: coursePage.js, context: {id, previousPageId, nextPageId, type:'course'} })

  → Query 3: allMarkdownRemark where type=talk, sort by date ASC
      → forEach page: createPage({ path: `talks${slug}`, component: talkPage.js, context: {id, previousPageId, nextPageId, type:'talk'} })

  → createRedirect:
      /l/prompt-engineering-masterclass-talk → /talks/prompt-engineering-masterclass
      (isPermanent: true, redirectInBrowser: true)
```

### Conventions Applied
- Slugs are derived from file system paths — folder names become URL segments, no manual `slug` frontmatter needed
- Content type routing determined by `frontmatter.type` value (`"post"`, `"course"`, `"talk"`)
- Course lessons use `order` (integer) for sequence, not `date`

## Dependencies
- **Depends on:** nothing (foundational build system)
- **Required by:** blog-post-rendering, talk-pages, course-pages (all depend on pages being created here)

## Boundaries
- Do NOT change the slug generation in `onCreateNode` — it determines all URLs; changes would break existing links and invalidate the sitemap
- Do NOT change the `path` prefix patterns (`talks${slug}`, `courses/tltr-typescript${slug}`) — they are hardcoded in templates' navigation links as well
- Do NOT add a manual `slug` field to content frontmatter — it is ignored; the slug is always derived from the folder name
- Any new `frontmatter` field type must be declared in `createSchemaCustomization` to avoid build errors on empty nodes
- The redirect rule for `/l/prompt-engineering-masterclass-talk` is a published short link — do NOT remove it

## Acceptance Criteria
- [ ] Running `gatsby build` creates one page per `content/blog/[slug]/index.md` at `/${slug}`
- [ ] Running `gatsby build` creates one page per talk at `/talks/${slug}`
- [ ] Running `gatsby build` creates one page per course lesson at `/courses/tltr-typescript/${slug}`
- [ ] Blog posts are sorted by `date` ASC for prev/next navigation
- [ ] Course lessons are sorted by `order` ASC for prev/next navigation
- [ ] Talk pages are sorted by `date` ASC for prev/next navigation
- [ ] Accessing `/l/prompt-engineering-masterclass-talk` redirects to `/talks/prompt-engineering-masterclass`
- [ ] Removing all blog posts does not cause a build error (schema customization handles empty collections)

## Extension Points
- Add a new content type: create a new `gatsby-source-filesystem` entry in `gatsby-config.js`, a new GraphQL query in `createPages` filtering on the new `type` value, and a new template
- Add a new frontmatter field: declare it with the correct type in `createSchemaCustomization`
- Add a new redirect: add a `createRedirect` call to `createPages`
