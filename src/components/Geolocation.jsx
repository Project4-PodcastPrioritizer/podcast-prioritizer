// Geolocation.js

import React, { useState, useEffect } from 'react';

const Geolocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      setError('Sorry your location is not supported by your browser. Please try with a differernt browser');
      return;
    }

    // Get the user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (err) => {
        setError(`Error: ${err.message}`);
      }
    );
  }, []);

  return (
    <div>
      <h2>Geolocation Information</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </div>
      )}
    </div>
  );
};

export default Geolocation;
