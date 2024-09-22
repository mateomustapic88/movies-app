import { useFavorites } from "../contexts/FavoritesContext";
import MovieList from "../components/MovieList";
import { toast } from "react-toastify";
import "../styles/pages/favorites.scss";

const Favorites = () => {
  const { favorites, clearFavorites } = useFavorites();

  const handleClearFavorites = () => {
    clearFavorites();
    toast.success("Favorites cleared!");
  };

  return (
    <div className='most-watched-favorites-page'>
      <h1>My Favorites</h1>
      {favorites.length === 0 ? (
        <p className='no-movies'>No Favorites Found</p>
      ) : (
        <>
          <MovieList
            movies={favorites.map((movie) => ({
              ...movie,
              isFavorite: true,
            }))}
          />
          <button
            onClick={handleClearFavorites}
            className='remove-favorites-button'
          >
            Remove All Favorites
          </button>
        </>
      )}
    </div>
  );
};

export default Favorites;
