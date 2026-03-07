import type { Page } from "@playwright/test";

// ── Timing constants ────────────────────────────────────────────────
export const PAUSE_SHORT = 600;
export const PAUSE_MEDIUM = 1200;
export const PAUSE_LONG = 2500;
export const PAUSE_SCENE = 3000;

// ── Helpers ─────────────────────────────────────────────────────────

/**
 * Smooth wheel-scroll the page by `deltaY` pixels, spread across `steps`
 * discrete wheel events so the motion looks natural on video.
 *
 * @param page      Playwright Page instance
 * @param deltaY    Total pixels to scroll (positive = down, negative = up)
 * @param steps     Number of intermediate wheel events (default 20)
 */
export async function smoothScroll(
  page: Page,
  deltaY: number,
  steps = 20,
): Promise<void> {
  const stepDelta = deltaY / steps;
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepDelta);
    await page.waitForTimeout(30);
  }
}

/**
 * Move the mouse cursor from its current position to (`toX`, `toY`) using
 * an ease-in-out interpolation so the movement looks human on video.
 *
 * @param page     Playwright Page instance
 * @param toX      Destination X coordinate
 * @param toY      Destination Y coordinate
 * @param steps    Number of intermediate move events (default 30)
 * @param delayMs  Milliseconds to wait between each step (default 16 ≈ 60 fps)
 */
export async function smoothMouseMove(
  page: Page,
  toX: number,
  toY: number,
  steps = 30,
  delayMs = 16,
): Promise<void> {
  // Read the current cursor position by injecting a tiny helper.
  const start = await page.evaluate(() => ({
    x: (window as any).__cursorX ?? window.innerWidth / 2,
    y: (window as any).__cursorY ?? window.innerHeight / 2,
  }));

  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    // ease-in-out cubic
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const x = start.x + (toX - start.x) * ease;
    const y = start.y + (toY - start.y) * ease;
    await page.mouse.move(x, y);
    await page.waitForTimeout(delayMs);
  }

  // Persist final position so consecutive calls chain correctly.
  await page.evaluate(
    ([x, y]) => {
      (window as any).__cursorX = x;
      (window as any).__cursorY = y;
    },
    [toX, toY] as const,
  );
}

/**
 * Smoothly zoom the viewport into a specific element using a CSS
 * `transform: scale()` on `document.body`.
 *
 * @param page        Playwright Page instance
 * @param selector    CSS selector of the element to zoom into
 * @param scale       Target scale factor (default 1.8)
 * @param durationMs  Transition duration in milliseconds (default 800)
 */
export async function zoomToElement(
  page: Page,
  selector: string,
  scale = 1.8,
  durationMs = 800,
): Promise<void> {
  await page.evaluate(
    ([sel, sc, dur]) => {
      const el = document.querySelector(sel);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const body = document.body;
      body.style.transition = `transform ${dur}ms cubic-bezier(0.4,0,0.2,1)`;
      body.style.transformOrigin = `${cx}px ${cy}px`;
      body.style.transform = `scale(${sc})`;
    },
    [selector, scale, durationMs] as const,
  );
  await page.waitForTimeout(durationMs + 100);
}

/**
 * Reset any CSS zoom previously applied by {@link zoomToElement}.
 *
 * @param page        Playwright Page instance
 * @param durationMs  Transition duration in milliseconds (default 600)
 */
export async function zoomReset(
  page: Page,
  durationMs = 600,
): Promise<void> {
  await page.evaluate((dur) => {
    const body = document.body;
    body.style.transition = `transform ${dur}ms cubic-bezier(0.4,0,0.2,1)`;
    body.style.transform = "scale(1)";
  }, durationMs);
  await page.waitForTimeout(durationMs + 100);
}

/**
 * Display a semi-transparent overlay pill with blurred background at the
 * bottom-center of the viewport. Useful for scene titles and callouts.
 *
 * @param page        Playwright Page instance
 * @param text        Text to display
 * @param durationMs  How long to show the overlay before auto-clearing
 *                    (default 0 = manual clear via {@link clearOverlay})
 * @param options     Visual customisation
 */
