import { useState } from "react";
import Prioritizer from "./components/Prioritizer";
import Header from "./components/Header";
import AppBrief from "./components/AppBrief";

function App() {
  const [podcastSearchTerm, setPodcastSearchTerm] = useState("");
  const [selectedPodcast, setSelectedPodcast] = useState([]);
  const [podcastLength, setPodcastLength] = useState("");
  const [distance, setDistance] = useState(null);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  return (
    <>
      <Header />
      <Prioritizer
        searchTerm ={podcastSearchTerm}
        setSearchTerm={setPodcastSearchTerm}
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
      <AppBrief />
    </>
  );
}

export default App;

