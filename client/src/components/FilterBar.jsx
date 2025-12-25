import "./FilterBar.css";

export default function FilterBar({
  filter,
  setFilter,
  sort,
  setSort,
}) {
  return (
    <div className="filter-bar">
      {/* ⭐ FILTER */}
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="top">Top Rated (8+)</option>
      </select>

      {/* 🔃 SORT */}
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="rating">Sort by Rating</option>
        <option value="name">Sort by Name</option>
      </select>
    </div>
  );
}
