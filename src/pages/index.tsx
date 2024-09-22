import { useEffect, useState } from "react";
import api from "../utils/api";
import MovieList from "../components/MovieList";
import { handleError } from "../utils/errorHandler";
import "../styles/pages/homepage.scss";

const HomePage = () => {
  const [newestMovies, setNewestMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [newest, top, popular] = await Promise.all([
          api.get(`?s=latest&type=movie`),
          api.get(`?s=top&type=movie`),
          api.get(`?s=popular&type=movie`),
        ]);

        setNewestMovies(newest.data.Search);
        setTopMovies(top.data.Search.slice(0, 3));
        setPopularMovies(popular.data.Search);
      } catch (error) {
        handleError(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className='home-page'>
      <div className='category'>
        <h2>Newest Movies</h2>
        <div className='movie-list scrollable'>
          <MovieList movies={newestMovies} />
        </div>
      </div>

      <div className='category'>
        <h2>Top 3 Movies</h2>
        <div className='movie-list scrollable'>
          <MovieList movies={topMovies} />
        </div>
      </div>

      <div className='category'>
        <h2>Popular Movies by Genre</h2>
        <div className='movie-list scrollable'>
          <MovieList movies={popularMovies} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
