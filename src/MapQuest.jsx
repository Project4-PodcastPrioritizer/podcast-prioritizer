import React, { useState } from 'react';
import axios from 'axios';

const DistanceCalculator = () => {
    const [distance, setDistance] = useState(null);

    const calculateDistance = async () => {
        try {
          const response = await axios.get(
            'https://www.mapquestapi.com/directions/v2/route',
            {
              params: {
                key: 'Ua9N73Lhw2Tg18LuWk3hcW9q4Pp09UKM',
                from: '1164 St Clair Ave W, Toronto, ON M6E 1B3', 
                to: '991 St Clair Ave W, Toronto, ON M6E 1A3', 
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
      const suggestion = distance > 2 ? 'bike' : 'walk';

      return (
        <div>
          <button onClick={calculateDistance}>Calculate Distance</button>
          {distance !== null && (
            <p>
              The distance is {distance.toFixed(2)} km. You should {suggestion}.
            </p>
          )}
        </div>
      );
    };
    

export default DistanceCalculator