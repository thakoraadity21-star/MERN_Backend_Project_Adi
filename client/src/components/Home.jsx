import "./Home.css";

export default function Home() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(2, 6, 23, 0.95) 30%,
            rgba(2, 6, 23, 0.6) 55%,
            rgba(2, 6, 23, 0.2) 75%,
            rgba(2, 6, 23, 0)
          ),
          url("https://images8.alphacoders.com/132/1328398.jpeg")
        `,
      }}
    >
      <div className="hero-content">
        <h1>Watch Anime Like Never Before</h1>

        <p>
          Unlimited anime • HD streaming • New episodes every week
        </p>

        <div className="hero-buttons">
          <button className="btn-primary">▶ Watch Now</button>
          <button className="btn-secondary">＋ Add to Watchlist</button>
        </div>
      </div>
    </section>
  );
}
