import { useState } from "react";

export default function Form({ addItem }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Anime");
  const [description, setDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;

    addItem({
      id: Date.now(),
      title,
      category,
      description,
      liked: false,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form className="p-4 bg-dark text-light rounded" onSubmit={submitHandler}>
      <h4>Add New Item</h4>

      <input
        className="form-control mt-3"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="form-control mt-3"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Anime</option>
        <option>Movie</option>
      </select>

      <textarea
        className="form-control mt-3"
        placeholder="Enter Description"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="btn btn-primary mt-3">Add Item</button>
    </form>
  );
}
