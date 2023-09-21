import { useState, useEffect } from "react";
import Prioritizer from "./components/Prioritizer";

import "./App.css";

function App() {
  const [selectedPodcast, setSelectedPodcast] = useState([]);
  const [podcastLength, setPodcastLength] = useState("");
  const [distance, setDistance] = useState(null);

  return (
    <>
      <Prioritizer
        distance={distance}
        setPodcast={setSelectedPodcast}
        currentPodcast={selectedPodcast}
        setLength={setPodcastLength}
        setDistance={setDistance}
        podcastLength={podcastLength}
      />

      {/* {selectedPodcast.length===0 ?
      <PodcastSearch
        setPodcast={setSelectedPodcast}
        setLength={setPodcastLength}
      />
     : null}
    
      {selectedPodcast.length === 0 ? null : (
        <DistanceCalculator
          distance={distance}
          setDistance={setDistance}
          podcastLength={podcastLength}
        />
      )} */}
    </>
  );
}

export default App;
