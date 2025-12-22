import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import "./AnimeCard.css";

export default function AnimeCard({ id, title, image, rating, anime }) {
  const {
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  } = useWatchlist();

  const liked = isInWatchlist(id);

  const handleToggle = (e) => {
    e.preventDefault(); // 👈 link ke click ko block kare
    liked ? removeFromWatchlist(id) : addToWatchlist(anime);
  };

  return (
    <div className={`anime-card ${liked ? "glow" : ""}`}>
      {/* ❤️ HEART BUTTON */}
      <button className="heart" onClick={handleToggle}>
        {liked ? "❤️" : "🤍"}
      </button>

      <Link to={`/anime/${id}`}>
        <div className="anime-img">
          <img src={image} alt={title} />
          <span className="rating">⭐ {rating || "N/A"}</span>
        </div>

        <p className="anime-title">{title}</p>
      </Link>
    </div>
  );
}
