import React, { useState } from "react";

export default function ItemCard({ item, deleteItem }) {
  const [liked, setLiked] = useState(item.liked || false);
  const [done, setDone] = useState(item.done || false);
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={`item-card ${expanded ? "expanded" : ""}`}>
      <div className="card-top">
        <h3>{item.title}</h3>
        <div className="controls">
          <button className="icon" onClick={() => setLiked((s) => !s)}>{liked ? "❤️" : "🤍"}</button>
          <button className={`icon ${done ? "done" : ""}`} onClick={() => setDone((d) => !d)}>{done ? "✓" : "◻"}</button>
          <button className="icon" onClick={() => setExpanded((e) => !e)}>{expanded ? "▲" : "▼"}</button>
        </div>
      </div>

      <div className="meta">
        <span className="tag">{item.category}</span>
      </div>

      {expanded && <p className="desc">{item.description}</p>}

      <div className="card-actions">
        <button className="delete" onClick={() => deleteItem(item.id)}>Delete</button>
      </div>
    </article>
  );
}
