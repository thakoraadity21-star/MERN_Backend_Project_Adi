import { createContext, useContext, useState } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);

  // ✅ ADD
  const addToWatchlist = (anime) => {
    const exists = watchlist.find((a) => a.mal_id === anime.mal_id);
    if (!exists) {
      setWatchlist([...watchlist, anime]);
    }
  };

  // ✅ REMOVE (MISSING THA – ERROR YAHI SE AAYA)
  const removeFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((a) => a.mal_id !== id));
  };

  // ✅ CHECK (for glow / highlight)
  const isInWatchlist = (id) => {
    return watchlist.some((a) => a.mal_id === id);
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
