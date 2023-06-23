import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./Components/MovieList";
import MovieListHeading from "./Components/MovieListHeading";
import SearchBox from "./Components/SearchBox";

function App() {
  const [movies, setMovies] = useState([]);
  const [seachValue, setSearchValue] = useState("");

  const getMovieRequest = async (seachValue) => {
    const url = `http://www.omdbapi.com/?s=${seachValue}&apikey=2d6f441d`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

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
