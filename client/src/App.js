import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import Hero from "./components/Hero";
import Section from "./components/Section";
import RightPanel from "./components/RightPanel";
import AnimeDetail from "./pages/AnimeDetail";
import "./App.css";

export default function App() {
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <TopNav setSearchResult={setSearchResult} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Section
                  title={
                    searchResult.length > 0
                      ? "Search Results"
                      : "Top Rated Anime"
                  }
                  data={searchResult}
                />
              </>
            }
          />
          <Route path="/anime/:id" element={<AnimeDetail />} />
        </Routes>
      </main>

      <RightPanel />
    </div>
  );
}
