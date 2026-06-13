#!/usr/bin/env node
/*
 * Screenshot routes of the locally-running Math Golf app (headless sandbox).
 *
 * Usage:
 *   node screenshot.cjs [outDir] [route ...]
 *
 * Defaults: outDir = docs/screenshots, routes = "/" "/play"
 * Filenames derive from the route ("/" -> home.png, "/play" -> play.png).
 *
 * Requires the dev server to be running on http://localhost:3000 first.
 */

const fs = require("fs");
const path = require("path");

// Quirk 1: Chromium binaries live here in this sandbox. Default it if unset.
process.env.PLAYWRIGHT_BROWSERS_PATH ||= "/opt/pw-browsers";

// Quirk 2: Playwright is a global install, not a repo dependency. Try the
// normal resolution first (works if it's ever added as a dep), then the
// known global path used by this environment.
function loadChromium() {
  const candidates = ["playwright", "/opt/node22/lib/node_modules/playwright"];
  for (const c of candidates) {
    try {
      return require(c).chromium;
    } catch {
      /* try next */
    }
  }
  throw new Error(
    "Could not load 'playwright'. Install it (pnpm add -D playwright) or " +
      "verify the global path /opt/node22/lib/node_modules/playwright."
  );
}

const BASE = process.env.BASE_URL || "http://localhost:3000";

// Contract: first positional arg is the output directory, remaining args are
// routes. No route-vs-dir guessing (absolute dirs and routes both start with
// "/"). To screenshot specific routes, pass an outDir first.
const args = process.argv.slice(2);
const outDir = args[0] || "docs/screenshots";
const routes = args.slice(1);
const targets = routes.length ? routes : ["/", "/play"];

function fileFor(route) {
  const slug = route.replace(/^\/+|\/+$/g, "").replace(/\//g, "-") || "home";
  return `${slug}.png`;
}

(async () => {
  const chromium = loadChromium();
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));

  const saved = [];
  for (const route of targets) {
    const url = `${BASE}${route}`;
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(500); // settle fonts/animation
    const out = path.join(outDir, fileFor(route));
    await page.screenshot({ path: out });
    saved.push(out);
  }

  await browser.close();

  console.log("Saved:", saved.join(", "));
  console.log("Console errors:", errors.length ? errors : "none");
  if (errors.length) process.exitCode = 1;
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
