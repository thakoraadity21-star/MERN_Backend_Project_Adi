import { useEffect, useState } from "react";

const API = "http://localhost:10000/api/demo";

function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  // GET
  const fetchData = async () => {
    const res = await fetch(API);
    const json = await res.json();
    setData(json.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ADD / UPDATE
  const handleSubmit = async () => {
    if (!text.trim()) {
      setMsg("❌ Text required");
      return;
    }

    setLoading(true);

    const url = editId
      ? `${API}/update/${editId}`
      : `${API}/add`;

    const method = editId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ test: text }),
    });

    const json = await res.json();

    if (json.success) {
      setData(json.data);
      setMsg(editId ? "✅ Data updated" : "✅ Data added");
      setText("");
      setEditId(null);
    } else {
      setMsg("❌ " + json.message);
    }

    setLoading(false);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    const res = await fetch(`${API}/delete/${id}`, {
      method: "DELETE",
    });

    const json = await res.json();

    if (json.success) {
      setData(json.data);
      setMsg("🗑️ Data deleted");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Day 5 – Full CRUD Demo</h2>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={handleSubmit} disabled={loading}>
        {editId ? "Update" : "Submit"}
      </button>

      <p>{msg}</p>

      <h3>Fetched Data</h3>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.test}{" "}
            <button onClick={() => {
              setText(item.test);
              setEditId(item.id);
            }}>
              Edit
            </button>
            <button onClick={() => handleDelete(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
