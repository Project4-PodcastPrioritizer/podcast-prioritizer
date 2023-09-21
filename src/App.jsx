import { useState, useEffect } from "react";
import PodcastSearch from "./components/PodcastSearch";
import DistanceCalculator from "./components/DistanceCalculator";
import Header from "./components/Header";
import "./App.css";

import Geolocation from "./components/Geolocation.jsx";

function App() {
  const [selectedPodcast, setSelectedPodcast] = useState([]);
  const [podcastLength, setPodcastLength] = useState("");
  const [distance, setDistance] = useState(null);

  return (

    // Create a "Go back" Component, Clears seled
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
     {selectedPodcast.length===0 ?
      <PodcastSearch
        setPodcast={setSelectedPodcast}
        setLength={setPodcastLength}
      />
     : null}
      {/*  render second distance calc. */}
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
