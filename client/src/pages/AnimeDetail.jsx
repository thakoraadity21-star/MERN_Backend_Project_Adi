import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnimeById } from "../api/animeApi";
import { useWatchlist } from "../context/WatchlistContext";
import EpisodeList from "../components/EpisodeList";
import TrailerModal from "../components/TrailerModal";
import "./AnimeDetail.css";

export default function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } =
    useWatchlist();

  useEffect(() => {
    setLoading(true);
    getAnimeById(id)
      .then((data) => {
        setAnime(data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="spinner"></div>
        Loading anime details...
      </div>
    );
  }

  if (!anime) {
    return <p style={{ padding: 40 }}>Anime not found ❌</p>;
  }

  const liked = isInWatchlist(anime.mal_id);

  const toggleWatchlist = () => {
    liked
      ? removeFromWatchlist(anime.mal_id)
      : addToWatchlist({
          mal_id: anime.mal_id, // ✅ FIXED
          title: anime.title,
          image:
            anime.images?.jpg?.image_url ||
            "https://via.placeholder.com/300x450?text=No+Image",
          rating: anime.score || "N/A",
        });
  };

  return (
    <>
      {/* 🔥 HERO SECTION */}
      <section
        className="detail-hero"
        style={{
          backgroundImage: `linear-gradient(to right, #020617 35%, transparent), url(${anime.images?.jpg?.large_image_url})`,
        }}
      >
        <div className="hero-content">
          <h1>{anime.title}</h1>

          <p className="hero-rating">⭐ {anime.score || "N/A"}</p>

          <div className="hero-genres">
            {anime.genres?.map((g) => (
              <span key={g.mal_id}>{g.name}</span>
            ))}
          </div>

          <p className="hero-synopsis">{anime.synopsis}</p>

          <div className="hero-actions">
            <button className="watchlist-btn" onClick={toggleWatchlist}>
              {liked ? "✔ In Watchlist" : "➕ Add to Watchlist"}
            </button>

            {anime.trailer?.embed_url && (
              <button
                className="play-btn"
                onClick={() => setShowTrailer(true)}
              >
                ▶ Watch Trailer
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 📺 EPISODES */}
      <EpisodeList
        episodes={[
          { number: 1, title: "The Beginning", duration: "24m" },
          { number: 2, title: "New Power", duration: "23m" },
          { number: 3, title: "First Battle", duration: "25m" },
          { number: 4, title: "Turning Point", duration: "24m" },
        ]}
      />

      {/* 🎬 TRAILER */}
      <TrailerModal
        open={showTrailer}
        trailerUrl={anime.trailer?.embed_url}
        onClose={() => setShowTrailer(false)}
      />
    </>
  );
}
