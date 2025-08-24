import React from "react";
import { FaSearch } from "react-icons/fa";

const Header = ({ city, setCity, handleSearch }) => {
  return (
    <div className="app-header">
      <h1 className="app-title">WeatherCore</h1>
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Enter city..."
        />
        <button onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default Header;
