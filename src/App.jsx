import { useState, useEffect } from "react";
import PodcastSearch from "./components/PodcastSearch";
import DistanceCalculator from "./components/MapQuest";

import "./App.css";

import Geolocation from "./components/Geolocation.jsx";

function App() {
  const [selectedPodcast, setSelectedPodcast] = useState([]);
  const [podcastLength, setPodcaastLength] = useState("");
  const [distance, setDistance] = useState(null);

  return (
    <>
      {/* <Geolocation /> */}
      <PodcastSearch
        setPodcast={setSelectedPodcast}
        setLength={setPodcaastLength}
      />
      {selectedPodcast.length === 0 ? null : (
        <DistanceCalculator
          distance={distance}
          setDistance={setDistance}
          podcastLength={podcastLength}
        />
      )}
    </>
  );
}

export default App;
