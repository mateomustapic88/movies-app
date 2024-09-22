import { GetServerSideProps } from "next";
import { Movie } from "../../utils/types";
import api from "../../utils/api";
import { handleError } from "../../utils/errorHandler";
import { useFavorites } from "../../contexts/FavoritesContext";
import { toast } from "react-toastify";
import "../../styles/pages/movieDetails.scss";

interface MovieDetailsProps {
  movie: Movie;
}

const MovieDetails = ({ movie }: MovieDetailsProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isMovieFavorite = isFavorite(movie.imdbID);

  const handleToggleFavorite = () => {
    toggleFavorite(movie);
    if (!isMovieFavorite) {
      toast.success("Added to favorites", { position: "top-right" });
    } else {
      toast.error("Removed from favorites", { position: "top-right" });
    }
  };

  return (
    <div className='movie-details'>
      <div className='movie-poster'>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/default-poster.jpg"}
          alt={movie.Title}
        />
      </div>
      <div className='movie-info'>
        <h1>{movie.Title}</h1>
        <p className='movie-plot'>{movie.Plot || "No plot available"}</p>
        <ul className='movie-meta'>
          <li>
            <strong>Year:</strong> {movie.Year}
          </li>
          <li>
            <strong>Genre:</strong> {movie.Genre || "N/A"}
          </li>
          <li>
            <strong>Duration:</strong> {movie.Runtime || "N/A"}
          </li>
          <li>
            <strong>Country:</strong> {movie.Country || "N/A"}
          </li>
          <li>
            <strong>Cast:</strong> {movie.Actors || "N/A"}
          </li>
          <li>
            <strong>IMDB Rating:</strong> {movie.imdbRating || "N/A"}
          </li>
        </ul>
        <button
          className={`favorite-button ${isMovieFavorite ? "active" : ""}`}
          onClick={handleToggleFavorite}
        >
          {isMovieFavorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const response = await api.get(`?i=${id}&plot=full`);
    return { props: { movie: response.data } };
  } catch (error) {
    handleError(error);
    return { notFound: true };
  }
};

export default MovieDetails;
