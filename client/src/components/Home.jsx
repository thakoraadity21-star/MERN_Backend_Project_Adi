import { useEffect, useState } from "react";

const API = "/api/movies";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    title: "",
    type: "movie",
    genre: "",
    rating: "",
  });
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState("");

  // GET
  const fetchMovies = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setMovies(data.data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // ADD / UPDATE
  const submitHandler = async () => {
    if (!form.title) {
      setMsg("❌ Title required");
      return;
    }

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API}/${editId}` : API;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ title: "", type: "movie", genre: "", rating: "" });
    setEditId(null);
    setMsg("✅ Saved successfully");
    fetchMovies();
  };

  // DELETE
  const deleteMovie = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    await fetch(`${API}/${id}`, { method: "DELETE" });
    setMsg("🗑️ Deleted");
    fetchMovies();
  };

  // EDIT
  const editMovie = (movie) => {
    setForm(movie);
    setEditId(movie.id);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🎬 Movie & Anime Catalog</h2>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="movie">Movie</option>
        <option value="anime">Anime</option>
      </select>

      <input
        placeholder="Genre"
        value={form.genre}
        onChange={(e) => setForm({ ...form, genre: e.target.value })}
      />

      <input
        placeholder="Rating"
        value={form.rating}
        onChange={(e) => setForm({ ...form, rating: e.target.value })}
      />

      <button onClick={submitHandler}>
        {editId ? "Update" : "Add"}
      </button>

      <p>{msg}</p>

      <hr />

      {movies.map((m) => (
        <div key={m.id}>
          <strong>{m.title}</strong> ({m.type}) ⭐ {m.rating}
          <button onClick={() => editMovie(m)}>Edit</button>
          <button onClick={() => deleteMovie(m.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
