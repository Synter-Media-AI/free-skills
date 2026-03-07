# Recording Demo Videos with Playwright

Record polished product demo videos using Playwright's built-in video capture. Includes helpers for smooth scrolling, zoom effects, text overlays, and mouse animations — perfect for marketing videos, onboarding walkthroughs, and social media cuts.

## What's Included

```
recording-demo-videos/
├── .agents/skills/recording-demo-videos/SKILL.md   # Synter skill file
├── helpers/video-helpers.ts                          # Reusable helpers
├── examples/welcome-video.spec.ts                    # Full example spec
├── components/VideoModal.tsx                         # React modal for playback
└── README.md                                         # This file
```

## Quick Start

### 1. Install Playwright

```bash
npm init playwright@latest
# or
pnpm add -D @playwright/test
npx playwright install chromium
```

### 2. Copy helpers into your project

```bash
cp helpers/video-helpers.ts your-app/tests/e2e/
cp examples/welcome-video.spec.ts your-app/tests/e2e/
```

### 3. Record a video

```bash
npx playwright test welcome-video --headed --project=chromium --timeout=300000
```

### 4. Convert to MP4

Playwright outputs `.webm`. Convert with ffmpeg:

```bash
ffmpeg -i test-results/welcome-video-*/video.webm \
  -c:v libx264 -preset slow -crf 22 \
  output/welcome.mp4
```

### 5. Create platform cuts

```bash
# 30s landscape (YouTube, LinkedIn)
ffmpeg -i output/welcome.mp4 -t 30 -c:v libx264 -crf 22 output/ad-30s-landscape.mp4

# 30s square (Instagram, Facebook)
ffmpeg -i output/welcome.mp4 -t 30 \
  -vf "crop=min(iw\,ih):min(iw\,ih),scale=1080:1080" \
  -c:v libx264 -crf 22 output/ad-30s-square.mp4

# 15s highlight
ffmpeg -i output/welcome.mp4 -t 15 -c:v libx264 -crf 22 output/ad-15s-landscape.mp4
```

## Helpers Reference

### `smoothScroll(page, deltaY, steps?)`
Scroll the page smoothly instead of jumping.

### `smoothMouseMove(page, toX, toY, steps?, delayMs?)`
Glide the cursor to a position with ease-in-out easing.

### `zoomToElement(page, selector, scale?, durationMs?)`
CSS transform zoom toward a specific element — simulates a camera zoom.

### `zoomReset(page, durationMs?)`
Reset zoom back to normal.

### `showOverlay(page, text, durationMs?)`
Display a text overlay pill with blur background — great for silent/muted videos.

### `clearOverlay(page)`
Remove any visible overlay immediately.

See [`helpers/video-helpers.ts`](./helpers/video-helpers.ts) for full implementations.

## Writing a Demo Script

Structure your video as **scenes** with timing constants:

```typescript
import { test } from "@playwright/test";
import {
  smoothScroll, showOverlay, clearOverlay,
  zoomToElement, zoomReset, smoothMouseMove,
} from "./video-helpers";

const PAUSE_SHORT = 600;
const PAUSE_MEDIUM = 1200;
const PAUSE_LONG = 2500;
const PAUSE_SCENE = 3000;

test.use({
  video: { mode: "on", size: { width: 1920, height: 1080 } },
  viewport: { width: 1920, height: 1080 },
  colorScheme: "dark",
});

test("Product Demo", async ({ page }) => {
  // SCENE 1: Landing
  await page.goto("https://your-app.com");
  await showOverlay(page, "Welcome to YourApp", 4000);
  await page.waitForTimeout(PAUSE_SCENE);

  // SCENE 2: Feature highlight
  await zoomToElement(page, ".feature-card", 2.5, 1200);
  await showOverlay(page, "Powerful analytics at your fingertips", 3000);
  await page.waitForTimeout(PAUSE_LONG);
  await zoomReset(page, 800);

  // SCENE 3: Closing branded overlay
  await clearOverlay(page);
  await page.evaluate(() => {
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "fixed", inset: "0",
      background: "rgba(0,0,0,0.9)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      zIndex: "99999", opacity: "0",
      transition: "opacity 800ms ease",
    });
    overlay.innerHTML = `
      <div style="color:#fff;font-size:28px;font-weight:600;font-family:system-ui;">
        Ready to get started?
      </div>
      <div style="color:rgba(255,255,255,0.5);font-size:16px;font-family:system-ui;margin-top:12px;">
        yourapp.com
      </div>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => (overlay.style.opacity = "1"));
  });
  await page.waitForTimeout(5000);
});
```

## Using the Skill

Drop the skill into your project:

```bash
mkdir -p .agents/skills/recording-demo-videos
cp .agents/skills/recording-demo-videos/SKILL.md \
  your-project/.agents/skills/recording-demo-videos/
```

Then ask the agent: _"Record a demo video showing the settings page"_

## License

MIT
