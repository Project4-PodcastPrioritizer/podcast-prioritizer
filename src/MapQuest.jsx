import React, { useState, useEffect} from 'react';
import axios from 'axios';

const DistanceCalculator = () => {
    // State variables to store user's chosen start and end locations
    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('');

    // State variable to store the calculated distance
    const[distance, setDistance] = useState(null);

    // State varriables to store auto suggestions for start and end locations
    const [startSuggestions, setStartSuggestions] = useState([]);
    const [endSuggestions, setEndSuggestions] = useState([]);

    useEffect(() => {
        // Function to fetch auto suggestions for start location
        const fetchStartSuggestions = async () => {
            try {
                const trimmedStartLocation = startLocation.trim();
    
                if (trimmedStartLocation === ''){
                    setStartSuggestions([]);// Clear suggestions when input is empty
                    return;
                }
    
                const response = await axios.get(
                    'https://www.mapquestapi.com/search/v3/prediction',
                    {
                        params: {
                            key: 'Ua9N73Lhw2Tg18LuWk3hcW9q4Pp09UKM',
                            q: trimmedStartLocation,
                            limit: 5,
                        },
                    }
                );
    
                setStartSuggestions(response.data.results);
            } catch (error) {
                console.error('Error fetching start suggestions', error);
            }
        };
    
        // Call the fetchStartSuggestions function when startLocation changes
        fetchStartSuggestions();
    }, [startLocation]);

    useEffect(() => {
        // Function to fetch auto suggestions for end location
        const fetchEndLocations = async () => {
            try {
                const trimmedEndLocation = endLocation.trim();
    
                if (trimmedEndLocation === '') {
                    setEndSuggestions([]); // Clear suggestions when input is empty
                    return;
                }
    
                const response = await axios.get(
                    'https://www.mapquestapi.com/search/v3/prediction',
                    {
                        params: {
                            key: 'Ua9N73Lhw2Tg18LuWk3hcW9q4Pp09UKM',
                            q: trimmedEndLocation,
                            limit: 5,
                        },
                    }
                );
    
                setEndSuggestions(response.data.results);
            } catch (error) {
                console.error('Error fetching end suggestions', error);
            }
        };
    
        // Call the fetchEndSugestions function when endLocation changes
        fetchEndLocations();
    }, [endLocation]);

    const handleStartSuggestionClick = (suggestion) => {
        // When a start location suggestion is clicked, fill in the input field with the selected suggestion
        setStartLocation(suggestion.displayString);
        // Clear suggestions
        setStartSuggestions([]);
    };

    const handleEndSuggestionClick = (suggestion) => {
        // When a end location suggestion is clicked, fill in the input field with the selected suggestion
        setEndLocation(suggestion.displayString);
        // Clear suggestions
        setEndSuggestions([]);
};
    
    // Calculate the distance using the MapQuest API
    const calculateDistance = async () => {
        try {
          const response = await axios.get(
            'https://www.mapquestapi.com/directions/v2/route',
            {
              params: {
                key: 'Ua9N73Lhw2Tg18LuWk3hcW9q4Pp09UKM',
                from: startLocation, 
                to: endLocation, 
                unit: 'k',
              },
            }
          );
    
            const calculatedDistanceInMiles = response.data.route.distance;
            // Convert miles to kilometers
            const calculatedDistanceInKm = calculatedDistanceInMiles * 1.60934;

            setDistance(calculatedDistanceInKm);
        } catch (error) {
            console.error('Error calculating distance:', error);
        }
    };
    
    // Determine a suggestion (bike or walk) based on the calculated distance
    const suggestion = distance > 2 ? 'bike' : 'walk';

    return (
        <div>
            {/* Start Location Input */}
            <div>
            <label>From</label>
            <input
                type="text"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)} 
            />
            </div>

            {/* End Location Input */}
            <div>
                <label>To</label>
                <input
                type="text"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)} 
            />
            </div>

            {/* Calculate Distance Button */}
            <div>
                <button onClick={calculateDistance}>Calculate Distance</button>
            </div>

            {/* Displays the calculated distance and suggestion */}
            {distance !== null&& (
                <p>
                    Distance from {startLocation} to {endLocation} is {distance.toFixed(2)} km. You should {suggestion}.
                </p>
            )}
        </div>
      );
    };
    

export default DistanceCalculator