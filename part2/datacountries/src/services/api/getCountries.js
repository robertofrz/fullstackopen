import axios from "axios";

async function getCountries() {
  try {
    const response = await axios.get(
      "https://studies.cs.helsinki.fi/restcountries/api/all"
    );
    return response.data;
  } catch (error) {
    console.log(`Error fetching countries: ${error.message}`);
    throw error;
  }
}
export default getCountries;
