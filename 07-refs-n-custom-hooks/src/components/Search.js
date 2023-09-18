import { useRef } from "react";
import { useKeypress } from "../hooks/useKeypress";

function Search({ query, setQuery }) {
  const searchInputRef = useRef(null);
  // With an empty dependency array, the effect will only run once when the component mounts.

  useKeypress("Enter", () => {
    if (document.activeElement === searchInputRef.current) return;
    searchInputRef.current.focus();
    //clear text in search bar.
    setQuery("");
  });

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
      ref={searchInputRef}
    />
  );
}

export default Search;
