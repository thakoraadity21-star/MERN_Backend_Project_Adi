import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import "./AnimeCard.css";

export default function AnimeCard({
  id,
  title = "Unknown Title",
  image,
  rating,
}) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } =
    useWatchlist();

  const safeId = id ?? null;
  const liked = safeId ? isInWatchlist(safeId) : false;

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!safeId) return;

    const animeData = {
      mal_id: safeId,
      title,
      image:
        image ||
        "https://via.placeholder.com/300x450?text=No+Image",
      rating: rating || "N/A",
    };

    liked
      ? removeFromWatchlist(safeId)
      : addToWatchlist(animeData);
  };

  return (
    <div className={`anime-card ${liked ? "glow" : ""}`}>
      <button className="heart" onClick={handleToggle}>
        {liked ? "❤️" : "🤍"}
      </button>

      <Link
        to={safeId ? `/anime/${safeId}` : "#"}
        className="anime-link"
      >
        <div className="anime-img">
          <img
            src={
              image ||
              "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={title}
          />
          <span className="rating">⭐ {rating || "N/A"}</span>
        </div>

        <p className="anime-title">{title}</p>
      </Link>
    </div>
  );
}
