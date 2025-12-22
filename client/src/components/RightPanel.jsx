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
        watchlist.map((a) => (
          <div key={a.mal_id} className="watch-item">
            <Link to={`/anime/${a.mal_id}`}>
              <img src={a.images.jpg.image_url} alt={a.title} />
            </Link>

            <div>
              <p>{a.title}</p>
              <button onClick={() => removeFromWatchlist(a.mal_id)}>
                ❌ Remove
              </button>
            </div>
          </div>
        ))
      )}
    </aside>
  );
}
