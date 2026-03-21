# agents.md — nicotsou.com

Gatsby 5 personal blog and course site. Content is Markdown, UI is React + Styled Components.

---

## Commands

```bash
# Development
yarn develop                   # Local dev server at http://localhost:8000
yarn start                     # Dev server exposed on all interfaces (0.0.0.0)

# Production
yarn build                     # Production build (output: public/)
yarn serve                     # Serve production build on all interfaces

# Maintenance
yarn clean                     # Clear Gatsby cache (.cache/ and public/)

# Unit tests
yarn test                      # Jest in watch mode (local development)
yarn test:ci                   # Jest single run (CI / pre-commit)

# E2E tests (requires dev server)
yarn test:e2e                  # Start dev server + open Cypress UI
yarn test:e2e:ci               # Start dev server + run Cypress headlessly
yarn cy:open                   # Open Cypress UI (assumes server already running)
yarn cy:run                    # Run Cypress headlessly (assumes server already running)
```

---

## Project Structure

```
nicotsou.com/
├── content/                   # All authored content lives here
│   ├── blog/                  # Blog posts (type: post)
│   │   └── [slug]/
│   │       ├── index.md       # Frontmatter + Markdown body
│   │       ├── cover.png      # Hero image (required)
│   │       └── images/        # Images referenced in the post
│   ├── talks/                 # Conference talk pages (type: talk)
│   │   └── [slug]/
│   │       ├── index.md
│   │       └── cover.png
│   ├── courses/               # Course content (type: course)
│   │   └── tltr-typescript/
│   │       └── [module]/
│   │           └── [lesson]/
│   │               ├── index.md
│   │               └── cover.png  (optional)
│   ├── links/
│   │   └── links.json         # Navigation / social links list
│   ├── mdPages/               # Standalone Markdown pages (e.g. /uses)
│   └── assets/                # Shared static assets
│
├── src/
│   ├── components/
│   │   ├── Layout/            # Header, Footer, AuthorAside, Divider, Logo
│   │   ├── DynamicCover.js    # Hover-preview cover image effect
│   │   ├── PostItem.js        # Blog post card
│   │   ├── PostList.js        # Blog post listing
│   │   ├── SignUp.js          # Newsletter signup form
│   │   ├── Video.js           # YouTube embed wrapper
│   │   └── seo.js             # <head> SEO component
│   ├── pages/                 # Gatsby file-based pages
│   ├── styles/
│   │   ├── Colors.js          # CSS custom property definitions + Pride gradient
│   │   ├── Typography.js      # Full type scale (tokens as css`` + styled components)
│   │   ├── BlogStyles.js      # Markdown body rendering styles
│   │   ├── GlobalStyles.js    # Root variable overrides, dark mode, anchor styles
│   │   ├── CodeHighlighter.js # Prism syntax highlighting
│   │   └── LandingTypography.js
│   └── templates/
│       ├── blogPost.js        # Renders type: post
│       ├── talkPage.js        # Renders type: talk
│       └── coursePage.js      # Renders type: course
│
├── cypress/                   # E2E tests
├── gatsby-config.js
├── gatsby-node.js             # Page creation + routing logic
└── jest.config.js
```

---

## Code Conventions

### Styled Components

- All styling is Styled Components v5. No plain CSS files (except `normalize.css` and Prism themes).
- CSS custom properties from `Colors.js` are consumed via `rgba(var(--name-value), opacity)`.
- To reuse a type token inside a `css` block, import the `*Styles` export:

  ```js
  import { Body1Styles } from '../styles/Typography'

  const MyParagraph = styled.p`
    ${Body1Styles}
    margin-top: 2rem;
  `
  ```

- To use a type token as a component directly, import the named component:

  ```js
  import { Label2, Heading1 } from '../styles/Typography'
  ```

- To extend an existing styled component:

  ```js
  const StyledHeading1 = styled(Heading1)`
    margin-right: 2rem;
  `
  ```

- Use `createGlobalStyle` only in `src/styles/` files, never inside component files.

### Color System (`src/styles/Colors.js`)

All colors are declared as raw RGB channel values so opacity can be controlled at the use site.

| Token | Description |
|---|---|
| `--white-value` | 255, 255, 255 |
| `--leather-value` | Dark teal (primary text in light mode) |
| `--dark-leather-value` | Deeper teal (background in dark mode) |
| `--light-sea-green-value` | Accent green |
| `--mosque-value` | Dark green |
| `--violet-redish-value` | Violet/pink accent |
| `--buddha-gold-value` | Gold accent |
| `--raw-umber-value` | Brown accent |
| `--tltr-blue-value` | TLTR brand blue |
| `--tltr-black-value` | TLTR brand black |
| `--tltr-awesome-value` | TLTR brand pink/magenta |

**Semantic variables** (defined in `GlobalStyles.js`, swap automatically in dark mode):

| Variable | Light | Dark |
|---|---|---|
| `--text-color` | `--leather-value` | `--white-value` |
| `--bg-color` | `--white-value` | `--dark-leather-value` |
| `--caption-color` | `--leather-value` | `--white-value` |
| `--box-bg-opacity` | `0.03` | `0.03` |

