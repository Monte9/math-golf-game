# SPEC.md - Development Roadmap

> **Working Document** - This is a living scratchpad for tracking feature development, priorities, and phases.

## 📋 How to Use This Document

**The Mandate:**

1. **Phase 1** is what you're actively working on (can be 1 or more items)
2. When an item is **complete**, move it to `README.md` as a checked item `[x]`
3. **Backlog** holds all future work as individual items (not grouped)
4. Pick items from Backlog and move to Phase 1 when ready to work on them
5. Keep descriptions simple - one sentence per item
6. This is the source of truth for what's next

> **📚 Documentation Reminder**: Before committing changes, update relevant documentation in the `docs/` folder to reflect new features, architecture changes, or design decisions.

> **🤖 Architecture Patterns**: When establishing new coding patterns or conventions, update `AGENTS.md` to ensure all AI agents follow the same standards.

---

## 🚀 Phase 1: Active Work

**UX Refinements (User Feedback):**

- [ ] Fix layout overflow - bottom message area is below the fold on mobile
- [ ] Add "Continue" or "Next Hole" button when hole is completed successfully
- [ ] Improve clarity of "Yards" vs "Current" labels (users find it confusing)
- [ ] Add instant retry/reset button after first move (for accidental wrong moves)

**Core Features:**

- [ ] Add timer that counts up while playing, stops when hole is solved (becomes PR/record)
- [ ] Add persistence (localStorage) - preserve current hole and progress on page refresh

---

## 📅 Phase 2: Core Gameplay & Polish

**Game Mechanics:**

- [ ] Implement win condition UI (modal or screen when hole is completed)
- [ ] Add progress tracking (save completed holes to localStorage)
- [ ] Create course system (group holes into playable sequences)
- [ ] Add win/loss summary screen at end of course
- [ ] Extract `<GameBoard>`, `<ClubSelector>`, and `<HoleInfo>` components

**Infrastructure:**

- [ ] Add error boundary for graceful error handling
- [ ] Add unit tests for game logic
- [ ] **Schema Validation**: Use `zod` for all data validation (user input, AI responses)

---

## 🤖 Phase 3: AI & Technical Infrastructure

**AI Integration (Vercel AI SDK):**

- [ ] **Core Integration**: Start with `generateText` for basic responses
- [ ] **Tool Calling**: Explore `tool` definitions for game actions (e.g., "calculate shot")
- [ ] **Streaming**: Implement `streamText` for real-time commentary
- [ ] **UI Components**: Use Vercel's `useMessages` hook for chat UI (vs custom parser)
- [ ] **Prompt Engineering**: Use XML structure for prompts (proven to give better results)
- [ ] **Structured Output**: Use `streamBlock` or `generateObject` for structured game data

**AI Features:**

- [ ] Implement "Trash Talker" (AI Commentary) - Snarky reactions to player moves
- [ ] Implement "AI Caddy" (Tool Calling) - Helper that calculates best moves
- [ ] Implement "Course Architect" (Structured Output) - Generate custom courses

**Analytics:**

- [ ] **User Analytics**: Integrate Mixpanel for tracking game events and user journey
- [ ] **Cost Tracking**: Track AI token usage and costs in Supabase DB

---

## 🔮 Future Ideas / Backlog

- [ ] Premium club tiers system (toggle free vs paid, hard-coded for now)
- [ ] Procedural hole generation (infinite gameplay)
- [ ] Level editor (create custom holes)
- [ ] Score history and statistics
- [ ] Leaderboard system
- [ ] Multiplayer/competitive mode
- [ ] Undo/redo functionality
- [ ] Sound effects and animations
- [ ] Mobile-optimized touch controls
- [ ] Dark mode toggle (in addition to themes)
- [ ] Accessibility improvements (keyboard navigation, screen readers)