export async function showOverlay(
  page: Page,
  text: string,
  durationMs = 0,
  options: {
    bgColor?: string;
    textColor?: string;
    fontSize?: string;
  } = {},
): Promise<void> {
  const {
    bgColor = "rgba(0, 0, 0, 0.65)",
    textColor = "#d0ff00",
    fontSize = "22px",
  } = options;

  await page.evaluate(
    ([txt, bg, fg, fs]) => {
      // Remove any existing overlay first.
      document.getElementById("__video_overlay")?.remove();

      const el = document.createElement("div");
      el.id = "__video_overlay";
      Object.assign(el.style, {
        position: "fixed",
        bottom: "48px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "14px 32px",
        borderRadius: "14px",
        background: bg,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: fg,
        fontSize: fs,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontWeight: "600",
        letterSpacing: "0.02em",
        zIndex: "999999",
        pointerEvents: "none",
        opacity: "0",
        transition: "opacity 0.35s ease",
        whiteSpace: "nowrap",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      });
      el.textContent = txt;
      document.body.appendChild(el);
      // Trigger fade-in on next frame.
      requestAnimationFrame(() => {
        el.style.opacity = "1";
      });
    },
    [text, bgColor, textColor, fontSize] as const,
  );

  if (durationMs > 0) {
    await page.waitForTimeout(durationMs);
    await clearOverlay(page);
  }
}

/**
 * Remove the overlay pill created by {@link showOverlay}.
 *
 * @param page  Playwright Page instance
 */
export async function clearOverlay(page: Page): Promise<void> {
  await page.evaluate(() => {
    const el = document.getElementById("__video_overlay");
    if (!el) return;
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 400);
  });
  await page.waitForTimeout(450);
}

/**
 * Show a full-screen branded closing card with a headline, optional
 * subtitle, and optional logo. The card fades in and holds for `holdMs`.
 *
 * @param page     Playwright Page instance
 * @param options  Card content and timing
 */
export async function showClosingCard(
  page: Page,
  options: {
    headline: string;
    subtitle?: string;
    logoUrl?: string;
    holdMs?: number;
  },
): Promise<void> {
  const { headline, subtitle, logoUrl, holdMs = 4000 } = options;

  await page.evaluate(
    ([hl, sub, logo]) => {
      document.getElementById("__closing_card")?.remove();

      const card = document.createElement("div");
      card.id = "__closing_card";
      Object.assign(card.style, {
        position: "fixed",
        inset: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
        zIndex: "9999999",
        opacity: "0",
        transition: "opacity 0.8s ease",
      });

      if (logo) {
        const img = document.createElement("img");
        img.src = logo;
        Object.assign(img.style, {
          width: "72px",
          height: "72px",
          objectFit: "contain",
          marginBottom: "8px",
        });
        card.appendChild(img);
      }

      const h1 = document.createElement("h1");
      Object.assign(h1.style, {
        color: "#ffffff",
        fontSize: "48px",
        fontWeight: "700",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        margin: "0",
        textAlign: "center",
        padding: "0 40px",
      });
      h1.textContent = hl;
      card.appendChild(h1);

      if (sub) {
        const p = document.createElement("p");
        Object.assign(p.style, {
          color: "rgba(255,255,255,0.6)",
          fontSize: "22px",
          fontWeight: "400",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          margin: "0",
          textAlign: "center",
          padding: "0 60px",
        });
        p.textContent = sub;
        card.appendChild(p);
      }

      document.body.appendChild(card);
      requestAnimationFrame(() => {
        card.style.opacity = "1";
      });
    },
    [headline, subtitle, logoUrl] as const,
  );

  await page.waitForTimeout(holdMs);
}

/**
 * Wait until all loading spinners matching `spinnerSelector` have
 * disappeared from the DOM, with a configurable timeout.
 *
 * @param page             Playwright Page instance
 * @param spinnerSelector  CSS selector that matches loading indicators
 *                         (default: `[data-loading], .spinner, .loading`)
 * @param maxWaitMs        Maximum time to wait in milliseconds (default 15 000)
 */
export async function waitForLoadingComplete(
  page: Page,
  spinnerSelector = "[data-loading], .spinner, .loading",
  maxWaitMs = 15_000,
): Promise<void> {
  try {
    await page.waitForFunction(
      (sel) => document.querySelectorAll(sel).length === 0,
      spinnerSelector,
      { timeout: maxWaitMs },
    );
  } catch {
    // Timed out — continue anyway so the recording isn't blocked.
  }
}
