import { useState } from "react";
import api from "../utils/api";
import { Movie } from "../utils/types";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);

  const searchMovies = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      try {
        const response = await api.get(`?s=${e.target.value}&type=movie`);
        setResults(response.data.Search);
      } catch (error) {
        console.error("Search error", error);
      }
    }
  };

  return (
    <div className='search-bar'>
      <input
        type='text'
        value={query}
        onChange={searchMovies}
        placeholder='Search movies...'
      />
      {results.length > 0 && (
        <div className='search-results'>
          {results.map((movie) => (
            <div key={movie.imdbID} className='search-result-item'>
              {movie.Title} ({movie.Year})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
