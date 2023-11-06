import React, { createContext, useContext, useState, useCallback } from 'react';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const updateSearchQuery = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const updateWeatherData = useCallback((data) => {
    setWeatherData(data);
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        searchQuery,
        updateSearchQuery,
        weatherData,
        updateWeatherData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  return useContext(WeatherContext);
};
