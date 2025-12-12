import React from "react";

export default function Navbar({ section, setSection }) {
  return (
    <header className="neo-nav">
      <div className="neo-brand">
        <div className="brand-holo">ANIME<span className="dot">•</span>MOVIE</div>
        <div className="brand-sub">Catalog — Neon Dashboard</div>
      </div>

      <nav className="neo-nav-actions">
        <button
          className={`neo-btn ${section === "home" ? "active" : ""}`}
          onClick={() => setSection("home")}
        >
          Home
        </button>
        <button
          className={`neo-btn ${section === "about" ? "active" : ""}`}
          onClick={() => setSection("about")}
        >
          About
        </button>
        <button
          className={`neo-btn ${section === "project" ? "active" : ""}`}
          onClick={() => setSection("project")}
        >
          Project
        </button>
      </nav>
    </header>
  );
}
