import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">HASHANIME</h2>

      <div className="menu">
        <NavLink to="/" end>🏠 Home</NavLink>
        <NavLink to="/community">👥 Community</NavLink>
        <NavLink to="/events">🎉 Events</NavLink>
      </div>

      <h4>Categories</h4>
      <div className="menu">
        <NavLink to="/movies">🎬 Movies</NavLink>
        <NavLink to="/series">📺 Series</NavLink>
      </div>

      <h4>Library</h4>
      <div className="menu">
        <NavLink to="/recent">🕒 Recent</NavLink>
        <NavLink to="/downloads">⬇ Downloaded</NavLink>
      </div>
    </aside>
  );
}
