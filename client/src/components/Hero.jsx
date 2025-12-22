import { useEffect, useState } from "react";
import { getTopAnime } from "../api/animeApi";
import "./Hero.css";

export default function Hero() {
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    getTopAnime().then((data) => {
      setAnime(data[Math.floor(Math.random() * 5)]);
    });
  }, []);

  if (!anime) return null;

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${anime.images.jpg.large_image_url})`,
      }}
    >
      <div className="hero-overlay">
        <h1>{anime.title}</h1>
        <p>⭐ {anime.score || "N/A"} | {anime.year || "Anime"}</p>
        <button className="hero-btn">▶ Watch Now</button>
      </div>
    </section>
  );
}
