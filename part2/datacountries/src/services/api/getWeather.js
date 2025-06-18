import axios from "axios";

async function getWeather(city) {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };
  } catch (error) {
    console.error(
      "Error fetching weather data:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export default getWeather;
