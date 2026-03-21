---
# Feature: Dynamic Cover Preview
status: current
last-extracted: 2026-03-19
files: src/components/DynamicCover.js
---

## Summary
On hover over post/talk title links, the cover image of the hovered item fades in as a full-viewport grayscale background, creating a cinematic preview effect without navigation.

## Current Implementation

### Entry Points
- `DynamicCover` is rendered by: `src/pages/index.js`, `src/pages/talks.js`, `src/pages/404.js`, `src/templates/blogPost.js`, `src/templates/talkPage.js`
- In each consumer: a `useState` pair (`highlightedPost`/`isCoverVisible`) tracks which post is hovered; `visible` and `cover` props are passed to `DynamicCover`

### Key Files
| File | Role |
|---|---|
| `src/components/DynamicCover.js` | Fixed full-viewport overlay (`z-index: -1`); uses `react-transition-group` `<Transition>` for 300ms opacity fade; renders `<GatsbyImage>` with grayscale/opacity/contrast filter |

### Data Flow
```
User hovers PostItem link (index.js / talks.js) or prev/next link (blogPost.js / talkPage.js)
  → onMouseEnter → setHighlightedPost(node) + setIsCoverVisible(true)

User moves cursor off PostList or prev/next link
  → onMouseLeave → setIsCoverVisible(false)
  (note: setHighlightedPost is NOT cleared on leave — the last image stays loaded
   to prevent a flash during the fade-out transition)

DynamicCover({ cover, visible })
  → getImage(cover) → GatsbyImage data
  → <Transition in={visible} timeout={1000}>
      → state: entering/entered → opacity: 1
      → state: exiting/exited  → opacity: 0
    (transition CSS: 300ms ease-in-out on BackgroundImage)
  → BackgroundImage (fixed, z-index: -1, full viewport)
      → filter: grayscale(1) opacity(0.2) brightness(1.2) contrast(1.3)
      → backgroundColor: rgba(var(--bg-color), 0.5) on enter/exit states
```

### Conventions Applied
- `rgba(var(--bg-color), 0.5)` used for the overlay tint — adapts to dark mode automatically (Color System section in AGENTS.md)
- `role="presentation"` on the `GatsbyImage` — decorative image, no alt text needed (accessibility)
- `backface-visibility: hidden` and `transform-style: preserve-3d` on the container — GPU compositing hint for smooth transitions

## Dependencies
- **Depends on:** design-system (CSS custom property for tint), image-optimization (GatsbyImage)
- **Required by:** post-listing (index.js), talk-pages (talks.js + talkPage.js), blog-post-rendering (blogPost.js), 404 page

## Boundaries
- `DynamicCover` requires an optimized `GatsbyImage` data object — passing a plain URL string will silently render nothing
- The `z-index: -1` is intentional — the overlay must sit behind all page content
- Do NOT increase opacity above `0.2` — the effect is meant to be subtle

## Acceptance Criteria
- [ ] Hovering a post/talk title on the listing page fades in that item's cover image as a full-viewport background
- [ ] Moving the cursor off the list fades the image out (300ms transition)
- [ ] The background image is desaturated (grayscale)
- [ ] The background image does not obscure page text
- [ ] The last-hovered image remains visible during the fade-out (no flash to empty)
- [ ] The effect works on the 404 page with blog post covers
- [ ] Hovering prev/next navigation links on a blog/talk page shows that linked post's cover

## Extension Points
- To add DynamicCover to a new page/template: maintain a `useState(null)` for the highlighted item and a `useState(false)` for visibility; pass `cover` and `visible` to `<DynamicCover>`; attach `onMouseEnter`/`onMouseLeave` to the link elements
- To change the visual filter: edit the `filter` property on `BackgroundImage` in `DynamicCover.js`
