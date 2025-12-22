import "./TopRated.css";

const animeList = [
  {
    title: "Solo Leveling",
    rating: 9.5,
    image: "https://wallpaperaccess.com/full/7746152.jpg",
  },
  {
    title: "Naruto",
    rating: 9.0,
    image: "https://wallpaperaccess.com/full/1285626.jpg",
  },
  {
    title: "Attack on Titan",
    rating: 9.8,
    image: "https://wallpaperaccess.com/full/1655656.jpg",
  },
  {
    title: "Demon Slayer",
    rating: 9.2,
    image: "https://wallpaperaccess.com/full/2703652.jpg",
  },
  {
    title: "One Punch Man",
    rating: 8.9,
    image: "https://wallpaperaccess.com/full/1669285.jpg",
  },
];

export default function TopRated() {
  return (
    <section className="top-rated">
      <h2>🔥 Top Rated Anime</h2>

      <div className="anime-row">
        {animeList.map((anime, index) => (
          <div className="anime-card" key={index}>
            <img src={anime.image} alt={anime.title} />
            <div className="card-info">
              <h4>{anime.title}</h4>
              <span>⭐ {anime.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
