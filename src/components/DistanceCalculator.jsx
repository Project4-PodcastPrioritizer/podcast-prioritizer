import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// css
import "./DistanceCalculator.css";

const DistanceCalculator = ({ distance, setDistance }) => {
  // State variables to store user's chosen start and end locations
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  const [startSuggestionClicked, setStartSuggestionClicked] = useState(false);
  const [endSuggestionClicked, setEndSuggestionClicked] = useState(false);
  // State variables to store auto suggestions for start and end locations
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);
  // State variable to store error messages
  const [errorMessage, setErrorMessage] = useState(null);

  //Refs to manipulate the dom after rendering.
  const startLocationSuggestionsRef = useRef(null);
  const endLocationSuggestionsRef = useRef(null);
  const formRef = useRef(null);
  const inputRef = useRef(null);

  const handleStartSuggestionClick = (suggestion) => {
    let suggestionString = `${suggestion.street} ${suggestion.city} ${suggestion.state} ${suggestion.countryCode}`;
    setStartLocation(suggestionString);
    setStartSuggestions([]);
    setStartSuggestionClicked(true);
  };
  const handleEndSuggestionClick = (suggestion) => {
    let suggestionString = `${suggestion.street} ${suggestion.city} ${suggestion.state} ${suggestion.countryCode}`;
    setEndLocation(suggestionString);
    setEndSuggestionClicked(true);
    setEndSuggestions([]);
  };
  // Calculates the distance using the MapQuest API
  const calculateDistance = async () => {
    try {
      if (!startLocation && !endLocation) {
        setErrorMessage("Please enter in a starting point and destination");
      } else if (!startLocation) {
        setErrorMessage("Please enter a starting location.");
      } else if (!endLocation) {
        setErrorMessage("Please enter a destination.");
      } else if (startLocation === endLocation) {
        setErrorMessage(
          "Starting location and destination can not be the same. "
        );
      }
      // Clear any previous error messages
      setErrorMessage(null);

      const response = await axios.get(
        "https://www.mapquestapi.com/directions/v2/route",
        {
          params: {
            key: "Ua9N73Lhw2Tg18LuWk3hcW9q4Pp09UKM",
            from: startLocation,
            to: endLocation,
            unit: "k",
          },
        }
      );

      const calculatedDistanceInMiles = response.data.route.distance;
      // Converts miles to kilometers
      const calculatedDistanceInKm = calculatedDistanceInMiles * 1.60934;

      setDistance(calculatedDistanceInKm);
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
    // Function to fetch auto suggestions for start location
    const fetchStartSuggestions = async () => {
      try {
        if (startLocation === "") {
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
                location: startLocation,
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
  }, [startLocation, startSuggestionClicked]);

  useEffect(() => {
    // Function to fetch auto suggestions for end location
    const fetchEndSuggestions = async () => {
      try {
        if (endLocation === "") {
          setEndSuggestions([]); // Clear suggestions when input is empty
          return;
        }
        if (!endSuggestionClicked) {
          const response = await axios.get(
            "https://www.mapquestapi.com/geocoding/v1/batch",
            {
              params: {
                key: "Ua9N73Lhw2Tg18LuWk3hcW9q4Pp09UKM",
                location: endLocation,
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
  }, [endLocation, endSuggestionClicked]);

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
            value={startLocation}
            onClick={() => {
              setEndSuggestions([]);
            }}
            onChange={(e) => {
              setStartSuggestionClicked(false);
              setStartLocation(e.target.value);
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
            value={endLocation}
            onClick={() => {
              setStartSuggestions([]);
            }}
            onChange={(e) => {
              setEndLocation(e.target.value);
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
          <button type="submit" className="distanceSubmit">Calculate</button>
        </div>
      </form>
      {/* Displays error message */}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </>
  );
};

export default DistanceCalculator;
