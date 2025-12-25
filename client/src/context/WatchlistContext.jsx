import { createContext, useContext, useState } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);

  // ✅ ADD (ULTRA SAFE)
  const addToWatchlist = (anime) => {
    if (!anime || !anime.mal_id) return;

    const exists = watchlist.some(
      (a) => a?.mal_id === anime.mal_id
    );

    if (!exists) {
      setWatchlist((prev) => [...prev, anime]);
    }
  };

  // ✅ REMOVE (SAFE)
  const removeFromWatchlist = (id) => {
    if (!id) return;

    setWatchlist((prev) =>
      prev.filter((a) => a?.mal_id !== id)
    );
  };

  // ✅ CHECK (CRASH-PROOF)
  const isInWatchlist = (id) => {
    if (!id) return false;

    return watchlist.some(
      (a) => a?.mal_id === id
    );
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}
