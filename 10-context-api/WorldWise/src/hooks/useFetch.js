import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUrl() {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUrl();
  }, [url]);

  return [data, isLoading];
}
