import { useEffect, useState } from "react";
import { Box } from "@mui/material";
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

  // making the request to the API
  const getMovieRequest = async () => {
    //initial url
    let url = "https://www.omdbapi.com/?apikey=2d6f441d";

    // search by title
    if (searchTitle) {
      url += `&s=${searchTitle}`;
    }

    // search by title and year
    if (searchYear) {
      url += `&y=${searchYear}`;
    }

    // search only by imdbID
    if (searchImdbID) {
      url = `https://www.omdbapi.com/?apikey=2d6f441d&i=${searchImdbID}`;
    }

    const response = await fetch(url);
    const responseJson = await response.json();

    // only set the movies if there is input on the TextField
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    } else {
      // If there is an error with the response, we set te movie variable to an empty array
      setMovies(responseJson.Error ? [] : [responseJson]);
    }
  };

  // make the request and save the title, year and imdbID in state
  useEffect(() => {
    getMovieRequest();
  }, [searchTitle, searchYear, searchImdbID]);

  // we get the object with the id of "react-movie-app-favourites" from the localStorage
  // and we parse  it into json
  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    // we save the favourite movies to favourite movies or an empty array if there is none
    setFavourites(movieFavourites || []);
  }, []);

  // function to save whatever is passed into the function to the local storage
  // with the key of "react-movie-app-favourites" and because the item passed
  // will be in json, we parse it into a string
  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  // function to add the movie to the favourites
  const addFavouriteMovie = (movie) => {
    // Check if the movie is already in favorites
    const isMovieInFavorites = favourites.find(
      (m) => m.imdbID === movie.imdbID
    );

    // If the movie is not already in favorites, add it
    if (!isMovieInFavorites) {
      // Create a copy of the current favorites and add the movie that was passed in
      const newFavouriteList = [...favourites, movie];

      // Set the favorites variable to the copy
      setFavourites(newFavouriteList);

      // Save it in the local storage
      saveToLocalStorage(newFavouriteList);
    }
  };

  // function to remove the movie to the favourite section
  const removeFavouriteMovie = (movie) => {
    // we map through each movie in the favourites array
    //  and we remove the one where the imdbID of the favourite
    // does not equal the movie one
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    // we save that in the favourites variable
    setFavourites(newFavouriteList);

    // and save it in the localStorage
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <MovieListHeading heading="Movies" />
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", marginRight: "10px" }}
          >
            <SearchBox
              label="Title"
              value={searchTitle}
              onChange={(event) => setSearchTitle(event.target.value)}
            />
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginRight: "10px" }}
          >
            <SearchBox
              label="Year"
              value={searchYear}
              onChange={(event) => setSearchYear(event.target.value)}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", marginRight: "10px" }}
          >
            <SearchBox
              label="IMDb ID"
              value={searchImdbID}
              onChange={(event) => setSearchImdbID(event.target.value)}
            />
          </Box>
        </Box>
      </Box>
      <div>
        <MovieList
          movies={movies}
          setMovies={setMovies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <MovieListHeading heading="Favourites" />
      </Box>
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
