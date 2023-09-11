import { useEffect, useState } from "react";
const KEY = "35a9bf11";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!response.ok)
          throw new Error("Something went wrong while fetching the movies");

        const data = await response.json();
        if (data.Response === "False") throw new Error("No movies found");

        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name === "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();
    return function () {
      controller.abort();
    };
  }, [query]);
  return { movies, loading, error };
}
