# AGENTS.md - AI Agent Development Guide

> **Source of Truth** for architecture patterns, coding standards, and best practices for AI agents working on this codebase.

---

## 🎯 Project Overview

**Math Golf Game** - A puzzle game combining golf scoring with mathematical operations. Players use clubs (math operations) to reach a target number in minimal strokes.

**Tech Stack:**
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- pnpm (package manager)

---

## 📐 Architecture Principles

### 1. **KISS Principle (Keep It Simple, Stupid)**
- Prefer simple solutions over clever ones
- Avoid over-engineering
- Use straightforward type annotations (`: Type`) over complex patterns
- Example: `const clubs: Clubs = {...}` instead of `as const satisfies`

### 2. **Type Safety First**
- All game entities must be typed
- Use `type` over `interface` for consistency and flexibility
- Leverage union types for strict values: `Theme`, `Difficulty`, `ClubTier`
- No `any` types allowed

### 3. **Next.js Best Practices**
- Use App Router (not Pages Router)
- Server Components by default, Client Components (`"use client"`) only when needed
- Optimize images with `next/image`
- Optimize fonts with `next/font`
- Use `@/` import alias for clean imports

---

## 📁 File Organization

### Current Structure
```
/app                 # Next.js App Router
  ├── page.tsx       # Main game (Client Component)
  ├── layout.tsx     # Root layout (Server Component)
  └── globals.css    # Global styles + theme system
/lib                 # Utilities and shared code
  ├── types.ts       # TypeScript definitions
  └── constants.ts   # Game data (clubs, holes)
/public              # Static assets
```

### Conventions
- **`/lib`** - For utilities, helpers, constants, and types
- **`/components`** - When adding reusable components (not created yet)
- **`/app`** - Pages and layouts only
- **`/hooks`** - Custom React hooks (create when needed)

---

## 🔤 TypeScript Guidelines

### Use `type` Over `interface`

**✅ DO:**
```typescript
export type Theme = "forest" | "cyber" | "midnight";

export type Club = {
  title: string;
  formula: (x: number) => number;
};
```

**❌ DON'T:**
```typescript
export interface Club {
  title: string;
  formula: (x: number) => number;
}
```

**Reasoning:** More flexible for unions, intersections, and functional patterns. Consistent with modern React/Next.js practices.

### Simple Type Annotations

**✅ DO:**
```typescript
export const clubs: Clubs = {...}
export const holes: Hole[] = [...]
```

**❌ DON'T:**
```typescript
export const clubs = {...} as const satisfies Clubs
```

**Reasoning:** Simpler, more readable, avoids type narrowing issues. Sufficient type safety for this use case.

### Type Definitions Location
- All types live in `/lib/types.ts`
- Import as: `import type { Theme, Hole } from "@/lib/types"`
- Use `import type` for type-only imports (better tree-shaking)

---

## 🎨 Styling System

### CSS Variables for Theming

The app uses CSS variables for dynamic theming without JavaScript overhead.

**Structure:**
```css
:root { /* Default theme variables */ }
.theme-forest { /* Forest theme overrides */ }
.theme-cyber { /* Cyber theme overrides */ }
.theme-midnight { /* Midnight theme overrides */ }
```

**Variables:**
- `--body`, `--header-bg`, `--main-bg`, `--footer-bg` - Background colors
- `--text-primary`, `--text-muted` - Text colors
- `--text-accent-green`, `--text-accent-yellow`, `--text-accent-red` - Status colors
- `--button-bg`, `--button-bg-hover`, `--button-border` - Interactive elements

**Usage:**
1. State in component: `const [theme, setTheme] = useState<Theme>("forest")`
2. Apply to root: `<div className={`app theme-${theme}`}>`
3. CSS automatically applies theme variables

### Tailwind CSS Usage
- Use for layout utilities (flex, grid, spacing)
- **Don't** use for colors/themes (use CSS variables instead)
- This allows dynamic theming without Tailwind JIT overhead

---

## ⚛️ React Patterns

### Server vs Client Components

**Server Components (default):**
- `app/layout.tsx` - No interactivity needed
- Future: Static pages, data fetching

**Client Components (`"use client"`):**
- `app/page.tsx` - Uses `useState`, `useMemo`, event handlers
- Any component with: state, effects, event listeners, browser APIs

### State Management
- Currently: Local component state (`useState`)
- Future: Consider React Context for global game state
- Avoid: Redux (overkill for this project size)

### Hooks Usage
```typescript
// ✅ DO: Memoize expensive calculations
const strokeColor = useMemo(() => {
  if (current === hole.yards && strokes <= hole.par) {
    return "greenStroke";
  }
  if (strokes > hole.par) {
    return "redStroke";
  }
  return "yellowStroke";
}, [current, hole.yards, hole.par, strokes]);

// ❌ DON'T: Unnecessary useMemo for simple operations
const doubled = useMemo(() => value * 2, [value]);
```

---

## 🚀 Next.js Optimizations

### Font Optimization
```typescript
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

// Apply in layout
<body className={outfit.className}>{children}</body>
```

**Benefits:** Self-hosted, no external requests, no layout shift

### Image Optimization
```typescript
// ✅ DO:
<Image src="/logo.png" alt="Logo" width={44} height={44} />

// ❌ DON'T:
<img src="/logo.png" alt="Logo" />
```

**Benefits:** Lazy loading, WebP/AVIF, responsive sizing, better LCP

### Metadata (SEO)
```typescript
export const metadata: Metadata = {
  title: "Math Golf Game",
  description: "...",
  openGraph: {
    title: "Math Golf Game",
    description: "...",
    type: "website",
  },
};
```

---

## 💡 Key Decisions & Rationale

### Why `type` over `interface`?
- More flexible for unions and functional patterns
- Consistent with modern TypeScript practices
- Single keyword for all type definitions

### Why CSS variables over Tailwind for themes?
- Dynamic theming without JavaScript overhead
- No Tailwind JIT recompilation for theme changes
- Easier to maintain color schemes
- Still use Tailwind for layout utilities

### Why `/lib` for types?
- Next.js convention for shared utilities
- Co-locates related concerns (types + constants)
- Clean import paths with `@/lib/*` alias

### Why simple type annotations?
- KISS principle - easier to understand
- Avoids complex type narrowing issues
- Sufficient type safety for this use case
- More readable for collaboration

---

> 💡 **Remember:** When in doubt, choose simplicity over cleverness. This codebase values readability and maintainability over showing off TypeScript tricks.
