/* eslint-disable react/prop-types */
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
  start,
  end,
  setStart,
  setEnd
}) => {
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
              setEnd("");
              setStart("");
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
        start={start}
        end={end}
        setStart={setStart}
        setEnd={setEnd}
        distance={distance}
        setDistance={setDistance}
        podcastLength={podcastLength}
        currentPodcast={currentPodcast}
      />
    </div>
  );
};
export default Prioritizer;
