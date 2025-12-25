import { useEffect, useState } from "react";

const STORAGE_KEY = "recent_searches";

export default function useSearchHistory(limit = 5) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setHistory(saved);
  }, []);

  const addSearch = (query) => {
    if (!query.trim()) return;

    setHistory((prev) => {
      const updated = [
        query,
        ...prev.filter((item) => item !== query),
      ].slice(0, limit);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  };

  return { history, addSearch, clearHistory };
}
