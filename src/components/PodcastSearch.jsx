//axios -> api calling import
import axios from "axios";
// react imports
import { useEffect, useState } from "react";
//styling imports
import "./PodcastSearch.css";
import "./SetUp.css";
// animations from react-spring
import { useTransition, animated } from "react-spring";
// font awesome icon imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// font awesome declarations
const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} size="xs" />;

const PodcastSearch = ({ setPodcast, setLength }) => {
  //INPUT STATE
  const [searchTerm, setSearchTerm] = useState("");

  //API STATES
  const [podcastResults, setPodcastResults] = useState([]); // results found from call
  const [dataFound, setDataFound] = useState(null); // if user query yields results or not
  const [loading, setLoading] = useState(null); // displays loading animation while api call being made

  // PASS TO PARENT  STATES
  const [selectedPodcast, setSelectedPodcast] = useState([]); // selected podcasts object from podcastResults

  // MOUNTING STATES
  const [isVisible, setIsVisible] = useState(false);
  const mountedTransition = useTransition(isVisible, {
    config: { duration: 200 }, // .2s animation time.
    from: { x: 0, y: -50, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 0, y: 50, opacity: 0 },
  });
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePodcastGet = (event) => {
    // prevent default page refresh
    event.preventDefault();

    // TODO: prevent user from inputing empty query

    // function variables.
    const apiKey = import.meta.env.VITE_LISTEN_API_KEY;
    const query = searchTerm;
    //show spinner
    setLoading(true);
    setDataFound(null);

    if (apiKey) {
      axios({
        url:
          "https://proxy.junocollege.com/https://listen-api.listennotes.com/api/v2/search/",
        method: "GET",
        dataResponse: "JSON",
        headers: {
          "X-ListenAPI-Key": apiKey,
        },
        params: {
          q: query,
          language: "English",
        },
      })
        .then((res) => {
          if (res.data.results.length > 0) {
            setPodcastResults(res.data.results);
            setIsVisible(true);
          } else {
            setDataFound(false);
            setLoading(null);
            setPodcastResults([]);
          }
        })
        .catch((error) => {
          console.error(
            "Error occurred when fetching podcast results: ",
            error
          );
        });
    }
  };
  const podcastSelection = (event) => {
    const indexValue = event.target.parentNode.getAttribute("data-index");
    setSelectedPodcast(podcastResults[indexValue]);
    setPodcast(podcastResults[indexValue]); // pass selected podcast back up to parent (app.jsx)

    //reset isVisible to empty to unRender the results ul
    setIsVisible(false);
  };

  useEffect(() => {
    setLength(selectedPodcast.audio_length_sec); // pass selected podcast length up to parent (app.jsx)
  }, [selectedPodcast]);

  useEffect(() => {
    // if not empty reset loading state back to null.
    if (podcastResults.length > 0) {
      setLoading(null);
    }
  }, [podcastResults]);

  return (
    <div className="podcastSearch">
      <form action="submit">
        <label htmlFor="search" className="sr-only">
          Podcast Search
        </label>
        <input
          type="text"
          id="search"
          onChange={handleInputChange}
          placeholder="Search Some Podcasts"
        />
        <button onClick={handlePodcastGet}>{searchIcon}</button>
      </form>
      {dataFound === false && podcastResults.length === 0 ? (
        <h3>No Podcasts Found</h3>
      ) : loading === true ? (
        <div className="loader"></div>
      ) : loading === null && podcastResults.length > 0 ? (
        <div className="resultsContainer">
          {mountedTransition((style, item) =>
            item ? (
              <animated.ul style={style} className="results">
                {podcastResults.map((result, index) => (
                  <li key={result.id} data-index={index}>
                    <h3>{result.podcast_title_original}</h3>
                    <p>{result.title_original}</p>
                    <button onClick={podcastSelection}>Select</button>
                  </li>
                ))}
              </animated.ul>
            ) : null
          )}
        </div>
      ) : null}
    </div>
  );
};
export default PodcastSearch;
