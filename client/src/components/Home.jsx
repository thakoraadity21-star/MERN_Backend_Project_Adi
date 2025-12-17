import React from "react";

export default function Home({ backendMessage }) {
  return (
    <section className="neo-section">
      <div className="home-hero">
        <h1 className="holo-heading">Welcome to the movie or anime</h1>

        <p className="muted">
          A futuristic anime + movie dashboard — add, manage, and like your favorites.
        </p>

        {/* ✅ Backend message (Day-1 proof) */}
        {backendMessage && (
          <div
            style={{
              marginTop: "12px",
              padding: "8px 14px",
              borderRadius: "10px",
              background: "rgba(59,130,246,0.15)",
              color: "#93c5fd",
              fontSize: "14px",
              display: "inline-block"
            }}
          >
            🔗 Backend says: {backendMessage}
          </div>
        )}

        <div className="home-keywords">
          <span className="kw light">Anime</span>
          <span className="kw light">Movie</span>
          <span className="kw light">Watchlist</span>
          <span className="kw light">Favorites</span>
          <span className="kw light">Reviews</span>
        </div>

        <div className="home-cards">
          <div className="home-card">Fast Add</div>
          <div className="home-card">Organize</div>
          <div className="home-card">Connect Next Week</div>
        </div>
      </div>
    </section>
  );
}
