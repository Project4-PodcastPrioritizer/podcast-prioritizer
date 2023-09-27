import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useTransition, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./PodcastSearch.css";
import "./SetUp.css";

const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} size="s" style={{color:"#ffffff",}}/>;

const PodcastSearch = ({ setPodcast, setLength, currentPodcast,searchTerm, setSearchTerm }) => {
  //INPUT STATE
  const [podcastResults, setPodcastResults] = useState([]); // results found from call
  const [dataFound, setDataFound] = useState(null); // if user query yields results or not
  const [loading, setLoading] = useState(null); // animation while api loading
  const [showDialog, setShowDialog] = useState(false); // used for notifying users that search cant be empty.

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
  
  // Refs
  const dialogRef =  useRef(null);

  // Functions

  const focusTrap = () => {
    const dialog = dialogRef.current;
    if(!dialog) return;

    dialog.addEventListener("keydown",handleFocusBehaviour);
  };

  const releaseFocusTrap = () =>{
    const dialog = dialogRef.current;
    if(!dialog) return;

    dialog.removeEventListener("keydown",handleFocusBehaviour);
  }

  const handleFocusBehaviour = (e) =>{
    const dialog = dialogRef.current;
    if(!dialog) return;

    const focusableElements = dialog.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if(e.key === "Tab"){
      if(e.shiftKey){
        if(document.activeElement === firstElement){
          lastElement.focus();
          e.preventDefault();
        }
      } else{
        if(document.activeElement === lastElement){
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };











  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePodcastGet = (event) => {
    // prevent default page refresh
    event.preventDefault();

    // TODO: prevent user from inputing empty query
    if (searchTerm === "") {
      setShowDialog(true);
    } else {
      setShowDialog(false);
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
    }
  };
  const podcastSelection = (event) => {
    const indexValue = event.target.parentNode.getAttribute("data-index");
    setSelectedPodcast(podcastResults[indexValue]);
    setPodcast(podcastResults[indexValue]); // pass selected podcast back up to parent (app.jsx)

    //reset isVisible to empty to unRender the results ul
    setIsVisible(false);
  };
  useEffect(()=>{
    if(showDialog){
      focusTrap();
    }else{
      releaseFocusTrap();
    }
  },[showDialog])
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
    <div className={`podcastSearch ${currentPodcast.length !== 0 ? "noBorder" : ""}`}>
      
      {currentPodcast.length === 0 ? (
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
          <button onClick={handlePodcastGet} className="podcastSearchSubmit">{searchIcon}</button>
        </form>
      ) : null}

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
                    <img src={result.image} className="thumbnail" />
                    <p>{result.podcast_title_original}</p>
                    <p>{result.title_original}</p>
                    <button onClick={podcastSelection}>Select</button>
                  </li>
                ))}
              </animated.ul>
            ) : null
          )}
        </div>
      ) : null}

      {!showDialog ? null : 
      <dialog style={{ zIndex: 2 }} open ref={dialogRef}>
        <p>Please enter a search term before searching! 🔍</p>
        <button onClick={()=>{setShowDialog(false)}}>Got it!</button>
      </dialog>
      }
    </div>
  );
};
export default PodcastSearch;
