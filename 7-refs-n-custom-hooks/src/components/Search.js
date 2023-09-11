import { useEffect, useRef } from "react";

function Search({ query, setQuery }) {
  const searchInputRef = useRef(null);
  // With an empty dependency array, the effect will only run once when the component mounts.
  useEffect(() => {
    function focusOnEnter(event) {
      if (event.key === "Enter") {
        searchInputRef.current.focus();
      }
    }
    searchInputRef.current.focus();
    document.addEventListener("keydown", focusOnEnter);
    return () => {
      document.removeEventListener("keydown", focusOnEnter);
    };
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return <input className="search" type="text" placeholder="Search movies..." value={query} onChange={handleChange} ref={searchInputRef} />;
}

export default Search;
