/* eslint-disable react/prop-types */
import DistanceCalculator from "./DistanceCalculator";
import PodcastSearch from "./PodcastSearch";
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
  setEnd
}) => {
  return (
    <div className="app">
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
          <div className="selected">
            <div key={currentPodcast.id}>
              <img src={currentPodcast.image} className="thumbnail" />
              <p>{currentPodcast.podcast_title_original} by {currentPodcast.publisher_original}</p>
              <p>{currentPodcast.title_original}</p>
              <ul className="links">
                <li title="Listen to this podcast">
                  <a href={currentPodcast.link}><img src="/src/assets/listen-to.svg" alt="Listen To this podcast!" /></a>
                </li>
                <li title="Learn more about this podcast"><a href={currentPodcast.listennotes_url}><img src="/src/assets/about.svg" alt="Learn more about this podcast over at ListenNotes" /></a></li>
              </ul>
            </div>
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
