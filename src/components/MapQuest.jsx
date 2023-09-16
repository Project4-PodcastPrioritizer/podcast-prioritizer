import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const DistanceCalculator = ({ distance, setDistance, podcastLength }) => {
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

  const startLocationSuggestionsRef = useRef(null);
  const endLocationSuggestionsRef = useRef(null);

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
      if (!startLocation || !endLocation || startLocation === endLocation) {
        // Handles invalid input
        setErrorMessage("Please enter valid start and end locations.");
        return;
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
  // Determine a suggestion (bike or walk) based on the calculated distance
  const modeOfTravelSuggestion = distance > 2 ? (podcastLength > 1000 ? "bike" : "walk") : "walk";
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behaviour
    calculateDistance(); // Calls the calculateDistance function
  };
  const handleStartLocationOutsideClick = (e) =>{
    if(
      startLocationSuggestionsRef.current && 
      !startLocationSuggestionsRef.current.contains(e.target)
      )
      {
        setStartSuggestions([]);
      }
  };
  const handleEndLocationOutsideClick = (e) =>{
    if(
      endLocationSuggestionsRef.current && 
      !endLocationSuggestionsRef.current.contains(e.target)
      )
      {
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
    //remove the event listeners on unMount

    return () => {
      document.removeEventListener("mousedown", handleStartLocationOutsideClick);
      document.removeEventListener("mousedown", handleEndLocationOutsideClick);
      document.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [startLocationSuggestionsRef,endLocationSuggestionsRef]);

  return (
    <form onSubmit={handleSubmit}>
      {/* Start Location Input */}
      <div>
        <label htmlFor="startLocation">From</label>
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
                  tabIndex={index+1}
                  onClick={() => handleStartSuggestionClick(suggestion)}
                  onKeyDown={(e)=>e.key===`Enter`? handleStartSuggestionClick(suggestion) : null}
                >
                  <p>{`${suggestion.street} ${suggestion.city} ${suggestion.state} ${suggestion.countryCode}`}</p>
                </li>
              );
            })}
        </ul>
      </div>
      {/* End Location Input */}
      <div>
        <label htmlFor="endLocation">To</label>
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
                  onKeyDown={(e)=>e.key===`Enter`? handleStartSuggestionClick(suggestion) : null}
                >
                  <p>{`${suggestion.street} ${suggestion.city} ${suggestion.state} ${suggestion.countryCode}`}</p>
                </li>
              );
            })}
        </ul>
      </div>
      {/* Calculate Distance Button */}
      <div>
        <button type="submit">Calculate Distance</button>
      </div>

      {/* Displays the calculated distance and suggestion */}
      {!isNaN(distance) && distance !== null ? (
        startLocation !== "" && endLocation !== "" ? (
          <p>
            It would be best to {modeOfTravelSuggestion} for this trip!
            (Distance: {distance.toFixed(2)}km)
          </p>
        ) : (
          <p>
            something went wrong, please double check your destination and start
            location inputs.
          </p>
        )
      ) : null}

      {/* Displays error message */}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
};

export default DistanceCalculator;
