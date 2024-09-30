import React from "react";

import { useState, useEffect } from "react";
import getWeatherData from "../weather/weatherAPI";
import "../style/weather.css";

import { bostonCoordinates } from "../clientConstants";
const Weather = () => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentlyDaytime, setCurrentlyDaytime] = useState(true);

  useEffect(() => {
    const fetchWeatherDataURL = async () => {
      try {
        const data = await getWeatherData(bostonCoordinates[0], bostonCoordinates[1]);
        setForecast(data.properties);
        setCurrentlyDaytime(data.properties.periods[0].isDaytime);
      } catch (error) {
        console.error("Error in useEffect:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherDataURL();
  }, []);

  var topRowPeriods = [];
  var bottomRowPeriods = [];

  if (currentlyDaytime) {
    topRowPeriods = forecast ? forecast.periods.filter((period) => period.isDaytime) : [];
    bottomRowPeriods = forecast ? forecast.periods.filter((period) => !period.isDaytime) : [];
  } else {
    topRowPeriods = forecast ? forecast.periods.filter((period) => !period.isDaytime) : [];
    bottomRowPeriods = forecast ? forecast.periods.filter((period) => period.isDaytime) : [];
  }

  return (
    <div className="forecast-container">
      <svg className="event-banner" height="60" width="300">
        <text x="50%" y="50%" className="event-banner-text">
          Weather this week in Boston!
        </text>
      </svg>
      {!loading && forecast && (
        <div className="grid-container">
          <div className="row">
            {topRowPeriods.map((period, index) => (
              <div key={index} className="timeframe">
                <h1>{period.name}</h1>
                <p>
                  {period.temperature}° {period.temperatureUnit}
                </p>
              </div>
            ))}
          </div>
          <div className="row">
            {bottomRowPeriods.map((period, index) => (
              <div key={index} className="timeframe">
                <h1>{period.name}</h1>
                <p>
                  {period.temperature}° {period.temperatureUnit}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
