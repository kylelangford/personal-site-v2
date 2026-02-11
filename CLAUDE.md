# CLAUDE.md

This file provides context to Claude Code when working on this repository.

## Project Overview

Precision Frontend Engineering - A single-page marketing site for a software development company specializing in web apps, micro SaaS, and AI integration.

## Tech Stack

- **Framework**: Vue 3.5 (Composition API with `<script setup>`)
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 4.0 with custom theme tokens
- **Language**: TypeScript
- **Deployment**: Vercel

## Project Structure

```
src/
├── App.vue      # Main single-file component (all sections)
├── main.ts      # Vue app initialization
├── style.css    # Tailwind config + custom CSS
└── env.d.ts     # TypeScript declarations

public/
├── favicon.svg
└── llms.txt     # LLM context file
```

## Code Conventions

### Vue Components
- Use `<script setup>` syntax (Composition API)
- Single-file component architecture (appropriate for landing page)
- Reactive state with `ref` and `computed`

### Styling
- Utility-first with Tailwind classes
- Custom theme tokens defined in `style.css` under `@theme`
- Component classes (`.card`, `.btn-primary`, `.btn-ghost`) for reusable patterns
- Spacing utilities: `.content-spacing`, `.section-padding`, `.actions-spacing`

### Colors
- `--color-ink`: #000000 (pure black background)
- `--color-orange`: #EA3700 (primary accent)
- `--color-offwhite`: #FFFFFF (text)
- `--color-slate`: #A0A0A0 (secondary text, WCAG AA compliant)

### Accessibility
- WCAG AA compliant contrast ratios
- Skip link for keyboard navigation
- Semantic HTML with proper ARIA labels
- `prefers-reduced-motion` support for animations
- Screen reader text with `.sr-only`

### Animations
- IntersectionObserver-based scroll animations
- `data-animate="fade-up"` attribute for animated elements
- `data-delay` attribute for staggered animations
- Sticky stacking cards in Featured Projects section

## Commands

```bash
npm run dev      # Start dev server on port 3000
npm run build    # Production build to /dist
npm run preview  # Preview production build
```

## Key Patterns

### Scroll Animations
Elements with `data-animate="fade-up"` are observed and animated when entering viewport. Respects `prefers-reduced-motion`.

### Sticky Stacking
Featured Projects uses CSS sticky positioning (`.stack-card`) to create a card stacking effect on scroll.

### Theme Tokens
All colors and fonts are defined as CSS custom properties in `:root` and `@theme` for consistency.
