import { useEffect, useRef } from "react";
import "./VideoModal.css";

export default function VideoModal({ open, onClose, episode }) {
  const videoRef = useRef(null);

  // 🔐 ESC key close support
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    const videoElement = videoRef.current;

    if (open) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      if (videoElement) {
        videoElement.pause(); // 🔥 audio leak fix
      }
    };
  }, [open, onClose]);

  if (!open || !episode) return null;

  return (
    <div
      className="video-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="video-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="video-header">
          <h3>
            Episode {episode.number} – {episode.title}
          </h3>

          <button
            className="close-btn"
            aria-label="Close video"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* VIDEO */}
        <div className="video-player">
          {/* 🔥 DEMO VIDEO (Phase 5: real stream) */}
          <video
            ref={videoRef}
            controls
            autoPlay
            playsInline
          >
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              type="video/mp4"
            />
            Your browser does not support video playback.
          </video>
        </div>
      </div>
    </div>
  );
}
