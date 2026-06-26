import { useState, useEffect } from "react";
import Map from "./components/Map";
import { getIpData } from "./api/ipService";
import "./App.css";
import "./styles/Global.css";

function App() {
  const [ipLocation, setIpLocation] = useState([51.505, -0.09]);
  const [searchIp, setSearchIp] = useState("");
  const [ipData, setIpData] = useState({
    ip: "Loading...",
    location: "Loading...",
    timezone: "Loading...",
    isp: "Loading...",
  });

  // Centralized method to trigger data updates
  const handleFetchLocation = async (targetIp = "") => {
    try {
      const sanitizedData = await getIpData(targetIp);

      setIpLocation(sanitizedData.coordinates);
      setIpData({
        ip: sanitizedData.ip,
        location: sanitizedData.location,
        timezone: sanitizedData.timezone,
        isp: sanitizedData.isp,
      });
    } catch (error) {
      alert(error.message || "An unexpected error occurred.");
    }
  };

  // Initial load hook
  useEffect(() => {
    handleFetchLocation();
  }, []);

  // Form submission handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchIp.trim()) {
      handleFetchLocation(searchIp.trim());
    }
  };

  return (
    <div className="app__container">
      <header className="app__header">
        <h1 className="app__title">IP Address Tracker</h1>

        <form onSubmit={handleSearch} className="search__form">
          <input
            type="text"
            placeholder="Search for an IP address or domain"
            value={searchIp}
            onChange={(e) => setSearchIp(e.target.value)}
            className="search__input"
          />
          <button type="submit" className="search__button">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
              <path
                fill="none"
                stroke="#FFF"
                strokeWidth="3"
                d="M2 1l6 6-6 6"
              />
            </svg>
          </button>
        </form>

        <div className="results__panel">
          <div className="results__block">
            <span className="results__label">IP ADDRESS</span>
            <p className="results__value">{ipData.ip}</p>
          </div>
          <div className="results__block">
            <span className="results__label">LOCATION</span>
            <p className="results__value">{ipData.location}</p>
          </div>
          <div className="results__block">
            <span className="results__label">TIMEZONE</span>
            <p className="results__value">{ipData.timezone}</p>
          </div>
          <div className="results__block">
            <span className="results__label">ISP</span>
            <p className="results__value">{ipData.isp}</p>
          </div>
        </div>
      </header>

      <Map center={ipLocation} />
    </div>
  );
}

export default App;
