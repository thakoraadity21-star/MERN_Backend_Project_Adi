import "./Card.css";

export default function Card({ title }) {
  return (
    <div className="card">
      <img src="/poster.jpg" alt={title} />
      <p>{title}</p>
    </div>
  );
}
