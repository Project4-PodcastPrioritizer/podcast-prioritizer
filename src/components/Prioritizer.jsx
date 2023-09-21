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
    distance > 2 && currentPodcast.length !== 0
      ? podcastLength > 1000
        ? "Walk!"
        : "Bike!, please be safe and remember to be vigilant on your travels."
      : null;

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
            onClick={() => {
              setPodcast([]);
              setLength("");
              setDistance("");
            }}
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
      {distance !== null && distance > 0 && currentPodcast.length !== 0 && (
        <div className="suggestion">
          <p>
            If you're going to listen to {currentPodcast.podcast_title_original}{" "}
            then you should {modeOfTravelSuggestion}!
          </p>
        </div>
      )}
    </div>
  );
};
export default Prioritizer;
