import { useEffect } from "react";
function Search({ query, setQuery }) {
  useEffect(() => {
    const el = document.querySelector(".search");
    console.log(el);
    el.focus();
  }, []);

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
