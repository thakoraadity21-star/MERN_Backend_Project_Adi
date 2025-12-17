import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import About from "./components/About";
import Project from "./components/Project";
import Footer from "./components/Footer";

export default function App() {
  const [section, setSection] = useState("home");
  const [items, setItems] = useState([]);

  // ✅ NEW: backend message state
  const [backendMessage, setBackendMessage] = useState("");

  // ✅ NEW: fetch backend API
  useEffect(() => {
    fetch("https://mern-backend-project-adi.onrender.com/")
      .then((res) => res.text())
      .then((data) => setBackendMessage(data))
      .catch((err) => console.error("Backend error:", err));
  }, []);

  const addItem = (item) => setItems((p) => [item, ...p]);
  const deleteItem = (id) => setItems((p) => p.filter((it) => it.id !== id));
  const clearAll = () => setItems([]);

  return (
    <div className="neo-root">
      <Navbar section={section} setSection={setSection} />
      <div className="neo-layout">
        <Sidebar setSection={setSection} />
        <main className="neo-main">
          {section === "home" && (
            <Home backendMessage={backendMessage} />
          )}
          {section === "about" && <About />}
          {section === "project" && (
            <Project
              items={items}
              addItem={addItem}
              deleteItem={deleteItem}
              clearAll={clearAll}
            />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
