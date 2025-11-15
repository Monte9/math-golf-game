# Math Golf Game - Product Spec

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

### Implemented
- Single hole gameplay with real-time feedback
- 4 basic clubs with math operations
- Stroke counter with color-coded feedback
- 3 visual themes (Dark Forest, Cyber Night, Midnight Neon)
- Responsive UI with header/main/footer layout

### Pending (TODOs in code)
- Dynamic hole selection/navigation
- Club tier system (basic/advanced/premium clubs)

## Next Steps
- Migrate React codebase to Next.js following best practices and modern patterns.
- Implement hole navigation to allow playing through all 3 holes sequentially.
- Add game state persistence so players don't lose progress on refresh.
- Create a win/loss condition with score summary at end of round.
- Design and implement advanced club tiers with new mathematical operations.
- Add more holes with progressively challenging number puzzles.
- Build a level editor or procedural generation system for infinite holes.

