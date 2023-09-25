import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleQuery(event) {
    setQuery(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={handleQuery}
      />
    </form>
  );
}

export default SearchOrder;
