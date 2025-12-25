import "./Home.css";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>Watch Anime Like Never Before</h1>
        <p>
          Unlimited anime • HD streaming • New episodes every week
        </p>

        <div className="hero-buttons">
          <button className="btn-primary">
            ▶ Watch Now
          </button>

          <button className="btn-secondary">
            ＋ Add to Watchlist
          </button>
        </div>
      </div>
    </section>
  );
}
