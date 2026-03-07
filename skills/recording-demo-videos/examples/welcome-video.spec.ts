/**
 * welcome-video.spec.ts
 *
 * A generic example that records a product walkthrough video using Playwright
 * and the video-helpers utilities.
 *
 * ── How to run ──────────────────────────────────────────────────────
 *
 *   PLAYWRIGHT_BASE_URL=https://your-app.example.com \
 *     npx playwright test examples/welcome-video.spec.ts --headed
 *
 * Playwright saves a .webm file in test-results/. Convert to MP4 with:
 *
 *   ffmpeg -i test-results/<path>/video.webm \
 *     -vf "fps=30" -c:v libx264 -preset slow -crf 18 \
 *     -pix_fmt yuv420p welcome-video.mp4
 *
 * ── Environment variables ───────────────────────────────────────────
 *
 *   PLAYWRIGHT_BASE_URL  — The base URL of the app to record (required)
 *
 * ── Notes ───────────────────────────────────────────────────────────
 *
 *   • Adjust selectors to match your own app's DOM.
 *   • The test is marked `{ tag: "@video" }` so you can filter it easily.
 *   • All timings come from video-helpers constants so they're easy to tune.
 */

import { test } from "@playwright/test";
import {
  smoothScroll,
  smoothMouseMove,
  zoomToElement,
  zoomReset,
  showOverlay,
  clearOverlay,
  showClosingCard,
  waitForLoadingComplete,
  PAUSE_SHORT,
  PAUSE_MEDIUM,
  PAUSE_LONG,
  PAUSE_SCENE,
} from "../helpers/video-helpers";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

test.use({
  viewport: { width: 1440, height: 900 },
  video: { mode: "on", size: { width: 1440, height: 900 } },
  launchOptions: { slowMo: 80 },
});

test("Product walkthrough video", { tag: "@video" }, async ({ page }) => {
  // ── Scene 1: Landing page overview ──────────────────────────────
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await waitForLoadingComplete(page);
  await page.waitForTimeout(PAUSE_MEDIUM);

  await showOverlay(page, "Welcome to the App");
  await page.waitForTimeout(PAUSE_SCENE);

  // Scroll down to show below-the-fold content
  await smoothScroll(page, 500);
  await page.waitForTimeout(PAUSE_MEDIUM);

  await clearOverlay(page);
  await smoothScroll(page, -500); // scroll back to top
  await page.waitForTimeout(PAUSE_SHORT);

  // ── Scene 2: Zoom into navigation, click Settings ───────────────
  await showOverlay(page, "Navigate to Settings");
  await page.waitForTimeout(PAUSE_MEDIUM);

  // Zoom into the top navigation area — adjust the selector to match your app
  await zoomToElement(page, "nav, [data-testid='navbar'], header", 1.6);
  await page.waitForTimeout(PAUSE_MEDIUM);

  // Move cursor to a settings link and click
  const settingsLink = page.locator(
    'a[href*="settings"], button:has-text("Settings"), [data-testid="settings-link"]',
  );
  if (await settingsLink.first().isVisible({ timeout: 3000 }).catch(() => false)) {
    const box = await settingsLink.first().boundingBox();
    if (box) {
      await smoothMouseMove(page, box.x + box.width / 2, box.y + box.height / 2);
      await page.waitForTimeout(PAUSE_SHORT);
      await settingsLink.first().click();
    }
  }

  await zoomReset(page);
  await clearOverlay(page);
  await waitForLoadingComplete(page);
  await page.waitForTimeout(PAUSE_MEDIUM);

  // ── Scene 3: Walk through settings subpages ─────────────────────
  const settingsTabs = ["General", "Profile", "Notifications"];

  for (const tab of settingsTabs) {
    const tabEl = page.locator(
      `button:has-text("${tab}"), a:has-text("${tab}"), [role="tab"]:has-text("${tab}")`,
    );
    if (await tabEl.first().isVisible({ timeout: 2000 }).catch(() => false)) {
      await showOverlay(page, tab);
      await tabEl.first().click();
      await waitForLoadingComplete(page);
      await page.waitForTimeout(PAUSE_LONG);
      await clearOverlay(page);
    }
  }

  await page.waitForTimeout(PAUSE_SHORT);

  // ── Scene 4: Back to main page, interact with a key input ───────
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await waitForLoadingComplete(page);
  await page.waitForTimeout(PAUSE_MEDIUM);

  await showOverlay(page, "Try it out");
  await page.waitForTimeout(PAUSE_MEDIUM);

  // Zoom into a primary input — adjust the selector to your app
  const mainInput = page.locator(
    'input[type="text"], textarea, [data-testid="main-input"], [contenteditable="true"]',
  );
  if (await mainInput.first().isVisible({ timeout: 3000 }).catch(() => false)) {
    await zoomToElement(
      page,
      'input[type="text"], textarea, [data-testid="main-input"], [contenteditable="true"]',
      1.5,
    );
    await page.waitForTimeout(PAUSE_SHORT);

    await mainInput.first().click();
    await page.waitForTimeout(PAUSE_SHORT);

    // Type a sample prompt character-by-character for a natural feel
    const sampleText = "Show me last week's performance summary";
    for (const char of sampleText) {
      await mainInput.first().press(char === " " ? "Space" : char);
      await page.waitForTimeout(50 + Math.random() * 60);
    }

    await page.waitForTimeout(PAUSE_LONG);
    await zoomReset(page);
  }

  await clearOverlay(page);
  await page.waitForTimeout(PAUSE_MEDIUM);

  // ── Scene 5: Closing card ───────────────────────────────────────
  await showClosingCard(page, {
    headline: "Get Started Today",
    subtitle: "Visit our website to create your free account.",
    holdMs: PAUSE_SCENE + 1000,
  });
});
