import { useState } from "react";
import "./EpisodeList.css";
import VideoModal from "./VideoModal";

export default function EpisodeList({ episodes = [] }) {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  return (
    <>
      <section className="episode-section">
        <h2 className="episode-title">Episodes</h2>

        <div className="episode-list">
          {episodes.map((ep, index) => (
            <div
              key={index}
              className="episode-card"
              onClick={() => setSelectedEpisode(ep)}
            >
              <div className="ep-left">
                <span className="ep-number">EP {ep.number}</span>

                <div>
                  <h4 className="ep-name">{ep.title}</h4>
                  <p className="ep-duration">{ep.duration}</p>
                </div>
              </div>

              {/* ▶ PLAY BUTTON */}
              <button
                className="ep-play"
                onClick={(e) => {
                  e.stopPropagation(); // 👈 card click double na ho
                  setSelectedEpisode(ep);
                }}
              >
                ▶
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 🎬 VIDEO MODAL */}
      <VideoModal
        open={!!selectedEpisode}
        episode={selectedEpisode}
        onClose={() => setSelectedEpisode(null)}
      />
    </>
  );
}
