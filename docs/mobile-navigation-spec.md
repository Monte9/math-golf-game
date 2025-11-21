# Mobile Navigation & Responsive UI Spec

**Status:** ✅ Completed

## Overview

This phase focused on implementing a responsive layout that adapts navigation patterns for mobile and desktop devices. The goal is to maximize screen real estate on mobile while providing a familiar tab-based navigation, and switching to a top-bar navigation on desktop.

## Design Requirements

### Mobile Layout (Small Screens)

- **Top Navigation Bar**:
  - Position: Fixed at the top.
  - Style: Semi-transparent background (glassmorphism/opacity).
  - Content: Logo/Title ("Math Golf").
- **Bottom Tab Bar**:
  - Position: Fixed at the bottom.
  - Content: Main navigation items (Play, Chat, Settings).
  - Active state highlighting.
- **Main Content Area**:
  - Behavior: Scrollable view between the top nav and bottom tabs.
- **Footer Elements**:
  - Moved to Settings page (GitHub logo, copyright).

### Desktop Layout (Large Screens)

- **Top Navigation Bar**:
  - Position: Fixed at the top.
  - Content: Logo/Title + Main navigation items (Play, Chat, Settings).
  - Active state highlighting.
- **Bottom Tab Bar**:
  - Hidden (CSS: `md:hidden`).
- **Main Content Area**:
  - Behavior: Scrollable view below the top nav.

## Implementation Details

### 1. Component Structure

- **`AppLayout`** (`components/layout/AppLayout.tsx`): Wrapper component with responsive navigation.
- **`TopNavbar`** (`components/layout/TopNavbar.tsx`):
  - Mobile: Shows clickable "Math Golf" title.
  - Desktop: Shows title + navigation links (Play, Chat, Settings).
  - Icons: `Flag` (Play), `MessageCircle` (Chat), `Settings`.
- **`BottomTabBar`** (`components/layout/BottomTabBar.tsx`):
  - Mobile-only navigation with icons and labels.
  - Active state based on current route.

### 2. Routing Structure

- **`/`**: Landing page with marketing content and "Let's Play" CTA.
- **`/play`**: Main game page with improved UI (2x2 grid buttons, larger typography).
- **`/chat`**: Placeholder page for future chat feature.
- **`/settings`**: Settings page with theme selector and about section.

### 3. UI Enhancements

#### Game Page (`/play`)

- **Typography**: Larger "Hole" header (2.5rem, font-weight 800).
- **Club Buttons**:
  - Square layout in 2x2 grid.
  - 3D elevation with inset highlight and drop shadow.
  - Subtle pulse animation (3s cycle).
  - Responsive hover effects (desktop only via `@media (hover: hover)`).
  - Enhanced active state for tactile feedback.

#### Settings Page

- Theme selector with custom SVG dropdown arrow.
- About section with game description and developer credit.
- Inline SVG icons (GitHub, X/Twitter) using `currentColor` for theming.

### 4. Breakpoints

- Standard breakpoint: `md` (Tailwind default: 768px).
- CSS classes: `md:hidden`, `md:flex`, etc.

### 5. Theming & Performance

- Theme Toggle: Moved to Settings page.
- GitHub Link: Moved to Settings page footer.
- Responsive design uses CSS-based breakpoints (no JavaScript re-renders on resize).

## Technical Notes

- Navigation components use `usePathname()` for active state detection.
- Hover states properly isolated to hover-capable devices.
- All navigation icons from `lucide-react`.
- SVG icons use `currentColor` for automatic theme adaptation.
