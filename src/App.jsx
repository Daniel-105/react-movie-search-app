import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./Components/MovieList";
import MovieListHeading from "./Components/MovieListHeading";
import SearchBox from "./Components/SearchBox";

function App() {
  const [movies, setMovies] = useState([]);
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

  return (
    <div>
      <div className="header">
        <MovieListHeading heading="Movies" />
        <SearchBox seachValue={seachValue} setSearchValue={setSearchValue} />
      </div>
      <div>
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;
