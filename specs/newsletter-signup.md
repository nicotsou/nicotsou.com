---
# Feature: Newsletter Signup
status: current
last-extracted: 2026-03-19
files: src/components/SignUp.js
---

## Summary
An inline email subscription form that submits to ConvertKit via direct API call. Appears at the bottom of blog posts and talk pages. Shows a confirmation message after submission.

## Current Implementation

### Entry Points
- `src/components/SignUp.js` — used in `src/templates/blogPost.js` and `src/templates/talkPage.js`

### Key Files
| File | Role |
|---|---|
| `src/components/SignUp.js` | Controlled form with email and first name fields. POSTs to ConvertKit API on submit. Replaces form with confirmation message on response. |

### Data Flow
```
User fills in email + first name → clicks "Subscribe"

handleSubmit:
  → validation: email !== '' && name !== ''
  → setIsPosting(true)  → disables button
  → fetch POST https://api.convertkit.com/v3/forms/3382032/subscribe
      body: { api_key: 'enqnB60zz9yHfAppSdBe1g', email, first_name: name }
  → setResponse(promise)  ← NOTE: stores the Promise, not the resolved value

IF response is truthy (Promise is truthy immediately):
  → renders confirmation: "Verify your email to continue" + thank-you text
  (this triggers immediately after fetch is called, not after it resolves)

External:
  ConvertKit form ID: 3382032
  ConvertKit public API key: enqnB60zz9yHfAppSdBe1g (public, embedded in frontend)
```

### Conventions Applied
- `rgba(var(--text-color), var(--box-bg-opacity))` for container background — matches `aside` and `pre` styling in `BlogStyles.js`
- `backdrop-filter: blur(20px)` on container — same glass-morphism treatment as Prism code blocks
- Button uses `rgb(var(--bg-color))` text on `rgb(var(--text-color))` background — inverted contrast pair
- Typography: Label3 for field labels, Body3 for inputs, Label2 for button text

## Dependencies
- **Depends on:** design-system (CSS custom properties for all colors)
- **Required by:** blog-post-rendering, talk-pages

## Boundaries
- The ConvertKit API key (`enqnB60zz9yHfAppSdBe1g`) and form ID (`3382032`) are hardcoded — these are public-facing credentials for the ConvertKit public API (not secret), but do NOT replace them with server-side secrets or a proxy without updating the fetch call
- ⚠️ `setResponse(response)` stores the Promise object (not the resolved value) — the confirmation screen shows immediately after calling fetch, regardless of whether the API call succeeds or fails. This is the current behavior; do not "fix" it without testing the UX implications
- Do NOT move this component to a dedicated page — it is designed as an inline component within article pages
- `children` prop is passed through to the container above the form — used by callers to provide custom heading text (currently unused by `blogPost.js` and `talkPage.js`)

## Acceptance Criteria
- [ ] The signup form renders with Email and First Name fields and a Subscribe button
- [ ] Submitting with both fields filled triggers a POST to ConvertKit
- [ ] The button is disabled while submitting (`isPosting: true`)
- [ ] After clicking Subscribe, the confirmation message is shown
- [ ] Submitting with empty fields does not trigger the API call
- [ ] "No spam. Unsubscribe anytime." disclaimer is visible below the form

## Extension Points
- Change the newsletter provider: update the `fetch` call URL, request body shape, and API key/form ID constants
- Add a custom heading: pass children to `<SignUp>` — they render above the form inside the container
- Add field validation messages: add error state to `handleSubmit` and render conditionally below the relevant `Input`
