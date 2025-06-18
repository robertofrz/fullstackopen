import { useEffect, useState } from "react";
import Search from "./components/Search";
import DisplayCountry from "./components/DisplayCountry";
import DisplayWeather from "./components/DisplayWeather";
import getCountries from "./services/api/getCountries";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [shownCountries, setShownCountries] = useState([]);
  const [isLocked, setIsLocked] = useState(false); // Prevents list from updating after a country is selected

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await getCountries();
      setAllCountries(countries);
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    // Only filter the list if no country has been selected
    if (!isLocked) {
      if (searchTerm) {
        const filtered = allCountries.filter((country) =>
          country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setShownCountries(filtered);
      } else {
        // Clear the list when the search input is empty
        setShownCountries([]);
      }
    }
  }, [searchTerm, allCountries, isLocked]);

  const handleShow = (country) => {
    setShownCountries([country]);
    setSearchTerm("");
    setIsLocked(true); // Prevent further filtering
  };

  return (
    <div>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setIsLocked={setIsLocked}
        handleShow={handleShow}
        shownCountries={shownCountries}
      />
      <DisplayCountry shownCountries={shownCountries} />

      {shownCountries.length === 1 && shownCountries[0].capital?.length > 0 && (
        <DisplayWeather city={shownCountries[0].capital[0]} />
      )}
    </div>
  );
}

export default App;
