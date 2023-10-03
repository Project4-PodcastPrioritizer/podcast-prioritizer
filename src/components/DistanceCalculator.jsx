/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// css
import "./DistanceCalculator.css";

const DistanceCalculator = ({
  distance,
  setDistance,
  podcastLength,
  currentPodcast,
  start,
  setStart,
  end,
  setEnd,
}) => {
  const [startSuggestionClicked, setStartSuggestionClicked] = useState(false);
  const [endSuggestionClicked, setEndSuggestionClicked] = useState(false);
  // State variables to store auto suggestions for start and end locations
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);
  // State variable to store error messages
  const [errorMessage, setErrorMessage] = useState(null);

  //mode of travel state
  const [modeOfTravel, setModeOfTravel] = useState("");

  //Refs to manipulate the dom after rendering.
  const startLocationSuggestionsRef = useRef(null);
  const endLocationSuggestionsRef = useRef(null);
  const formRef = useRef(null);
  const inputRef = useRef(null);

  const handleStartSuggestionClick = (suggestion) => {
    let suggestionString = `${suggestion.street} ${suggestion.city} ${suggestion.state} ${suggestion.countryCode}`;
    setStart(suggestionString);
    setStartSuggestions([]);
    setStartSuggestionClicked(true);
  };
  const handleEndSuggestionClick = (suggestion) => {
    let suggestionString = `${suggestion.street} ${suggestion.city} ${suggestion.state} ${suggestion.countryCode}`;
    setEnd(suggestionString);
    setEndSuggestionClicked(true);
    setEndSuggestions([]);
  };
  // Calculates the distance using the MapQuest API
  const calculateDistance = async () => {
    // Clear previous Error if any
    setErrorMessage(null);
    try {
      if (!start && !end) {
        setErrorMessage("Please enter in a starting point and destination");
      } else if (!start) {
        setErrorMessage("Please enter a starting location.");
      } else if (!end) {
        setErrorMessage("Please enter a destination.");
      } else if (start === end) {
        setErrorMessage(
          "Starting location and destination can not be the same. "
        );
      } else {
        const response = await axios.get(
          "https://www.mapquestapi.com/directions/v2/route",
          {
            params: {
              key: "Ua9N73Lhw2Tg18LuWk3hcW9q4Pp09UKM",
              from: start,
              to: end,
              unit: "k",
            },
          }
        );
        // console.log(response.data.route);
        // check if inputed locations return route error.
        if (response.data.route.routeError) {
          // Invalid address, set an error message
          setErrorMessage("Entered addresses are invalid, please try again");
        } else {
          const calculatedDistanceInMiles = response.data.route.distance;
          // Converts miles to kilometers
          const calculatedDistanceInKm = calculatedDistanceInMiles * 1.60934;

          setDistance(calculatedDistanceInKm);
        }
      }
    } catch (error) {
      console.error("Error calculating distance:", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behaviour
    calculateDistance(); // Calls the calculateDistance function
  };
  const handleStartLocationOutsideClick = (e) => {
    if (
      startLocationSuggestionsRef.current &&
      !startLocationSuggestionsRef.current.contains(e.target)
    ) {
      setStartSuggestions([]);
    }
  };
  const handleEndLocationOutsideClick = (e) => {
    if (
      endLocationSuggestionsRef.current &&
      !endLocationSuggestionsRef.current.contains(e.target)
    ) {
      setEndSuggestions([]);
    }
  };
  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      // Enter key was pressed, hide suggestions
      setStartSuggestions([]);
      setEndSuggestions([]);
    }
  };

  useEffect(() => {
    if (start && end && distance >= 0)  {
      if (currentPodcast.length !== undefined) {
        setModeOfTravel(""); // Clear modeOfTravel if any
        setErrorMessage("Please search for a podcast to listen to!");

      } else if (distance > 2) {
        setErrorMessage(""); // Clear error message if any
        setModeOfTravel(
          <p>
             Enjoy a ride on a bike 🚴‍♂️!{" "}
            <br></br>
            <span className="safety">
              **Safety Reminder: When biking, please ensure your headphones are
              at a safe volume to stay aware of your surroundings. Your safety
              is important!**
            </span>
          </p>
        );
      } else if (distance < 2) {
        setErrorMessage(""); // Clear error message if any
        setModeOfTravel("Enjoy listening on your walk 🚶‍♂️!");
      }
    } else {
      // clear all states related.
      setModeOfTravel("");
      setErrorMessage("");
    }
  }, [start, end, distance, currentPodcast]);

  // TODO FIX THIS!!!! NEEDS TO RENDER
  // SELECT PODCAST => WHEN NO PODCAST LENGTH OR CURRENT PODCAST.
  // NULL => WHEN NO PODCAST AND STATES ARE EMPTY.

  useEffect(() => {
    // Function to fetch auto suggestions for start location
    const fetchStartSuggestions = async () => {
      try {
        if (start === "") {
          setStartSuggestions([]); // Clears suggestions when input is empty
          return;
        }

        // Check if a suggestion was clicked, and if so, do not fetch suggestions
        if (!startSuggestionClicked) {
          const response = await axios.get(
            "https://www.mapquestapi.com/geocoding/v1/batch",
            {
              params: {
                key: "Ua9N73Lhw2Tg18LuWk3hcW9q4Pp09UKM",
                location: start,
                maxResults: 5,
              },
            }
          );

          const MapQuestSuggestions = response.data.results[0].locations;
          const suggestions = [];
          MapQuestSuggestions.forEach((suggestion) => {
            suggestions.push({
              street: suggestion.street,
              city: suggestion.adminArea5,
              state: suggestion.adminArea3,
              countryCode: suggestion.adminArea1,
            });
          });
          setStartSuggestions(suggestions);
        }
      } catch (error) {
        console.error("Error fetching start suggestions", error);
      }
    };
    // Call the fetchStartSuggestions function when startLocation or suggestionClicked changes
    fetchStartSuggestions();
  }, [start, startSuggestionClicked]);

  useEffect(() => {
    // Function to fetch auto suggestions for end location
    const fetchEndSuggestions = async () => {
      try {
        if (end === "") {
          setEndSuggestions([]); // Clear suggestions when input is empty
          return;
        }
        if (!endSuggestionClicked) {
          const response = await axios.get(
            "https://www.mapquestapi.com/geocoding/v1/batch",
            {
              params: {
                key: "Ua9N73Lhw2Tg18LuWk3hcW9q4Pp09UKM",
                location: end,
                maxResults: 5,
              },
            }
          );
          // Extracts suggestions from the response data and set them
          const MapQuestSuggestions = response.data.results[0].locations;
          const suggestions = [];
          MapQuestSuggestions.forEach((suggestion) => {
            suggestions.push({
              street: suggestion.street,
              city: suggestion.adminArea5,
              state: suggestion.adminArea3,
              countryCode: suggestion.adminArea1,
            });
          });
          setEndSuggestions(suggestions);
        }
      } catch (error) {
        console.error("Error fetching suggestions", error);
      }
    };

    // Calls the fetchEndSuggestions function when endLoation changes
    fetchEndSuggestions();
  }, [end, endSuggestionClicked]);

  useEffect(() => {
    document.addEventListener("mousedown", handleStartLocationOutsideClick);
    document.addEventListener("mousedown", handleEndLocationOutsideClick);
    document.addEventListener("keydown", handleEnterKeyPress);

    if (formRef.current) {
      const formWidth = formRef.current.offsetWidth;
      document.documentElement.style.setProperty(
        "--form-width",
        `${formWidth}px`
      );
    }

    if (inputRef.current) {
      const inputHeight = inputRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        "--input-height",
        `${inputHeight}px`
      );
    }
    //remove the event listeners on unMount
    return () => {
      document.removeEventListener(
        "mousedown",
        handleStartLocationOutsideClick
      );
      document.removeEventListener("mousedown", handleEndLocationOutsideClick);
      document.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [startLocationSuggestionsRef, endLocationSuggestionsRef]);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="DistanceCalculator"
        ref={formRef}
      >
        {/* Start Location Input */}
        <div className="Start">
          <label htmlFor="startLocation" className="sr-only">
            Location
          </label>
          <input
            type="text"
            value={start}
            onClick={() => {
              setEndSuggestions([]);
            }}
            onChange={(e) => {
              setStartSuggestionClicked(false);
              setStart(e.target.value);
              setErrorMessage(null); // Clears error message
            }}
            required
            placeholder=" Location"
            ref={inputRef}
          />
          {/* Displays Start Location Suggestions */}
          <ul ref={startLocationSuggestionsRef}>
            {startSuggestions
              .filter(
                (suggestion) =>
                  suggestion.street !== "" &&
                  suggestion.city !== "" &&
                  suggestion.state !== "" &&
                  suggestion.countryCode !== ""
              )
              .map((suggestion, index) => {
                return (
                  <li
                    key={index}
                    tabIndex={index + 1}
                    onClick={() => handleStartSuggestionClick(suggestion)}
                    onKeyDown={(e) =>
                      e.key === `Enter`
                        ? handleStartSuggestionClick(suggestion)
                        : null
                    }
                  >
                    <p>{`${suggestion.street} ${suggestion.city} ${suggestion.state} ${suggestion.countryCode}`}</p>
                  </li>
                );
              })}
          </ul>
        </div>
        {/* End Location Input */}
        <div className="End">
          <label htmlFor="endLocation" className="sr-only">
            Destination
          </label>
          <input
            type="text"
            value={end}
            onClick={() => {
              setStartSuggestions([]);
            }}
            onChange={(e) => {
              setEnd(e.target.value);
              setEndSuggestionClicked(false);
            }}
            required
            placeholder=" Destination"
          />
          {/* Displays End Location Suggestions */}
          <ul ref={endLocationSuggestionsRef}>
            {endSuggestions
              .filter(
                (suggestion) =>
                  suggestion.street !== "" &&
                  suggestion.city !== "" &&
                  suggestion.state !== "" &&
                  suggestion.countryCode !== ""
              )
              .map((suggestion, index) => {
                return (
                  <li
                    key={index}
                    tabIndex={index}
                    onClick={() => handleEndSuggestionClick(suggestion)}
                    onKeyDown={(e) =>
                      e.key === `Enter`
                        ? handleStartSuggestionClick(suggestion)
                        : null
                    }
                  >
                    <p>{`${suggestion.street} ${suggestion.city} ${suggestion.state} ${suggestion.countryCode}`}</p>
                  </li>
                );
              })}
          </ul>
        </div>

        {/* Calculate Distance Button */}
        <div className="Submit">
          <button type="submit" className="distanceSubmit">
            Calculate
          </button>
        </div>
      </form>
      {/* Displays error message if any */}
      {errorMessage && <p className="error">{errorMessage}</p>}
      {/* Display suggestion of travel. */}

      {modeOfTravel === "" ? null : (
        <p className="travelSuggestion">
          if you want to listen to{" "}
          <span className="chosen">{currentPodcast.title_original}</span>{" "}we suggest that you: {modeOfTravel}{" "}
        </p>
      )}
    </>
  );
};

export default DistanceCalculator;
