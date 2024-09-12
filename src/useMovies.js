import { useEffect, useState } from "react";

const KEY = 22764486;

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(
    function () {
      callback?.();

      const controller = new AbortController();
      const signal = controller.signal;
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
            { signal }
          );

          if (!res.ok) throw new Error("获取数据失败, 请重试");

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movie Not Found");
          }

          // handleCloseMovie();

          setMovies(data.Search);
        } catch (error) {
          console.error(error.message);
          if (error.name === "AbortError") return;
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setIsLoading(false);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
