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

---

## 🚀 Phase 1: Active Work

Nothing in active work - pick items from backlog below!

---

## 📋 Backlog: Prioritized Items

Pick items from here to move into Phase 1:

### High Priority
- [ ] Add dynamic hole navigation (prev/next buttons to cycle through holes)
- [ ] Fix hard-coded hole selection (currently stuck on `holes[2]`)
- [ ] Implement win condition UI (modal or screen when hole is completed)
- [ ] Add reset button to restart current hole
- [ ] Add progress tracking (save completed holes to localStorage)
- [ ] Create course system (group holes into playable sequences)
- [ ] Add win/loss summary screen at end of course

### Medium Priority
- [ ] Extract `<GameBoard>` component (main game area)
- [ ] Extract `<ClubSelector>` component (club buttons)
- [ ] Extract `<HoleInfo>` component (yards, par, current, strokes display)
- [ ] Add error boundary for graceful error handling
- [ ] Add unit tests for game logic
- [ ] Implement "Trash Talker" (AI Commentary) - Snarky reactions to player moves
- [ ] Implement "AI Caddy" (Tool Calling) - Helper that calculates best moves
- [ ] Implement "Course Architect" (Structured Output) - Generate custom courses

### Low Priority / Future Ideas
- [ ] Premium club tiers system (toggle free vs paid, hard-coded for now)
- [ ] Procedural hole generation (infinite gameplay)
- [ ] Level editor (create custom holes)
- [ ] Score history and statistics
- [ ] Leaderboard system
- [ ] Multiplayer/competitive mode
- [ ] Undo/redo functionality
- [ ] Hint system (show optimal solution)
- [ ] Sound effects and animations
- [ ] Mobile-optimized touch controls
- [ ] Dark mode toggle (in addition to themes)
- [ ] Accessibility improvements (keyboard navigation, screen readers)
