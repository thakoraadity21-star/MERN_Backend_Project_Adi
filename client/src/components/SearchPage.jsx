import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchAnime } from "../api/animeApi";
import AnimeCard from "../components/AnimeCard";
import SkeletonCard from "../components/SkeletonCard";
import useDebounce from "../hooks/useDebounce";
import FilterBar from "../components/FilterBar";
import "./SearchPage.css";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";

  const debouncedQuery = useDebounce(query, 500);

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("rating");

  // 🔍 FETCH SEARCH
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 3) {
      setResults([]);
      setPage(1);
      return;
    }

    setLoading(true);

    searchAnime(debouncedQuery, page)
      .then((data) => {
        if (data.length === 0) setHasMore(false);

        setResults((prev) =>
          page === 1 ? data : [...prev, ...data]
        );
      })
      .finally(() => setLoading(false));
  }, [debouncedQuery, page]);

  // 🔥 RESET ON NEW SEARCH
  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
  }, [debouncedQuery]);

  // ⬇️ INFINITE SCROLL
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300 &&
        hasMore &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  // ⭐ FILTER + SORT
  const processedResults = results
    .filter((anime) =>
      filter === "top" ? anime.score >= 8 : true
    )
    .sort((a, b) => {
      if (sort === "rating") return b.score - a.score;
      if (sort === "name") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <section className="search-page">
      <h2>
        Search Results for: <span>"{debouncedQuery}"</span>
      </h2>

      {results.length > 0 && (
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
        />
      )}

      <div className="anime-grid">
        {processedResults.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            id={anime.mal_id}
            title={anime.title}
            image={anime.images?.jpg?.image_url}
            rating={anime.score}
          />
        ))}

        {loading &&
          [...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
      </div>

      {!hasMore && (
        <p className="empty">🎉 You’ve reached the end</p>
      )}
    </section>
  );
}
