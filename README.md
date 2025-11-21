# Math Golf Game

## Overview

A puzzle game that combines golf scoring with mathematical operations. Players use "clubs" (math operations) to transform a starting number into a target number in as few moves ("strokes") as possible.

## Core Mechanics

### Gameplay

- Each hole has a **starting value** (current yards) and a **target value** (goal yards)
- Players select from 4 clubs to modify the current value:
  - **Driver (×2)**: Multiply current value by 2
  - **Wood (÷2)**: Divide current value by 2 (rounded down)
  - **Wedge (-5)**: Subtract 5 from current value
  - **Putter (+3)**: Add 3 to current value
- Each club use counts as one stroke
- Goal: Reach the exact target value in par strokes or fewer

### Scoring System

- **Par**: Target number of strokes for the hole
- **Stroke Color Feedback**:
  - Yellow: Game in progress
  - Green: Reached target at or under par (success!)
  - Red: Exceeded par (over budget)

### Current Content

- **3 holes** with varying difficulty:
  - Hole 1 (Easy): 10 → 23 in par 2
  - Hole 2 (Medium): 20 → 38 in par 3
  - Hole 3 (Hard): 20 → 78 in par 4

## Features

- [x] Single hole gameplay with real-time feedback
- [x] 4 basic clubs with math operations
- [x] Stroke counter with color-coded feedback
- [x] 3 visual themes (Dark Forest, Cyber Night, Midnight Neon)
- [x] Responsive UI with header/main/footer layout
- [x] Theme persistence with localStorage (remembers your theme choice)
- [x] Tailwind CSS integration with theme system
- [x] Component architecture with extracted ThemeSelector
- [x] Responsive Mobile/Desktop Navigation (Fixed Top Navbar & Bottom Tab Bar)
- [x] Settings Page with Theme Selector and About section
- [x] Dedicated Landing Page (`/`) and Game Page (`/play`)
- [x] Dynamic hole navigation with prev/next buttons
- [x] Retry functionality with solution reveal when exceeding par
- [x] Difficulty badges for each hole

**See [SPEC.md](./SPEC.md) for the full development roadmap and upcoming features.**

## Development Setup

This is a [Next.js](https://nextjs.org) application built with React, TypeScript, and Tailwind CSS. The app is deployed on Vercel.

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Package Manager**: pnpm

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/Monte9/math-golf-game
cd math-golf-game
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

This project follows Next.js 16 best practices. For detailed architecture patterns, coding standards, and AI agent context, see [AGENTS.md](./AGENTS.md).

## Documentation

Project documentation is maintained in the `docs/` folder:

- **Architecture specs**: Design decisions and implementation details for major features
- **Before committing**: Update relevant docs to reflect your changes

> **Note**: When establishing new coding patterns, update [`AGENTS.md`](./AGENTS.md) to ensure consistency across AI-assisted development.

## Learn More

- [SPEC.md](./SPEC.md) - Development roadmap and feature priorities
- [AGENTS.md](./AGENTS.md) - Architecture patterns and best practices for AI agents
- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
