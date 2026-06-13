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
/app                    # Next.js App Router
  ├── page.tsx          # Landing page (Server Component)
  ├── layout.tsx        # Root layout with ThemeProvider (Server Component)
  ├── globals.css       # Global styles + theme system
  ├── /play
  │   ├── page.tsx      # Game page UI (Client Component)
  │   └── hook.ts       # Game business logic (custom hook)
  ├── /chat             # Chat page (placeholder)
  └── /settings         # Settings page
/components             # Reusable React components
  └── /layout
      ├── AppLayout.tsx      # Main responsive layout wrapper
      ├── TopNavbar.tsx      # Desktop/mobile top nav
      └── BottomTabBar.tsx   # Mobile-only bottom nav
/lib                    # Utilities and shared code
  ├── types.ts          # TypeScript definitions
  ├── constants.ts      # Game data (clubs, holes)
  └── utils.ts          # Helper functions
/docs                   # Architecture documentation
  └── mobile-navigation-spec.md  # Responsive UI implementation details
/public                 # Static assets
```

### Conventions

- **`/lib`** - For utilities, helpers, constants, and types
- **`/components`** - For reusable components (Client or Server)
- **`/app`** - Pages and layouts only
- **`/app/[route]/hook.ts`** - Custom hooks for page-specific business logic
- **`/docs`** - High-level system architecture documentation

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

.forest {
  /* Forest theme variables */
}
.cyber {
  /* Cyber theme variables */
}
.midnight {
  /* Midnight theme variables */
}
```

**Setup:**

```tsx
// app/layout.tsx (Server Component)
import { ThemeProvider } from "next-themes";

<ThemeProvider
  attribute="class"
  defaultTheme="forest"
  themes={["forest", "cyber", "midnight"]} // ⚠️ Required! Tells next-themes valid theme names
>
  {children}
</ThemeProvider>;

// components/ThemeSelector.tsx (Client Component)
("use client");
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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

### Separation of Concerns: UI vs Business Logic

**Pattern:** Use `hook.ts` files for page-specific business logic, keep `page.tsx` files focused on UI rendering.

**✅ DO:**

```typescript
// app/play/hook.ts - Business logic
"use client";
import { useState } from "react";
import { holes } from "@/lib/constants";

export function useHoleNavigation() {
  const [currentHoleIndex, setCurrentHoleIndex] = useState(0);
  const [current, setCurrent] = useState(holes[0].current);
  const [strokes, setStrokes] = useState(0);

  const goToNextHole = () => {
    if (currentHoleIndex < holes.length - 1) {
      const nextIndex = currentHoleIndex + 1;
      setCurrentHoleIndex(nextIndex);
      setCurrent(holes[nextIndex].current);
      setStrokes(0);
    }
  };

  return {
    hole: holes[currentHoleIndex],
    current,
    setCurrent,
    strokes,
    setStrokes,
    goToNextHole,
    // ... more logic
  };
}

// app/play/page.tsx - UI rendering
("use client");
import { useHoleNavigation } from "./hook";

export default function PlayPage() {
  const { hole, current, strokes, goToNextHole } = useHoleNavigation();

  return (
    <div>
      <h2>Hole {hole.id}</h2>
      <p>Current: {current}</p>
      <p>Strokes: {strokes}</p>
      <button onClick={goToNextHole}>Next</button>
    </div>
  );
}
```

**Benefits:**

- **Testability:** Business logic can be tested independently
- **Reusability:** Hook can be used in multiple components
- **Readability:** UI components are simpler and easier to understand
- **Maintainability:** Logic changes don't require touching UI code

---

## 🎨 Responsive Design Patterns

### Mobile-First with Tailwind Breakpoints

**Pattern:** Use Tailwind's responsive utilities with mobile-first approach.

```tsx
// ✅ DO: Mobile-first responsive layout
<div className="flex flex-col md:flex-row">
  {/* Stacks vertically on mobile, horizontally on desktop */}
</div>

