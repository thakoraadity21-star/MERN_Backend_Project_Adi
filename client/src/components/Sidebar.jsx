import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">HASHANIME</h2>

      {/* MAIN MENU */}
      <div className="menu">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          🏠 Home
        </NavLink>

        <NavLink
          to="/community"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          👥 Community
        </NavLink>

        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          🎉 Events
        </NavLink>
      </div>

      {/* CATEGORIES */}
      <h4>Categories</h4>
      <div className="menu">
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          🎬 Movies
        </NavLink>

        <NavLink
          to="/series"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          📺 Series
        </NavLink>
      </div>

      {/* LIBRARY */}
      <h4>Library</h4>
      <div className="menu">
        <NavLink
          to="/recent"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          🕒 Recent
        </NavLink>

        <NavLink
          to="/downloads"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          ⬇ Downloaded
        </NavLink>
      </div>
    </aside>
  );
}
