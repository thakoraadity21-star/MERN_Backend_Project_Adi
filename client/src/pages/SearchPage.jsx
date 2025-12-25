import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { searchAnime } from "../api/animeApi";
import AnimeCard from "../components/AnimeCard";
import SkeletonCard from "../components/SkeletonCard";
import useDebounce from "../hooks/useDebounce";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import "./SearchPage.css";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";

  const debouncedQuery = useDebounce(query, 500);

  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);

  // 🔁 Reset when query changes
  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
  }, [debouncedQuery]);

  // 🔥 Fetch anime
  const fetchAnime = useCallback(() => {
    if (!debouncedQuery || debouncedQuery.length < 3 || loading || !hasMore)
      return;

    setLoading(true);
    setError(false);

    searchAnime(debouncedQuery, page)
      .then((data) => {
        if (!data || data.length === 0) {
          setHasMore(false);
        } else {
          setResults((prev) =>
            page === 1 ? data : [...prev, ...data]
          );
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [debouncedQuery, page, loading, hasMore]);

  // 🔁 Call API
  useEffect(() => {
    fetchAnime();
  }, [fetchAnime]);

  // 🔽 Infinite Scroll
  useInfiniteScroll(() => {
    if (!loading && hasMore) {
      setPage((p) => p + 1);
    }
  });

  return (
    <section className="search-page">
      <h2>
        Search Results for: <span>"{debouncedQuery}"</span>
      </h2>

      {/* 🔥 LOADING SKELETON */}
      {loading && page === 1 && (
        <div className="anime-grid">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* ❌ ERROR */}
      {!loading && error && (
        <p className="empty">⚠ Something went wrong</p>
      )}

      {/* 😢 NO RESULTS */}
      {!loading &&
        !error &&
        results.length === 0 &&
        debouncedQuery.length > 2 && (
          <p className="empty">No anime found 😢</p>
        )}

      {/* ✅ RESULTS */}
      <div className="anime-grid">
        {results.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            id={anime.mal_id}
            title={anime.title}
            image={anime.images?.jpg?.image_url}
            rating={anime.score}
          />
        ))}
      </div>

      {/* 🔄 LOADING MORE */}
      {loading && page > 1 && (
        <p className="loading">Loading more...</p>
      )}
    </section>
  );
}
