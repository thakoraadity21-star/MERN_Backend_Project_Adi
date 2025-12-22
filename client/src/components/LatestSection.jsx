import AnimeCard from "./AnimeCard";
import "./LatestSection.css";

const latestAnime = [
  {
    title: "Naruto",
    image: "https://wallpaperaccess.com/full/1095781.jpg",
  },
  {
    title: "One Piece",
    image: "https://wallpaperaccess.com/full/1350205.jpg",
  },
  {
    title: "Death Note",
    image: "https://wallpaperaccess.com/full/1600213.jpg",
  },
  {
    title: "Demon Slayer",
    image: "https://wallpaperaccess.com/full/2703652.jpg",
  },
];

export default function LatestSection() {
  return (
    <section className="latest-section">
      <h2>Latest Anime</h2>

      <div className="anime-row">
        {latestAnime.map((anime, index) => (
          <AnimeCard key={index} {...anime} />
        ))}
      </div>
    </section>
  );
}
