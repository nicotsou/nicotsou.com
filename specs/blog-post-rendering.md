---
# Feature: Blog Post Rendering
status: current
last-extracted: 2026-03-19
files: src/templates/blogPost.js, src/styles/BlogStyles.js, content/blog/
---

## Summary
Renders individual blog posts from Markdown files, including a full-bleed cover image, styled article body, previous/next navigation, author aside, and newsletter signup form.

## Current Implementation

### Entry Points
- `gatsby-node.js` `createPages` — queries all `markdownRemark` nodes where `frontmatter.type === "post"`, sorted by `date ASC`, and creates a page for each at its slug path using `src/templates/blogPost.js`

### Key Files
| File | Role |
|---|---|
| `src/templates/blogPost.js` | Page template: renders header, cover image, article body (via `dangerouslySetInnerHTML`), prev/next nav, author aside, signup form, and DynamicCover hover effect |
| `src/styles/BlogStyles.js` | `css` snippet applied to the `ArticleSection` wrapper; maps Markdown-generated HTML elements (h1–h6, p, blockquote, code, pre, aside, img, hr, details) to design system tokens |
| `content/blog/[slug]/index.md` | Source Markdown file with frontmatter + content body |
| `content/blog/[slug]/cover.png` | Required hero image, referenced as `'./cover.png'` in frontmatter |
| `content/blog/[slug]/images/` | Optional folder for images referenced within the post body |

### Data Flow
```
content/blog/[slug]/index.md
  → gatsby-transformer-remark
      → gatsby-remark-images (processes local images, creates responsive sets)
      → gatsby-remark-prismjs (wraps code blocks with Prism classes)
      → gatsby-remark-embed-video (converts !video[] syntax to iframes)
      → gatsby-remark-embed-spotify (converts Spotify links)
      → gatsby-remark-smartypants (typography quotes/dashes)
      → gatsby-remark-copy-linked-files (copies non-image assets)
  → GraphQL MarkdownRemark node (html, frontmatter, fields.slug)

gatsby-node.js createPages
  → createPage({ path: slug, component: blogPost.js, context: { id, previousPostId, nextPostId } })

blogPost.js (at build/request time)
  → GraphQL query: BlogPostBySlug
      → markdownRemark(id) → { html, frontmatter: { title, date, description, cover } }
      → previous markdownRemark → { fields.slug, frontmatter: { title, cover } }
      → next markdownRemark     → { fields.slug, frontmatter: { title, cover } }
  → renders:
      <Header breadcrumb="Blog" />
      <CodeHighlighter />           ← injects Prism token colors globally
      <Label2>{date}</Label2>
      <Heading1>{title}</Heading1>
      <GatsbyImage cover />         ← full-bleed, min 67vh, max 1250px wide
      <ArticleSection               ← BlogStyles + SectionStyles
        dangerouslySetInnerHTML={{ __html: html }}
      />
      prev/next <Link> navigation
      <AuthorAside />
      <SignUp />
      <Footer />
      <DynamicCover />              ← triggered on prev/next hover
```

### Conventions Applied
- `BlogStyles` is a `css` snippet (not a component) composed into `ArticleSection` via tagged template (Styled Components section in AGENTS.md)
- Cover image referenced as relative path `'./cover.png'` in frontmatter (Image Conventions section)
- Images with `alt` starting with `"Diagram"` auto-invert in dark mode (Image Conventions section)
- Image captions use `_italic text_` immediately after an image in Markdown, rendered as `<em>` and styled with `Label2Styles`
- `SectionStyles` caps article width at 640px (750px at ≥780px) with `1rem` padding

## Dependencies
- **Depends on:** design-system, dark-mode, code-syntax-highlighting, image-optimization, seo-meta, site-layout, newsletter-signup, dynamic-cover-preview, content-pipeline
- **Required by:** nothing (leaf feature)

## Boundaries
- Do NOT change the slug generation strategy — slugs come from folder names via `createFilePath` in `gatsby-node.js`; changing this breaks existing URLs
- Do NOT use `type` values other than `"post"` in blog post frontmatter — the page creation query filters on this exact string
- Do NOT modify `BlogStyles.js` without considering the impact on all content types that use it (blog posts, talk pages, course pages, and the talks listing page all apply `BlogStyles`)
- Do NOT change `dangerouslySetInnerHTML` to MDX rendering without migrating content — the pipeline is `gatsby-transformer-remark`, not `gatsby-plugin-mdx`
- Cover image is required — omitting it will cause a build error in the GraphQL query

## Acceptance Criteria
- [ ] Navigating to a blog post slug renders the post title as `<h1>`
- [ ] The cover image is displayed at full-bleed width with a minimum height of 67vh
- [ ] Post date is displayed using `Label2` styling
- [ ] Markdown headings render with correct type scale (h2 → Heading2, etc.)
- [ ] Code blocks render with Prism syntax highlighting
- [ ] `<aside>` blocks in Markdown render with the styled box treatment
- [ ] `<blockquote>` blocks in Markdown render with Aside1 font styling
- [ ] Images with alt text starting with `"Diagram"` are inverted in dark mode
- [ ] Previous and next post links appear at the bottom when those posts exist
- [ ] Hovering over prev/next link shows DynamicCover preview
- [ ] AuthorAside and SignUp form appear after the article body
- [ ] SEO `<title>` and meta tags are populated from frontmatter

## Extension Points
- Add a new Markdown plugin: add to the `gatsby-transformer-remark.plugins` array in `gatsby-config.js`
- Add a new frontmatter field: declare it in `gatsby-node.js` `createSchemaCustomization` and add to the `BlogPostBySlug` GraphQL query in `blogPost.js`
- Add a new frontmatter field as `type: post` required: also update the AGENTS.md frontmatter schema table
