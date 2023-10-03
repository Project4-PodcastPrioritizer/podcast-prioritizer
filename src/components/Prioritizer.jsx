/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import DistanceCalculator from "./DistanceCalculator";
import PodcastSearch from "./PodcastSearch";
import { useTransition, animated } from "react-spring";
import "./Prioritizer.css";

const Prioritizer = ({
  searchTerm,
  setSearchTerm,
  distance,
  currentPodcast,
  setPodcast,
  podcastLength,
  setLength,
  setDistance,
  start,
  end,
  setStart,
  setEnd,
}) => {
  // MOUNTING STATE
  const [isVisible, setIsVisible] = useState(false);
  const mountedTransition = useTransition(isVisible, {
    config: { duration: 500 }, // .5s animation time.
    from: { x: 0, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 0, y: 0, opacity: 0 },
  });

  useEffect(() => {
    if (currentPodcast.length !== 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [currentPodcast]);

  return (
    <div className="app wrapper">
      <PodcastSearch
        setPodcast={setPodcast}
        setLength={setLength}
        currentPodcast={currentPodcast}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {currentPodcast.length !== 0 ? (
        <>
          <button
            className="changeSelectionButton"
            // reset all states.
            onClick={() => {
              setPodcast([]);
              setLength("");
              setDistance("");
              setEnd("");
              setStart("");
              setSearchTerm("");
            }}
          >
            Change Podcast
          </button>
          {mountedTransition((style, item) =>
            item ? (
              <animated.div style={style} className="selected">
                <img src={currentPodcast.image} className="thumbnail" />
                <p className="podcastTitle">
                  {currentPodcast.podcast_title_original}
                </p>
                <p className="episode">{currentPodcast.title_original}</p>
                <p className="publisher">{currentPodcast.publisher_original}</p>
                <ul className="links">
                  <li title="Listen to this podcast">
                    <a href={currentPodcast.link} target="blank">
                      <img
                        src="/assets/listen-to.svg"
                        alt="Listen To this podcast!"
                      />
                    </a>
                  </li>
                  <li title="Learn more about this podcast">
                    <a href={currentPodcast.listennotes_url} target="blank">
                      <img
                        src="/assets/about.svg"
                        alt="Learn more about this podcast over at ListenNotes"
                      />
                    </a>
                  </li>
                </ul>
              </animated.div>
            ) : null
          )}
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