Always use semantic variables (`--text-color`, `--bg-color`) for foreground/background. Use raw palette tokens only when you need a specific accent color.

### Typography Scale (`src/styles/Typography.js`)

Each token ships as both a `css` object (`*Styles`) and a styled component.

| Token | Element | Font | Size |
|---|---|---|---|
| `Body1` | `p`, `li` | Merriweather Sans 300 | clamp(17px–19px) |
| `Body2` | `p` | inherited | 0.95rem |
| `Body3` | `p` | inherited | 0.9rem |
| `Heading1` | `h1` | Merriweather 300 | 2.2rem |
| `Heading2` | `h2` | Merriweather 400 | 1.6rem |
| `Heading3` | `h3` | Merriweather 400 | 1.25rem |
| `Heading4` | `h4` | Merriweather Sans 700 | 1rem |
| `Heading5` | `h5` | Merriweather Sans 700 | 1rem |
| `Heading6` | `h6` | Merriweather Sans 300 | 1rem |
| `Label1` | `div` | Ubuntu 300 | 1.1rem — for captions |
| `Label2` | `div` | Ubuntu 300 | 0.85rem uppercase — for dates, metadata |
| `Label3` | `div` | Ubuntu 300 | 0.7rem uppercase |
| `Code` | `div` | Inconsolata 400 | 1.05rem |
| `Aside1` | `div` | Merriweather 300 | 1.8rem — for pull quotes |
| `Aside2` | `div` | Merriweather 300 | 1.25rem — for long callouts |

### Dark Mode

Dark mode is handled entirely via CSS custom property overrides in `GlobalStyles.js`. Never use JS to detect color scheme. Pattern:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --text-color: var(--white-value);
    --bg-color: var(--dark-leather-value);
  }
}
```

### Image Conventions

- Images with `alt` text starting with `"Diagram"` are automatically color-inverted in dark mode (via `BlogStyles.js`). Use this naming convention for all technical diagrams.
- Cover images should be placed in the same folder as `index.md` and referenced as `'./cover.png'`.

---

## Frontmatter Schemas

### Blog Post (`type: post`)

```yaml
---
title: String           # required — displayed as h1
date: '2025-01-15T22:12:00.000Z'  # required — ISO 8601, used for sort order and display
description: String     # required — used in SEO <meta> and post previews
type: post              # required — must be exactly "post"
cover: './cover.png'    # required — relative path to cover image in same folder
---
```

### Conference Talk (`type: talk`)

```yaml
---
title: String           # required
date: '2024-11-30T22:12:00.000Z'  # required — ISO 8601
description: String     # required — SEO
type: talk              # required — must be exactly "talk"
conference: String      # required — e.g. "Geekle Architecture Online Summit"
cover: './cover.png'    # required — relative path
---
```

### Course Lesson (`type: course`)

```yaml
---
title: String           # required
module: String          # required — e.g. "Core Concepts" (shown as breadcrumb)
type: course            # required — must be exactly "course"
order: 700              # required — integer, controls lesson sequence (ASC)
description: String     # optional — SEO fallback
cover: './cover.png'    # optional — shown only when no youtubeVideoId
youtubeVideoId: String  # optional — YouTube video ID; replaces cover when present
articleSlug: String     # optional — slug of a related blog post, e.g. /my-article
---
```

> **URL generation:** Blog posts use the folder name as their slug (e.g. `content/blog/my-post/` → `/my-post`). Talks become `/talks/[slug]`. Course lessons become `/courses/tltr-typescript/[slug]`. Slugs are derived from the folder path by `gatsby-node.js` — do not add a `slug` field manually.

---

## Boundaries

### ✅ Always do

- Run `yarn test:ci` before committing — catches regressions in components
- Place cover images in the same directory as `index.md` and reference them as `'./cover.png'`
- Use semantic CSS variables (`--text-color`, `--bg-color`) rather than raw palette values for foreground/background
- Import `*Styles` tokens when composing styles inside `css` tagged templates
- Start diagram image alt text with `"Diagram"` so they auto-invert in dark mode

### ⚠️ Ask first

- Changing anything in `src/styles/GlobalStyles.js` — affects every page
- Adding new color tokens to `Colors.js` — must fit the palette
- Modifying URL patterns in `gatsby-node.js` — breaks existing links and SEO
- Adding new content types — requires new GraphQL queries and a template
- Changing `gatsby-config.js` plugin configuration

### 🚫 Never do

- Modify the design system files (`Colors.js`, `Typography.js`) without explicit approval — they are the single source of truth for the entire visual language
- Change link colors — links use `color: inherit` globally by design; hover fades to 50% opacity. Do not override this with custom colors
- Set `color` or `background` directly on elements using hex/rgb literals — always go through CSS custom properties
- Add inline styles (`style={{ }}`) for anything that should be part of the design system
- Use `!important` except in the rare layout overrides already present in `BlogStyles.js`
- Commit without running tests
