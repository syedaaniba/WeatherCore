import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import Header from "./components/Header";

const App = () => {
  const [city, setCity] = useState("Karachi");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [bgClass, setBgClass] = useState("default-bg");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_WEATHER_KEY;

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeatherData(data);
        setBgClass(getBgClass(data.weather[0].main));
        fetchForecast(cityName);
      } else {
        setError("City not found!");
        setWeatherData(null);
        setForecastData([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`
      );
      const data = await res.json();
      if (data.cod === "200") {
        const dailyForecast = data.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );
        setForecastData(dailyForecast);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getBgClass = (weatherMain) => {
    switch (weatherMain.toLowerCase()) {
      case "clear": return "sunny-bg";
      case "clouds": return "cloudy-bg";
      case "rain": return "rainy-bg";
      case "snow": return "snowy-bg";
      case "thunderstorm": return "thunder-bg";
      default: return "default-bg";
    }
  };

  useEffect(() => {
    fetchWeather("Karachi");
  }, []);

  const handleSearch = () => {
    if (city) fetchWeather(city);
  };

  return (
    <div className={`App ${bgClass}`}>
      <Header city={city} setCity={setCity} handleSearch={handleSearch} />

      {loading && <p className="status-text">Loading...</p>}
      {error && <p className="status-text error">{error}</p>}

      {!loading && weatherData && (
        <div className="weather-container">
          <WeatherCard weatherData={weatherData} />
          {forecastData.length > 0 && (
            <div className="forecast-container">
              {forecastData.map((day, idx) => (
                <ForecastCard key={idx} day={day} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
