import { useState } from "react";
import { searchAnime } from "../api/animeApi";
import "./TopNav.css";

export default function TopNav({ setSearchResult }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setSearchResult([]);
      return;
    }

    try {
      setLoading(true);
      const data = await searchAnime(query);
      setSearchResult(data || []);
    } catch (error) {
      console.error("Search failed", error);
      setSearchResult([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="topnav" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search anime..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button type="submit">
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
