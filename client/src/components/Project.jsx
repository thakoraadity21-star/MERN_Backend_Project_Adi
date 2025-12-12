import React, { useState } from "react";
import ItemCard from "./ItemCard";

export default function Project({ items, addItem, deleteItem, clearAll }) {
  // useState examples (3+)
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Anime");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setSuccess("Please fill all fields");
      setTimeout(() => setSuccess(""), 1400);
      return;
    }
    const newItem = {
      id: Date.now(),
      title: title.trim(),
      category,
      description: description.trim(),
      liked: false,
      done: false,
    };
    addItem(newItem);
    setTitle("");
    setDescription("");
    setSuccess("Item added!");
    setTimeout(() => setSuccess(""), 1400);
  };

  return (
    <section className="neo-section">
      <div className="project-top">
        <h2 className="holo-sub">Project — Add Items</h2>
        {success && <div className="success">{success}</div>}
      </div>

      <form className="neo-form" onSubmit={submit}>
        <input className="neo-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <select className="neo-input" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Anime</option>
          <option>Movie</option>
          <option>Series</option>
        </select>
        <textarea className="neo-input" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" />
        <button className="neo-submit">Add Item</button>
      </form>

      <div className="list-area">
        {items.length === 0 ? (
          <p className="muted">No items yet — add your first!</p>
        ) : (
          <div className="cards-grid">
            {items.map((it) => (
              <ItemCard key={it.id} item={it} deleteItem={deleteItem} />
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && <button className="neo-clear" onClick={clearAll}>Clear All</button>}
    </section>
  );
}
