import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import "./RightPanel.css";

export default function RightPanel() {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <aside className="right-panel">
      <h3>❤️ Watchlist</h3>

      {watchlist.length === 0 ? (
        <p className="empty">No anime added</p>
      ) : (
        watchlist.map((a) => {
          if (!a || !a.mal_id) return null;

          return (
            <div key={a.mal_id} className="watch-item">
              <Link to={`/anime/${a.mal_id}`}>
                <img
                  src={
                    a.image ||
                    "https://via.placeholder.com/80x110?text=No+Image"
                  }
                  alt={a.title || "Anime"}
                />
              </Link>

              <div className="watch-info">
                <p className="watch-title">
                  {a.title || "Untitled"}
                </p>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeFromWatchlist(a.mal_id)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })
      )}
    </aside>
  );
}
