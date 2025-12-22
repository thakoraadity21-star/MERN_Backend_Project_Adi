import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnimeById } from "../api/animeApi";
import "./AnimeDetail.css";

export default function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnimeById(id).then((data) => {
      setAnime(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="detail-loading">Loading...</div>;
  }

  return (
    <div className="anime-detail">
      <div className="detail-left">
        <img src={anime.images.jpg.large_image_url} alt={anime.title} />
      </div>

      <div className="detail-right">
        <h1>{anime.title}</h1>

        <p className="rating">⭐ {anime.score}</p>

        <div className="genres">
          {anime.genres.map((g) => (
            <span key={g.mal_id}>{g.name}</span>
          ))}
        </div>

        <p className="synopsis">{anime.synopsis}</p>

        <button className="watchlist-btn">
          ➕ Add to Watchlist
        </button>
      </div>
    </div>
  );
}
