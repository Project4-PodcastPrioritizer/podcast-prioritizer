import { useState, useEffect } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import PodcastSearch from "./components/PodcastSearch";
import DistanceCalculator from "./components/DistanceCalculator";
import Header from "./components/Header";
=======
import Prioritizer from "./components/Prioritizer";

>>>>>>> 4cd8f0a59767c03e511943d60979f2bbf0913460
=======
import Prioritizer from "./components/Prioritizer";

>>>>>>> 8546596c44b4ad61c7e3c5e12a7812bef8b20af1
import "./App.css";

function App() {
  const [selectedPodcast, setSelectedPodcast] = useState([]);
  const [podcastLength, setPodcastLength] = useState("");
  const [distance, setDistance] = useState(null);

  return (
    <>
<<<<<<< HEAD
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
=======
>>>>>>> 8546596c44b4ad61c7e3c5e12a7812bef8b20af1
      <Prioritizer
        distance={distance}
        setPodcast={setSelectedPodcast}
        currentPodcast={selectedPodcast}
        setLength={setPodcastLength}
        setDistance={setDistance}
        podcastLength={podcastLength}
      />

      {/* {selectedPodcast.length===0 ?
<<<<<<< HEAD
>>>>>>> 4cd8f0a59767c03e511943d60979f2bbf0913460
=======
>>>>>>> 8546596c44b4ad61c7e3c5e12a7812bef8b20af1
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
