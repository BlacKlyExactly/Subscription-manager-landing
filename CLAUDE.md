# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev        # Start development server
bun build      # Production build
bun start      # Start production server
bun lint       # Run ESLint
```

## Architecture

This is a **Next.js 16 (App Router) landing page** for a Polish-market subscription tracking SaaS. It is frontend-only — no backend, database, or API.

### Key Directories

- `app/` — Next.js App Router root. `layout.tsx` wraps everything in ThemeProvider + TooltipProvider. `page.tsx` composes all landing page sections.
- `components/ui/` — shadcn/ui base primitives (Radix UI + CVA variants).
- `components/homepage/` — Page-specific components: `pricing-card.tsx`, `how-it-works-card.tsx`, `testimonial.tsx`, `testimonial-carousel.tsx`.
- `hooks/` — `use-shader.ts` manages the WebGL/OGL renderer lifecycle; `use-mobile.ts` and `use-mounted.ts` for SSR safety.
- `lib/utils.ts` — exports `cn()` (clsx + tailwind-merge).

### Styling

Tailwind CSS v4 with PostCSS (no compatibility layer). Theme uses ~40 CSS custom properties in OKLch color space defined in `app/globals.css`. Component variants use CVA. The `cn()` utility from `lib/utils.ts` is used everywhere for conditional class merging.

### Animated Grid Background

`components/ui/animated-grid-background.tsx` renders a WebGL canvas using the OGL library with a custom GLSL fragment shader. The `useShader()` hook (`hooks/use-shader.ts`) manages the renderer, uniforms, and ResizeObserver. Theme colors (dark/light) are passed as uniforms to the shader. This component is used as section backgrounds throughout the page.

### Theme System

`next-themes` handles system preference detection and persistence. `components/theme/theme-picker.tsx` exposes a UI for switching themes. Theme state flows from `ThemeProvider` in `app/layout.tsx`.

### Component Imports

Path alias `@/` maps to the repo root. shadcn components are in `@/components/ui/`, hooks in `@/hooks/`, utilities in `@/lib/`.
