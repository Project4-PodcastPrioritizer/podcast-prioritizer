import { useState, useEffect } from "react";
import PodcastSearch from "./components/PodcastSearch";
import DistanceCalculator from "./components/DistanceCalculator";
import Header from "./components/Header";
import Prioritizer from "./components/Prioritizer";
import "./App.css";

function App() {
  const [selectedPodcast, setSelectedPodcast] = useState([]);
  const [podcastLength, setPodcastLength] = useState("");
  const [distance, setDistance] = useState(null);

  return (
    <>
    <Header />
    <button 
    onClick={()=>{
      setPodcastLength("");
      setSelectedPodcast([]);
    }}
    disabled={selectedPodcast.length === 0 ? true:false}
    >
      New Trip
    </button>
    {/* render First podcast Choice */}
     {selectedPodcast.length===0 ? (

      <Prioritizer
        distance={distance}
        setPodcast={setSelectedPodcast}
        currentPodcast={selectedPodcast}
        setLength={setPodcastLength}
        setDistance={setDistance}
        podcastLength={podcastLength}
      />
  ) : null}
    </>
  );
}

export default App;
