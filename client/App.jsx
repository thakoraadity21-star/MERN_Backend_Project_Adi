import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

import SearchPage from "./pages/SearchPage";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import RightPanel from "./components/RightPanel";
import LatestSection from "./components/LatestSection";
import AnimeDetail from "./pages/AnimeDetail";

const Community = () => <h1 style={{ padding: 40 }}>👥 Community</h1>;
const Events = () => <h1 style={{ padding: 40 }}>🎉 Events</h1>;
const Movies = () => <h1 style={{ padding: 40 }}>🎬 Movies</h1>;
const Series = () => <h1 style={{ padding: 40 }}>📺 Series</h1>;
const Recent = () => <h1 style={{ padding: 40 }}>🕒 Recent</h1>;
const Downloads = () => <h1 style={{ padding: 40 }}>⬇ Downloads</h1>;

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-layout">
          <Sidebar />

          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Home />
                    <LatestSection />
                  </>
                }
              />

              <Route path="/anime/:id" element={<AnimeDetail />} />
              <Route path="/search" element={<SearchPage />} />

              <Route path="/community" element={<Community />} />
              <Route path="/events" element={<Events />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/recent" element={<Recent />} />
              <Route path="/downloads" element={<Downloads />} />
            </Routes>
          </main>

          <RightPanel />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
