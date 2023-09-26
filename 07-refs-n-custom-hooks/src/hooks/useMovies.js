import { useEffect, useState } from "react";

export function useMovies(query, callback, key) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    callback?.();
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&s=${query}`,
          { signal: controller.signal },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, key]);
  return { movies, loading, error };
}
