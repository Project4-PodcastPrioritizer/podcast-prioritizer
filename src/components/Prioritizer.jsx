import { useEffect, useState } from "react";
import DistanceCalculator from "./DistanceCalculator";
import PodcastSearch from "./PodcastSearch";
import "./Prioritizer.css";

const Prioritizer = ({
  distance,
  currentPodcast,
  setPodcast,
  podcastLength,
  setLength,
  setDistance,
}) => {
  const modeOfTravelSuggestion =
    distance > 2
      ? "bike, please be alert at all times and remember to not have your volume too loud"
      : podcastLength > 1000
      ? "walk"
      : "bike, please be alert at all times and remember to not have your volume too loud";
  return (
    <div className="app">
      <PodcastSearch
        setPodcast={setPodcast}
        setLength={setLength}
        currentPodcast={currentPodcast}
      />
      {currentPodcast.length !== 0 ? (
        <>
        <button
        onClick={
            ()=>{
                setPodcast([]);
                setLength("");
                setDistance("");
            }
        }
        >
            Change selection
        </button>
          <h2>Chosen Podcast</h2>
          <div className="selected">
            <li key={currentPodcast.id}>
              <img src={currentPodcast.image} className="thumbnail" />
              <p>{currentPodcast.podcast_title_original}</p>
              <p>{currentPodcast.title_original}</p>
            </li>
          </div>
        </>
      ) : null}
      <DistanceCalculator
        distance={distance}
        setDistance={setDistance}
        podcastLength={podcastLength}
      />
      {distance !== null && distance > 0 ? (
        <>
          <div className="suggestion">
            <p>
              If you're going to listen to{" "}
              {currentPodcast.podcast_title_original} then you should{" "}
              {modeOfTravelSuggestion}!{" "}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
};
export default Prioritizer;
