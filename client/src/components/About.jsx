import React from "react";

export default function About() {
  return (
    <section className="neo-section">
      <div className="about-box">
        <h2 className="holo-sub">About this Prototype</h2>
        <p>This demo merges neon aesthetics with functional UI components — forms, lists, and interactive ItemCards. It's ready to be connected to a backend.</p>
        <ul>
          <li>State-based navigation (no router)</li>
          <li>ItemCard component with props</li>
          <li>Form validation and success messages</li>
          <li>Like / Done toggles & delete/clear actions</li>
        </ul>
      </div>
    </section>
  );
}
