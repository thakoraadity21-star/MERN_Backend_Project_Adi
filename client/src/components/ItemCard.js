import { useState } from "react";

export default function ItemCard({ item, deleteItem }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="col-12 col-md-4 col-lg-3 mb-4">
      <div className="card bg-dark text-light p-2 shadow">

        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
          <span className="badge bg-info">{item.category}</span>

          <p className="mt-2">{item.description}</p>

          <button
            className="btn btn-sm btn-outline-warning mt-2"
            onClick={() => setLiked(!liked)}
          >
            {liked ? "❤️ Liked" : "🤍 Like"}
          </button>

          <button
            className="btn btn-sm btn-danger mt-2 mx-2"
            onClick={() => deleteItem(item.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
