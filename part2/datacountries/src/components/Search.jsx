function Search({
  searchTerm,
  setSearchTerm,
  setIsLocked,
  handleShow,
  shownCountries,
}) {
  return (
    <div>
      <label htmlFor="search">Find countries</label>
      <input
        id="search"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsLocked(false); // Re-enable filtering when user types again
        }}
      />
      {shownCountries.length > 10 && (
        <p>Too many matches, be more specific with the search term.</p>
      )}

      {shownCountries.length <= 10 && shownCountries.length > 1 && (
        <ul>
          {shownCountries.map((country) => (
            <li key={country.name.common}>
              {country.name.common}{" "}
              <button onClick={() => handleShow(country)}>Show</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default Search;
