import getWeather from "../services/api/getWeather";
import { useEffect, useState } from "react";

function DisplayWeather({ city }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const data = await getWeather(city);
        setWeatherData(data);
      } catch (err) {
        console.log("Error fetching weather data:", err);
      }
    }

    fetchWeather();
  }, [city]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Weather Information</h2>
      <p>Temperature: {weatherData.temperature}°C</p>
      <p>Condition: {weatherData.description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
        alt="weather icon"
      />
    </div>
  );
}

export default DisplayWeather;
