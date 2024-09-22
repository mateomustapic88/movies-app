import { Movie } from "@/utils/types";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: (Movie & { isFavorite: boolean })[];
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className={`movie-list`}>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
