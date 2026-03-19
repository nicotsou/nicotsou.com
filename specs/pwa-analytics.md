---
# Feature: PWA, Analytics & Sitemap
status: current
last-extracted: 2026-03-19
files: gatsby-config.js, gatsby-browser.js
---

## Summary
Three infrastructure features configured entirely via Gatsby plugins: a Progressive Web App manifest + offline support, Google Analytics 4 event tracking, and automatic XML sitemap generation.

## Current Implementation

### Entry Points
- All three are configured in `gatsby-config.js` as plugin entries
- `gatsby-browser.js` handles the service worker update lifecycle

### Key Files
| File | Role |
|---|---|
| `gatsby-config.js` | Plugin configs for `gatsby-plugin-manifest`, `gatsby-plugin-offline`, `gatsby-plugin-google-gtag`, `gatsby-plugin-sitemap` |
| `gatsby-browser.js` | `onServiceWorkerUpdateReady` → `window.location.reload()` — forces immediate refresh when a new service worker is available |
| `src/images/nt-icon.svg` | PWA app icon (referenced in manifest config) |

### Data Flow
```
PWA / Offline:
  gatsby-plugin-manifest (gatsby-config.js)
    → options.icon: 'src/images/nt-icon.svg'
    → generates /manifest.webmanifest with multiple icon sizes
  gatsby-plugin-offline
    → wraps gatsby-plugin-manifest (must be listed after it)
    → generates service worker that caches pages for offline access
  gatsby-browser.js onServiceWorkerUpdateReady
    → window.location.reload() — triggers immediate page refresh on SW update

Analytics (Google Analytics 4):
  gatsby-plugin-google-gtag
    → trackingIds: ['G-T102WNPS7B']
    → gtagConfig: { anonymize_ip: true, cookie_expires: 0 }
    → excludes paths: ['/preview/**', '/do-not-track/me/too/']
    → injects gtag.js and fires pageview on every Gatsby route change

Sitemap:
  gatsby-plugin-sitemap
    → auto-generates /sitemap-index.xml and /sitemap-0.xml at build time
    → includes all pages created by Gatsby (file-based pages + createPages)
    → uses siteMetadata.siteUrl as the base URL
```

### Conventions Applied
- `anonymize_ip: true` — GDPR-conscious configuration
- `cookie_expires: 0` — session-only cookies for analytics (no persistent tracking)

## Dependencies
- **Depends on:** content-pipeline (sitemap covers all generated pages), gatsby-config.js siteMetadata (siteUrl for sitemap)
- **Required by:** nothing

## Boundaries
- `gatsby-plugin-offline` must be listed AFTER `gatsby-plugin-manifest` in the plugins array — reversing this order breaks the PWA setup
- Do NOT remove `anonymize_ip: true` from the gtag config
- Do NOT add the tracking ID to the exclusion paths — that would break analytics entirely

## Acceptance Criteria
- [ ] `/manifest.webmanifest` is present in the production build
- [ ] The site icon (`nt-icon.svg`) is used as the PWA icon
- [ ] The site is installable as a PWA (manifest is valid)
- [ ] Pages are served from cache when offline (service worker active)
- [ ] New service worker deployments trigger an immediate page reload
- [ ] Google Analytics receives pageview events on navigation
- [ ] `/sitemap-index.xml` is present in the production build
- [ ] The sitemap uses `http://www.nicotsou.com` as the base URL

## Extension Points
- Update the PWA icon: replace `src/images/nt-icon.svg` and rebuild
- Add new Analytics events: use `window.gtag('event', …)` in component event handlers
- Exclude additional paths from analytics: add to the `pluginConfig.exclude` array in the gtag plugin config
- Customize the sitemap: pass `serialize` or `filterPages` options to `gatsby-plugin-sitemap`
