#!/bin/bash
set -euo pipefail

# SessionStart hook for Claude Code on the web.
# Installs dependencies so a fresh cloud container lands ready to
# build / run / screenshot without a manual `pnpm install` first.

# Only run in remote (web) sessions. Local sessions manage their own deps.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Run async: Claude Code backgrounds the install so you can start chatting
# immediately. Trade-off: deps may still be installing for the first few
# seconds, so an early build/run/screenshot could race the install.
echo '{"async": true, "asyncTimeout": 300000}'

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}"

# Plain `pnpm install` (not --frozen-lockfile): idempotent, forgiving if a
# session adds deps, and fast on later sessions thanks to cached container
# state. The build's Google-Fonts TLS workaround lives in .claude/settings.json
# (NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS), not here.
pnpm install
