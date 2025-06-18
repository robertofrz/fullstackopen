function DisplayCountry({ shownCountries }) {
  return (
    <>
      {shownCountries.length === 1 && (
        <div>
          <h2>{shownCountries[0].name.common}</h2>
          <p>Capital: {shownCountries[0].capital}</p>
          <p>Continent: {shownCountries[0].continents.join(", ")}</p>
          <p>Area: {shownCountries[0].area} km²</p>
          <p>Population: {shownCountries[0].population}</p>

          <h4>Currency:</h4>
          <ul>
            {Object.values(shownCountries[0].currencies).map((currency) => (
              <li key={currency.name}>
                {currency.name} ({currency.symbol})
              </li>
            ))}
          </ul>

          <h3>Languages</h3>
          <ul>
            {Object.values(shownCountries[0].languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>

          <img
            src={shownCountries[0].flags.png}
            alt={shownCountries[0].flags.alt}
            width="200"
          />
        </div>
      )}
    </>
  );
}
export default DisplayCountry;
