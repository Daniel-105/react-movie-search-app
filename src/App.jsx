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
  const [seachValue, setSearchValue] = useState("");

  // function to make te request to the api
  const getMovieRequest = async (seachValue) => {
    const url = `http://www.omdbapi.com/?s=${seachValue}&apikey=2d6f441d`;
    const response = await fetch(url);
    const responseJson = await response.json();

    // Because the TextTield doesn't have any input initially,
    // only set the movies if there is input comming for the TextTield
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  // trigger the function everytime we type on the TextTield
  useEffect(() => {
    getMovieRequest(seachValue);
  }, [seachValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );
    setFavourites(movieFavourites || []);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  // function that adds the selected movie to the favourites MovieList component
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
        <SearchBox seachValue={seachValue} setSearchValue={setSearchValue} />
      </div>
      <div>
        <MovieList
          movies={movies}
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
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
}

export default App;
