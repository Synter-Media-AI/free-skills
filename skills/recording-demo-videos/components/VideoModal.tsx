import React, { useEffect, useRef, useCallback } from "react";

export interface VideoModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback to toggle the modal */
  onOpenChange: (open: boolean) => void;
  /** URL or path to the video source */
  videoSrc: string;
  /** Optional title shown above the video */
  title?: string;
}

/**
 * A framework-agnostic modal that plays a video with backdrop blur.
 *
 * Features:
 * - Backdrop blur + dark scrim
 * - Close on Escape key
 * - Close on backdrop click
 * - Auto-play when opened, pause & reset when closed
 */
export function VideoModal({
  open,
  onOpenChange,
  videoSrc,
  title,
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  // Auto-play on open; pause + reset on close
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (open) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, close]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Video player"}
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        animation: "videoModalFadeIn 0.25s ease",
      }}
    >
      {/* Inline keyframe animation */}
      <style>{`
        @keyframes videoModalFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "90%",
          maxWidth: 960,
          borderRadius: 12,
          overflow: "hidden",
          background: "#000",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
      >
        {/* Close button */}
        <button
          onClick={close}
          aria-label="Close video"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 2,
            width: 36,
            height: 36,
            border: "none",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            color: "#fff",
            fontSize: 20,
            lineHeight: "36px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
          }}
        >
          ✕
        </button>

        {/* Title bar */}
        {title && (
          <div
            style={{
              padding: "14px 48px 14px 20px",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              background: "rgba(0,0,0,0.5)",
            }}
          >
            {title}
          </div>
        )}

        {/* Video */}
        <video
          ref={videoRef}
          src={videoSrc}
          controls
          playsInline
          style={{ display: "block", width: "100%", outline: "none" }}
        />
      </div>
    </div>
  );
}
