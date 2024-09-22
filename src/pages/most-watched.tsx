import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import api from "../utils/api";
import { handleError } from "../utils/errorHandler";
import { useFavorites } from "../contexts/FavoritesContext";
import { Movie } from "@/utils/types";
import { ClimbingBoxLoader } from "react-spinners";

const MostWatched = () => {
  const { isFavorite } = useFavorites();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [releaseYear, setReleaseYear] = useState("");
  const [hasPoster, setHasPoster] = useState(false);
  const [appliedReleaseYear, setAppliedReleaseYear] = useState("");
  const [appliedHasPoster, setAppliedHasPoster] = useState(false);

  const loadMovies = async (resetMovies = false) => {
    setLoading(true);

    try {
      const yearParam = appliedReleaseYear ? `&y=${appliedReleaseYear}` : "";
      const response = await api.get(
        `?s=godzilla&type=movie&page=${page}${yearParam}`
      );

      if (Array.isArray(response.data.Search)) {
        let fetchedMovies = response.data.Search;

        if (appliedHasPoster) {
          fetchedMovies = fetchedMovies.filter(
            (movie: Movie) => movie.Poster && movie.Poster !== "N/A"
          );
        }

        setMovies((prevMovies) =>
          resetMovies ? fetchedMovies : [...prevMovies, ...fetchedMovies]
        );

        if (response.data.totalResults) {
          setTotalResults(Number(response.data.totalResults));
        }

        if (fetchedMovies.length > 0) {
          setPage((prevPage) => prevPage + 1);
        }
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setAppliedReleaseYear(releaseYear);
    setAppliedHasPoster(hasPoster);
    setPage(1);
    loadMovies(true);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    loadMovies(true);
  }, [appliedReleaseYear, appliedHasPoster]);

  const handleScroll = () => {
    if (loading || movies.length >= totalResults) return;
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.offsetHeight
    ) {
      loadMovies();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, movies]);

  return (
    <div className='most-watched-favorites-page'>
      <h1>Most Watched Movies</h1>

      <div className='filter-container'>
        <select
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        >
          <option value=''>All Years</option>
          {[...Array(new Date().getFullYear() - 1954 + 1)].map((_, i) => {
            const year = 1954 + i;
            return (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            );
          })}
        </select>

        <label>
          <input
            type='checkbox'
            checked={hasPoster}
            onChange={(e) => setHasPoster(e.target.checked)}
          />
          Only show movies with posters
        </label>

        <button onClick={applyFilters}>Apply Filters</button>
      </div>

      <MovieList
        movies={movies.map((movie: Movie) => ({
          ...movie,
          isFavorite: isFavorite(movie.imdbID),
        }))}
      />

      {!loading && movies.length === 0 && (
        <p className='no-movies'>No Movies Found.</p>
      )}
    </div>
  );
};

export default MostWatched;
