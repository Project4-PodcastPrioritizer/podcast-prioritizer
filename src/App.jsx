import { useState, useEffect } from 'react'
import PodcastSearch from './components/PodcastSearch';
import DistanceCalculator from './components/MapQuest';

import './App.css'


import Geolocation from './components/Geolocation.jsx'

function App() {
  const [selectedPodcast,setSelectedPodcast] = useState([]);
  const [podcastLength, setPodcaastLength] = useState("")

  useEffect(()=>{
    console.log("from app file " + selectedPodcast.podcast_title_original);
    console.log("from app file " + podcastLength);
  },[podcastLength,selectedPodcast])

  return (
    <>
      <Geolocation />
      <PodcastSearch setPodcast={setSelectedPodcast} setLength={setPodcaastLength} />

      <div className='card'>
        {/* Distance calculator component */}
        <DistanceCalculator />
      </div>
    </>
  )
}

export default App;
