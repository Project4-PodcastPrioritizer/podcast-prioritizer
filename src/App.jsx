import { useState, useEffect } from "react";
<<<<<<< HEAD
import PodcastSearch from "./components/PodcastSearch";
import DistanceCalculator from "./components/DistanceCalculator";
import Header from "./components/Header";
=======
import Prioritizer from "./components/Prioritizer";

>>>>>>> 4cd8f0a59767c03e511943d60979f2bbf0913460
import "./App.css";

function App() {
  const [selectedPodcast, setSelectedPodcast] = useState([]);
  const [podcastLength, setPodcastLength] = useState("");
  const [distance, setDistance] = useState(null);

  return (
    <>
<<<<<<< HEAD
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
=======
      <Prioritizer
        distance={distance}
        setPodcast={setSelectedPodcast}
        currentPodcast={selectedPodcast}
        setLength={setPodcastLength}
        setDistance={setDistance}
        podcastLength={podcastLength}
      />

      {/* {selectedPodcast.length===0 ?
>>>>>>> 4cd8f0a59767c03e511943d60979f2bbf0913460
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
