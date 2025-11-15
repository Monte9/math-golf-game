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
/components          # Reusable React components
  └── ThemeSelector.tsx  # Theme dropdown (Client Component)
/lib                 # Utilities and shared code
  ├── types.ts       # TypeScript definitions
  └── constants.ts   # Game data (clubs, holes)
/public              # Static assets
```

### Conventions
- **`/lib`** - For utilities, helpers, constants, and types
- **`/components`** - For reusable components (Client or Server)
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

### Theming with next-themes + CSS Variables

The app uses `next-themes` for theme management with CSS variables for dynamic theming.

**Structure:**
```css
@theme {
  /* Tailwind color mappings */
  --color-body: var(--body);
  --color-header-bg: var(--header-bg);
  /* ... more mappings */
}

.forest { /* Forest theme variables */ }
.cyber { /* Cyber theme variables */ }
.midnight { /* Midnight theme variables */ }
```

**Setup:**
```tsx
// app/layout.tsx (Server Component)
import { ThemeProvider } from 'next-themes'

<ThemeProvider 
  attribute="class" 
  defaultTheme="forest"
  themes={["forest", "cyber", "midnight"]}  // ⚠️ Required! Tells next-themes valid theme names
>
  {children}
</ThemeProvider>

// components/ThemeSelector.tsx (Client Component)
"use client";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // Prevents hydration mismatch
  
  // ... dropdown UI using theme and setTheme
}
```

**Critical:** The `themes` array in `ThemeProvider` is essential for theme switching to work. Without it, `next-themes` won't properly apply theme classes to the HTML element.

**Benefits:**
- Automatic localStorage persistence
- SSR-safe (no hydration mismatches)
- System preference detection
- Works seamlessly with CSS variables

### Tailwind CSS Usage
- Use for layout utilities (flex, grid, spacing)
- Use theme colors via Tailwind: `bg-body`, `text-text-primary`, `bg-header-bg`
- Configured via `@theme` block in `globals.css` (Tailwind CSS 4)

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

### Why next-themes + CSS variables?
- Automatic localStorage persistence (no manual implementation)
- SSR-safe theme switching (no hydration mismatches)
- Dynamic theming without page reloads
- Works perfectly with Tailwind CSS 4
- Easy to add new themes (just add CSS class)
- System preference detection built-in

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
