import "./TrailerModal.css";

export default function TrailerModal({ open, trailerUrl, onClose }) {
  if (!open) return null;

  return (
    <div className="trailer-overlay" onClick={onClose}>
      <div
        className="trailer-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        <iframe
          src={trailerUrl}
          title="Anime Trailer"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
}
