---
name: run-app
description: Launch the Math Golf Next.js app locally and screenshot it in a headless cloud sandbox. Use when asked to run, start, screenshot, or visually verify the app. Covers dev-server start/stop, the TLS env var the build needs, and the Playwright driver (there is no chromium-cli in this environment).
---

# Running & Screenshotting Math Golf

Verified recipe for launching the app and capturing screenshots in a headless
sandbox. Background and rationale live in [`AGENTS.md`](../../../AGENTS.md)
under "Local Dev & Cloud Sandbox".

## 1. Start the dev server

`next/font/google` fetches the Outfit font **at build/dev time**, which fails
behind a TLS-intercepting proxy without `NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1`.
That var is already in `.claude/settings.json`, so a plain `pnpm dev` works in
Claude Code sessions; set it explicitly if you run elsewhere.

Start in the background and **poll the port** — never `sleep`:

```bash
pnpm dev > /tmp/mathgolf-dev.log 2>&1 &
echo $! > /tmp/mathgolf-dev.pid
timeout 60 bash -c 'until curl -sf http://localhost:3000 >/dev/null; do sleep 1; done'
```

## 2. Screenshot

There is **no `chromium-cli`** here. Use the committed Playwright helper, which
requires Playwright from its global install and points at the sandbox's Chromium:

```bash
# Defaults: writes home.png + play.png into docs/screenshots/
node .claude/skills/run-app/screenshot.cjs

# Or target specific routes / output dir:
node .claude/skills/run-app/screenshot.cjs /tmp/shots / /play /settings
```

The script self-heals the two environment quirks (global `playwright` path and
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`) and launches with `--no-sandbox`.
It prints any console errors and the saved paths. **Look at the PNG** — a blank
frame means the page didn't actually render.

## 3. Stop the server

```bash
kill $(cat /tmp/mathgolf-dev.pid) 2>/dev/null
```

## Gotchas

- First `nav` to a route can be slow (Next compiles on demand); the helper uses
  `networkidle` + a short settle to handle it.
- Run the app, don't just launch it: drive a real route (`/play`) and confirm a
  hole renders, not just that port 3000 answers.
- Reference screenshots used in the README live in `docs/screenshots/`.
