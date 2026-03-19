---
# Feature: Links Page
status: current
last-extracted: 2026-03-19
files: src/pages/links.js, content/links/links.json
---

## Summary
A curated list of links (social profiles, blog, courses) rendered at `/links`, sourced from a static JSON file. Intended as a link-in-bio landing page.

## Current Implementation

### Entry Points
- `src/pages/links.js` — Gatsby file-based page at `/links`

### Key Files
| File | Role |
|---|---|
| `src/pages/links.js` | Renders `<Header>`, a `<Heading1>` "Links", and a `<ul>` of anchor links from the JSON array |
| `content/links/links.json` | Array of `{ title: string, url: string }` objects. URLs can be absolute or site-relative paths. |

### Data Flow
```
content/links/links.json
  → imported directly as a JS module (no GraphQL, no gatsby-source-filesystem)

links.js
  → import links from '../../content/links/links.json'
  → render: links.map(link => <StyledLink href={link.url}>{link.title}</StyledLink>)
```

### Conventions Applied
- `StyledLink` uses Merriweather 300, 1.25rem — same visual style as `PostItem` link font, but implemented inline as a styled `<a>` rather than using the `PostItem` component (since this is `<a>`, not Gatsby `<Link>`)
- `text-decoration: none` on links — override of the global `text-decoration: underline` from `GlobalStyles.js`

## Dependencies
- **Depends on:** design-system, seo-meta, site-layout (Header, Footer)
- **Required by:** nothing (leaf feature)

## Boundaries
- `links.json` is NOT sourced via `gatsby-source-filesystem` — it is a direct JS import. Do NOT add a GraphQL query for this data
- Do NOT change the data format to Markdown or MDX — the JSON array is the intentional data format for this simple list
- ⚠️ `StyledLink` hardcodes the Merriweather font and sizing inline (not using a Typography token) — do not DRY this into `PostItem` as they are semantically different elements (`<a>` vs Gatsby `<Link>`)

## Acceptance Criteria
- [ ] `/links` renders a list of all items from `links.json`
- [ ] Each item renders as an anchor with the correct `href`
- [ ] Internal paths (e.g., `/`, `/tltr-ts-landing`) work as relative links
- [ ] External URLs open correctly
- [ ] The page header shows "Links" as breadcrumb

## Extension Points
- Add a link: append a `{ "title": "…", "url": "…" }` entry to `content/links/links.json`
- Remove a link: delete its entry from the JSON array
- Add link metadata (e.g., icons): extend the JSON schema and update `links.js` to render it
