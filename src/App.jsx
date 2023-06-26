import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./Components/MovieList";
import MovieListHeading from "./Components/MovieListHeading";
import SearchBox from "./Components/SearchBox";
import AddFavourites from "./Components/AddFavourites";
import RemoveFavourites from "./Components/RemoveFavourites";

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchImdbID, setSearchImdbID] = useState("");

  const getMovieRequest = async () => {
    let url = "http://www.omdbapi.com/?apikey=2d6f441d";

    if (searchTitle) {
      url += `&s=${searchTitle}`;
    }

    if (searchYear) {
      url += `&y=${searchYear}`;
    }

    if (searchImdbID) {
      url = `http://www.omdbapi.com/?apikey=2d6f441d&i=${searchImdbID}`;
    }

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    } else {
      // For IMDb ID search, the API directly returns the movie details
      // So we set the single movie as an array to display in MovieList component
      setMovies(responseJson.Error ? [] : [responseJson]);
    }
  };

  useEffect(() => {
    getMovieRequest();
  }, [searchTitle, searchYear, searchImdbID]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );
    setFavourites(movieFavourites || []);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div>
      <div className="header">
        <MovieListHeading heading="Movies" />
        <div className="search-group">
          <SearchBox
            label="Title"
            value={searchTitle}
            onChange={(event) => setSearchTitle(event.target.value)}
          />
          <SearchBox
            label="Year"
            value={searchYear}
            onChange={(event) => setSearchYear(event.target.value)}
          />
        </div>
        <div className="search-group">
          <SearchBox
            label="IMDb ID"
            value={searchImdbID}
            onChange={(event) => setSearchImdbID(event.target.value)}
          />
        </div>
      </div>
      <div>
        <MovieList
          movies={movies}
          setMovies={setMovies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
      <div className="header">
        <MovieListHeading heading="Favourites" />
      </div>
      <div>
        <MovieList
          movies={favourites}
          setMovies={setMovies}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
}

export default App;
