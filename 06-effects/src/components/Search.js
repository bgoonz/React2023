function Search({ query, setQuery }) {
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={handleChange}
    />
  );
}

export default Search;
