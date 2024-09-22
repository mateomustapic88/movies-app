import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Movie } from "@/utils/types";
import Link from "next/link";
import { ClimbingBoxLoader } from "react-spinners";
import { toast } from "react-toastify";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isLoading, setIsLoading] = useState(false);
  const favoriteStatus = isFavorite(movie.imdbID);

  const handleFavoriteToggle = () => {
    toggleFavorite(movie);
    if (!favoriteStatus) {
      toast.success("Added to favorites", { position: "top-right" });
    } else {
      toast.error("Removed from favorites", { position: "top-right" });
    }
  };

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className='movie-card'>
      <Link href={`/movie/${movie.imdbID}`} onClick={handleClick}>
        {isLoading ? (
          <div className='loader-container'>
            <ClimbingBoxLoader
              color={"#3498db"}
              loading={isLoading}
              size={15}
            />
          </div>
        ) : (
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
            alt={movie.Title}
          />
        )}
        <div className='movie-info'>
          <h4 className='movie-title'>{movie.Title}</h4>
          <p className='movie-year'>{movie.Year}</p>
        </div>
      </Link>
      <div className='favorite-button' onClick={handleFavoriteToggle}>
        {favoriteStatus ? (
          <FaHeart className='heart-icon filled' />
        ) : (
          <FaRegHeart className='heart-icon' />
        )}
      </div>
    </div>
  );
};

export default MovieCard;
