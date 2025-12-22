import Navbar from "./Navbar";
import Hero from "./Hero";
import Row from "./Row";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <Hero />

      <Row title="🔥 Top Rated" />
      <Row title="🆕 Latest Releases" />
    </div>
  );
}
