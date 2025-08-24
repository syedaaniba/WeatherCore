import React from "react";

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="weather-card">
      <h2>{weatherData.name}, {weatherData.sys.country}</h2>

      <div className="icon-wrapper">
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
        />
      </div>

      <div className="temp">{Math.round(weatherData.main.temp)}°C</div>
      <div className="description">{weatherData.weather[0].description}</div>

      <div className="weather-info">
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Wind: {weatherData.wind.speed} m/s</p>
        <p>Pressure: {weatherData.main.pressure} hPa</p>
        <p>Feels like: {Math.round(weatherData.main.feels_like)}°C</p>
      </div>
    </div>
  );
};

export default WeatherCard;
