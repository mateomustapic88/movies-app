import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import api from "../utils/api";
import { useFavorites } from "../contexts/FavoritesContext";
import "../styles/components/navbar.scss";

const Navbar = () => {
  const { favorites } = useFavorites();
  const [isFavoritesDropdownOpen, setIsFavoritesDropdownOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchDropdownOpen(false);
      }
      setIsFavoritesDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      setIsSearchDropdownOpen(true);
      try {
        const response = await api.get(`?s=${value}&type=movie`);
        setSearchResults(response.data.Search || []);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSearchResults([]);
      setIsSearchDropdownOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, searchResults.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        const selectedMovie = searchResults[selectedIndex];
        window.location.href = `/movie/${selectedMovie.imdbID}`;
      } else if (searchTerm) {
        window.location.href = `/search?query=${searchTerm}`;
      }
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setIsSearchDropdownOpen(false);
  };

  const toggleFavoritesDropdown = () => {
    if (!isSearchDropdownOpen) {
      setIsFavoritesDropdownOpen((prev) => !prev);
    }
  };

  return (
    <nav className='navbar'>
      <Link href='/'>Home</Link>
      <Link href='/most-watched'>Most Watched</Link>
      <Link href='/favorites'>Favorites</Link>

      <div className='search-container' ref={searchRef}>
        <input
          type='text'
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder='Search movies...'
          className='search-input'
        />
        {searchTerm && (
          <button className='clear-button' onClick={clearSearch}>
            &times;
          </button>
        )}
        {isSearchDropdownOpen && searchResults.length > 0 && (
          <div className='search-dropdown'>
            {searchResults.map((movie, index) => (
              <Link
                href={`/movie/${movie.imdbID}`}
                key={movie.imdbID}
                className={`search-item ${
                  index === selectedIndex ? "selected" : ""
                }`}
                onClick={() => {
                  setSearchTerm("");
                  setIsSearchDropdownOpen(false);
                }}
              >
                {movie.Title}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className='favorites-dropdown'>
        <button onClick={toggleFavoritesDropdown} className='toggle-button'>
          Favorites ({favorites.length})
        </button>
        {isFavoritesDropdownOpen && (
          <div className='dropdown-content'>
            {favorites.length > 0 ? (
              favorites.map((movie) => (
                <div
                  key={movie.imdbID}
                  className='dropdown-item'
                  onClick={() => alert("click")}
                >
                  {movie.Title}
                </div>
              ))
            ) : (
              <p className='no-favorites'>No favorites added.</p>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
