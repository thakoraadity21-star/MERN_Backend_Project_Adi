import AnimeCard from "./AnimeCard";
import "./Row.css";

export default function Row({ title }) {
  return (
    <>
      <h2 className="rowTitle">{title}</h2>
      <div className="rowScroll">
        <AnimeCard title="Attack on Titan" image="/animebg.jpg" />
        <AnimeCard title="One Piece" image="/naruto.jpg" />
        <AnimeCard title="Death Note" image="/death.jpg" />
        <AnimeCard title="Demon Slayer" image="/demon.jpg" />
        <AnimeCard title="Solo Leveling" image="/animebg.jpg" />
      </div>
    </>
  );
}
