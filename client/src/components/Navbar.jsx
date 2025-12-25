import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import useSearchHistory from "../hooks/useSearchHistory";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("movies");
  const [showHistory, setShowHistory] = useState(false);

  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 600);

  const { history, addSearch, clearHistory } = useSearchHistory(5);
  const { theme, toggleTheme } = useTheme(); // ✅ THEME HOOK

  // 🔥 AUTO SEARCH
  useEffect(() => {
    if (debouncedQuery.trim().length > 2) {
      navigate(`/search?q=${debouncedQuery}`);
      addSearch(debouncedQuery);
      setShowHistory(false);
    }
  }, [debouncedQuery, navigate, addSearch]);

  return (
    <div className="navbar">
      {/* LEFT TABS */}
      <div className="tabs">
        <span
          className={activeTab === "movies" ? "active" : ""}
          onClick={() => {
            setActiveTab("movies");
            navigate("/movies");
          }}
        >
          Movies
        </span>

        <span
          className={activeTab === "series" ? "active" : ""}
          onClick={() => {
            setActiveTab("series");
            navigate("/series");
          }}
        >
          Series
        </span>
      </div>

      {/* 🔍 SEARCH BOX */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowHistory(true)}
        />

        {query && (
          <span className="clear-btn" onClick={() => setQuery("")}>
            ✖
          </span>
        )}

        {/* 🔁 RECENT SEARCHES */}
        {showHistory && history.length > 0 && (
          <div className="search-history">
            <div className="history-header">
              <span>Recent Searches</span>
              <button onClick={clearHistory}>Clear</button>
            </div>

            {history.map((item, index) => (
              <div
                key={index}
                className="history-item"
                onClick={() => {
                  setQuery(item);
                  navigate(`/search?q=${item}`);
                  setShowHistory(false);
                }}
              >
                🔍 {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🌙☀️ DARK / LIGHT TOGGLE */}
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </div>
  );
}
