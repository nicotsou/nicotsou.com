---
# Feature: Code Syntax Highlighting
status: current
last-extracted: 2026-03-19
files: src/styles/CodeHighlighter.js, gatsby-config.js
---

## Summary
Provides syntax-highlighted code blocks in all Markdown-rendered content using Prism.js with a custom theme that uses the site's CSS custom property color system, ensuring automatic dark mode adaptation.

## Current Implementation

### Entry Points
- `gatsby-config.js` — `gatsby-remark-prismjs` plugin processes code fences in Markdown at build time, adding Prism token classes to `<pre><code>` blocks
- `src/styles/CodeHighlighter.js` — a `createGlobalStyle` component rendered inside all content templates to inject the Prism token color rules into the document

### Key Files
| File | Role |
|---|---|
| `src/styles/CodeHighlighter.js` | `createGlobalStyle` that maps all Prism token classes (`.token.comment`, `.token.keyword`, etc.) to `rgba(var(--text-color), opacity)` values. Also styles `pre` and inline `code` blocks. |
| `gatsby-config.js` | Configures `gatsby-remark-prismjs` with `showLineNumbers: true`, a `language-` class prefix, `noInlineHighlight: false`, and a custom `superscript` language extension |

### Data Flow
```
Markdown source (``` js ... ```)
  → gatsby-remark-prismjs (build time)
      → wraps tokens in <span class="token keyword">, <span class="token string">, etc.
      → adds line-number markup when showLineNumbers: true
  → HTML string in MarkdownRemark.html

<CodeHighlighter /> (rendered in template)
  → injects global CSS:
      .token.keyword { color: rgba(var(--text-color), 0.5) }
      .token.string  { color: rgba(var(--text-color), 0.5) }
      … (all token types mapped to --text-color at varying opacities)
      pre[class*='language-'] { overflow: auto; word-break: normal; }
      :not(pre) > code[class*='language-'] { padding/bg/border-radius }
      .line-highlight { box-shadow: inset 5px 0 0 rgb(var(--light-sea-green-value)) }
      .gatsby-highlight-code-line { background: rgba(var(--text-color), 0.03) }
```

### Conventions Applied
- All token colors use `rgba(var(--text-color), opacity)` — no hardcoded hex values — so they adapt automatically to dark mode (Color System section in AGENTS.md)
- `createGlobalStyle` placed in `src/styles/` only (Styled Components section)
- Line highlights use `--light-sea-green-value` as the accent (palette token, not a semantic variable)

## Dependencies
- **Depends on:** design-system (CSS custom properties for all token colors)
- **Required by:** blog-post-rendering, talk-pages, course-pages (all content templates render `<CodeHighlighter />`)

## Boundaries
- Do NOT add a separate Prism theme CSS import — the entire theme is defined in `CodeHighlighter.js` using CSS custom properties; adding a standard Prism theme would conflict
- Do NOT change token colors to hardcoded values — dark mode adaptation requires they use `--text-color`
- The `superscript` language extension in `gatsby-config.js` is a custom addition; do not remove it without confirming it's not used in content

## Acceptance Criteria
- [ ] Fenced code blocks in Markdown render with token-level coloring
- [ ] Inline code renders with a subtle background and border-radius
- [ ] Code block token colors are legible in both light and dark mode
- [ ] Line numbers are displayed by default (configured via `showLineNumbers: true`)
- [ ] Line highlights render with a green left-border accent
- [ ] Code blocks do not break words at small viewports (word-break: normal)

## Extension Points
- Add a new language alias: extend the `aliases` object in `gatsby-remark-prismjs` options in `gatsby-config.js`
- Change a token color: update the corresponding `.token.*` rule in `CodeHighlighter.js`, keeping the `rgba(var(--text-color), N)` pattern
- Add a new Prism plugin (e.g., line numbers): add the plugin CSS import to `gatsby-browser.js` and enable the option in `gatsby-config.js`
