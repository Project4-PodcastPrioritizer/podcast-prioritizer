import { useState } from "react";
import Prioritizer from "./components/Prioritizer";
import Header from "./components/Header";
import AppBriefDescription from "./components/AppBriefDescription";

import "./App.css";

function App() {
  const [selectedPodcast, setSelectedPodcast] = useState([]);
  const [podcastLength, setPodcastLength] = useState("");
  const [distance, setDistance] = useState(null);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  return (
    <>
      <Prioritizer
        distance={distance}
        setPodcast={setSelectedPodcast}
        currentPodcast={selectedPodcast}
        setLength={setPodcastLength}
        setDistance={setDistance}
        podcastLength={podcastLength}
        setStart={setStartLocation}
        setEnd={setEndLocation}
        start={startLocation}
        end={endLocation}
      />
    </>
  );
}

export default App;
