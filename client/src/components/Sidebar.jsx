import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">HASHANIME</h2>

      <div className="menu">
        <p className="active">🏠 Home</p>
        <p>👥 Community</p>
        <p>🎉 Events</p>
      </div>

      <h4>Categories</h4>
      <div className="menu">
        <p>🎬 Movies</p>
        <p>📺 Series</p>
      </div>

      <h4>Library</h4>
      <div className="menu">
        <p>🕒 Recent</p>
        <p>⬇ Downloaded</p>
      </div>
    </aside>
  );
}
