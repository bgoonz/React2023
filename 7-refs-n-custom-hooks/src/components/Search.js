import { useEffect, useRef } from "react";

function Search({ query, setQuery }) {
  const searchInputRef = useRef(null);
  // With an empty dependency array, the effect will only run once when the component mounts.
  useEffect(() => {
    function focusOnEnter(event) {
      // If the search input is already focused, do nothing.
      if (document.activeElement === searchInputRef.current) return;
      if (event.key === "Enter") {
        searchInputRef.current.focus();
        //clear text in search bar.
        setQuery("");
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
