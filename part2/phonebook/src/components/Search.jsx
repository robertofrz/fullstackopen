function Search({ searchTerm, setSearchTerm }) {
  return (
    <div>
      filter shown with:{" "}
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
export default Search;
