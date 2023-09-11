import { useEffect, useRef } from "react";
function Search({ query, setQuery }) {
  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current.focus();
  },[])
  
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return <input className="search" type="text" placeholder="Search movies..." value={query} onChange={handleChange} ref={searchInputRef}/>;
}

export default Search;
