import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Movie } from "../utils/types";

interface FavoritesContextType {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  const toggleFavorite = (movie: Movie) => {
    setFavorites((prevFavorites) => {
      const isFavorited = prevFavorites.some(
        (fav) => fav.imdbID === movie.imdbID
      );
      if (isFavorited) {
        return prevFavorites.filter((fav) => fav.imdbID !== movie.imdbID);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  const isFavorite = (id: string) => favorites.some((fav) => fav.imdbID === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
