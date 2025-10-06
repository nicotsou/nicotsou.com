# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
```bash
# Install dependencies (use npm, not yarn per README)
npm install

# Start development server (accessible on local network)
npm start
# Alternative development command (localhost only)
npm run develop

# Build for production
npm run build

# Serve production build locally
npm run serve

# Clean Gatsby cache and public folder
npm run clean
```

### Testing
```bash
# Run unit tests in watch mode
npm test

# Run unit tests in CI mode (single run)
npm run test:ci

# Open Cypress E2E test runner
npm run cy:open

# Run E2E tests headlessly
npm run cy:run

# Run E2E tests with dev server (interactive)
npm run test:e2e

# Run E2E tests with dev server (CI)
npm run test:e2e:ci
```

### Dependency Management
```bash
# Upgrade dependencies interactively
npx run upgrade-interactive
```

### Docker Development
```bash
# Development environment
docker-compose up

# Production build
docker build -t nicotsou-com .
docker run -p 9000:9000 nicotsou-com
```

## Architecture Overview

### Tech Stack
- **Framework**: Gatsby 5.x (React-based static site generator)
- **Styling**: Styled Components with CSS-in-JS
- **Content**: Markdown files with frontmatter for blog posts, courses, and talks
- **Testing**: Jest for unit tests, Cypress for E2E tests
- **Node Version**: >=18.12.0 (see `.nvmrc`)

### Project Structure

#### Content Architecture
The site content is organized into distinct content types:
- **Blog posts** (`content/blog/`): Each post in its own folder with `index.md` and `cover.jpg/png`
- **Courses** (`content/courses/tltr-typescript/`): Course content and materials
- **Talks** (`content/talks/`): Presentation content and metadata
- **Assets** (`content/assets/`): Shared images and media

#### Source Code Organization
```
src/
├── components/           # Reusable React components
│   ├── Layout/          # Layout-specific components (Header, Footer, Logo, etc.)
│   ├── DynamicCover.js  # Interactive cover image component
│   ├── PostItem.js      # Blog post list item component
│   └── seo.js           # SEO head component
├── pages/               # Gatsby pages (routes)
│   ├── index.js         # Homepage with blog post list
│   ├── talks.js         # Talks listing page  
│   └── tltr-ts-landing.js # Course landing page
├── styles/              # Styled Components theme system
│   ├── GlobalStyles.js  # Global CSS and theme variables
│   ├── Typography.js    # Typography scale and components
│   ├── Colors.js        # Color palette definitions
│   └── BlogStyles.js    # Markdown content styling
└── templates/           # Gatsby templates for dynamic pages
    ├── blogPost.js      # Individual blog post template
    ├── coursePage.js    # Course page template
    └── talkPage.js      # Talk page template
```

#### Key Features
- **Dynamic cover images**: Hover effects on post links show cover previews
- **Responsive design**: Mobile-first with desktop enhancements
- **Dark mode support**: Automatic based on system preference
- **SEO optimization**: Head tags, sitemap, and structured data
- **Analytics**: Google Analytics integration
- **Progressive Web App**: Manifest and offline support

### Data Flow
1. **Content sources**: Markdown files processed by `gatsby-transformer-remark`
2. **GraphQL layer**: Gatsby's data layer queries content at build time
3. **Page generation**: Templates create pages for each blog post/course/talk
4. **Static generation**: Full static site generated at build time

### Styling System
- **Theme variables**: CSS custom properties for colors and spacing
- **Typography scale**: Consistent heading and body text components
- **Responsive breakpoints**: Mobile-first approach with media queries
- **Component styling**: Styled Components for scoped CSS

### Content Management
- **Frontmatter schema**: Each content type has specific required fields
- **Image optimization**: Gatsby Image for responsive images
- **Code highlighting**: PrismJS with custom syntax highlighting
- **Video embeds**: Support for YouTube and other video platforms

## Development Guidelines

### Content Creation
- Blog posts require: `title`, `date`, `description`, `cover`, and `type: "post"`
- Images should be optimized and placed alongside content files
- Use meaningful file and folder names for SEO

### Component Development  
- Follow the existing styled-components patterns
- Use the typography scale from `src/styles/Typography.js`
- Maintain responsive design principles
- Test components in isolation when possible

### Testing Strategy
- Unit tests for utility functions and components
- E2E tests for critical user journeys
- Visual regression testing through Cypress
- Accessibility testing with cypress-axe

### Code Quality
- Prettier configuration enforces consistent formatting
- ESLint rules follow Gatsby best practices  
- Git hooks prevent committing broken code
- Use semantic commits for better history

### Performance Considerations
- Gatsby handles image optimization automatically
- Static generation ensures fast page loads
- Critical CSS is inlined for above-the-fold content
- Service worker provides offline functionality

### Local Development Notes
- The `start` command binds to `0.0.0.0` for network access
- Set a local hostname to avoid using IP addresses
- Clear Gatsby cache with `npm run clean` if experiencing build issues
- Use browser dev tools to test responsive breakpoints