import { useEffect, useState } from "react";
import { getTopAnime } from "../api/animeApi";
import AnimeCard from "./AnimeCard";
import SkeletonCard from "./SkeletonCard";
import "./Section.css";

export default function Section({ title, data }) {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (data && data.length > 0) {
      setAnime(data);
      setLoading(false);
    } else {
      getTopAnime()
        .then((res) => {
          setAnime(res?.slice(0, 12) || []);
        })
        .finally(() => setLoading(false));
    }
  }, [data]);

  return (
    <section className="section">
      <h2>{title}</h2>

      <div className="slider">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, i) => <SkeletonCard key={i} />)
          : anime.map((a) => (
              <AnimeCard
                key={a.mal_id}
                id={a.mal_id}
                title={a.title}
                rating={a.score}
                image={a.images?.jpg?.image_url}
              />
            ))}
      </div>
    </section>
  );
}
