import React from "react";

export default function Sidebar({ setSection }) {
  return (
    <aside className="neo-side">
      <div className="side-top">
        <h4>Menu</h4>
        <p className="side-note">Neon quick links</p>
      </div>

      <div className="side-list">
        <button className="side-item" onClick={() => setSection("home")}>🏠 Home</button>
        <button className="side-item" onClick={() => setSection("project")}>🎬 Project</button>
        <button className="side-item" onClick={() => setSection("about")}>ℹ About</button>
      </div>

      <div className="side-footer">
        <small>Tip: Add items in Project → Add Item</small>
      </div>
    </aside>
  );
}