<nav className="block md:hidden">
  {/* Mobile-only bottom tab bar */}
</nav>

<nav className="hidden md:flex">
  {/* Desktop-only top navigation */}
</nav>
```

### Preventing Hover State Issues on Mobile

**Pattern:** Use `@media (hover: hover)` to only apply hover effects on devices with actual hover capability.

```css
/* ✅ DO: Prevent stuck hover states on touch devices */
.button {
  transition: all 0.2s ease;
}

@media (hover: hover) {
  .button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
}

.button:active {
  transform: translateY(1px);
}
```

**Why:** Touch devices don't have a "hover" state, so hover styles get stuck after tapping. This media query ensures hover effects only apply on devices with actual hover capability (desktop).

### Preventing Layout Shift

**Pattern:** Reserve space for conditionally rendered content to prevent layout jumps.

```tsx
// ✅ DO: Reserve space with min-height
<div className="mt-6 flex flex-col gap-3" style={{ minHeight: "140px" }}>
  {showMessage && <div className="p-4 bg-white/5 rounded-lg">{message}</div>}
</div>;

// ❌ DON'T: Conditionally render container itself
{
  showMessage && (
    <div className="mt-6 flex flex-col gap-3">
      <div className="p-4 bg-white/5 rounded-lg">{message}</div>
    </div>
  );
}
```

**Why:** Always rendering the container prevents the layout from jumping when content appears/disappears.

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
<body className={outfit.className}>{children}</body>;
```

**Benefits:** Self-hosted at runtime (no external requests once built), no layout shift.

> ⚠️ The font is fetched from Google Fonts **at build/dev time**. Behind a
> TLS-intercepting proxy this fails — see [Local Dev & Cloud Sandbox](#-local-dev--cloud-sandbox-agent-notes).

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

## 🤖 Local Dev & Cloud Sandbox (Agent Notes)

Hard-won setup details so the next agent (or human) doesn't rediscover them.

### Build/dev needs network for fonts (TLS gotcha)

`app/layout.tsx` loads `Outfit` via `next/font/google`. Next downloads the font
**at build/dev time** (it's self-hosted at runtime, but the fetch happens during
`next build`/`next dev`). In a sandbox with a TLS-intercepting proxy, that fetch
fails with a TLS error and the build aborts:

```
next/font: error: Failed to fetch `Outfit` from Google Fonts.
```

**Fix (already applied):** `.claude/settings.json` sets
`NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1`, so every Claude Code
session gets it automatically — `pnpm build` and `pnpm dev` just work. If you
run outside Claude Code and hit this, export that var yourself:

```bash
NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1 pnpm build
```

Do **not** remove that env var from `.claude/settings.json` — it's load-bearing
for cloud builds. (A fully offline-proof alternative would be migrating Outfit
to `next/font/local` with the font file committed; not done yet.)

### Screenshotting the app in a headless sandbox

There is **no `chromium-cli`** in this environment. Playwright is installed
globally and the Chromium binary lives at a non-obvious path. Recipe that works:

```bash
# 1. Start the dev server (background) and poll the port — don't `sleep`
NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1 pnpm dev > /tmp/dev.log 2>&1 &
echo $! > /tmp/dev.pid
timeout 60 bash -c 'until curl -sf http://localhost:3000 >/dev/null; do sleep 1; done'

# 2. Drive headless Chromium via global Playwright (CommonJS, absolute require)
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node /tmp/shot.cjs

# 3. Stop the server
kill $(cat /tmp/dev.pid)
```

`/tmp/shot.cjs`:

```js
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
(async () => {
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto("http://localhost:3000/play", { waitUntil: "networkidle" });
  await page.getByText("Hole 1").waitFor();
  await page.screenshot({ path: "/tmp/play.png" });
  await browser.close();
})();
```

Key gotchas: require Playwright by **absolute path** (it's global, not a repo
dep), set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, and launch with
`--no-sandbox`. Committed reference screenshots live in `docs/screenshots/`.

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
