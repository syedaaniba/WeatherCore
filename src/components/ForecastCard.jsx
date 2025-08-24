import React from "react";

const ForecastCard = ({ day }) => {
  const date = new Date(day.dt * 1000);
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

  return (
    <div className="forecast-card">
      <span className="forecast-day">{dayName}</span>
      <img
        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
        alt={day.weather[0].description}
      />
      <span className="forecast-desc">{day.weather[0].main}</span>
      <span className="forecast-temp">{Math.round(day.main.temp)}°C</span>
    </div>
  );
};

export default ForecastCard;
