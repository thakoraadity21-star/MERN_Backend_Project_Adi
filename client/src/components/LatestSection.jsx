import AnimeCard from "./AnimeCard";
import "./LatestSection.css";

const latestAnime = [
  {
    id: "naruto",
    title: "Naruto",
    image: "https://wallpaperaccess.com/full/1095781.jpg",
    rating: 8.9,
  },
  {
    id: "one-piece",
    title: "One Piece",
    image: "https://wallpaperaccess.com/full/1350205.jpg",
    rating: 9.1,
  },
  {
    id: "death-note",
    title: "Death Note",
    image: "https://wallpaperaccess.com/full/1600213.jpg",
    rating: 9.0,
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    image: "https://wallpaperaccess.com/full/2703652.jpg",
    rating: 8.7,
  },
];

export default function LatestSection() {
  return (
    <section className="latest-section">
      <h2>Latest Anime</h2>

      <div className="anime-row">
        {latestAnime.map((anime) => (
          <AnimeCard key={anime.id} {...anime} />
        ))}
      </div>
    </section>
  );
}
