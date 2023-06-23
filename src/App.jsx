import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./Components/MovieList";

function App() {
  const [movies, setMovies] = useState([]);

  const getMovieRequest = async () => {
    const url = "http://www.omdbapi.com/?s=avengers&apikey=2d6f441d";
    const response = await fetch(url);
    const responseJson = await response.json();
    setMovies(responseJson.Search);
  };

  useEffect(() => {
    getMovieRequest();
  }, []);

  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;
