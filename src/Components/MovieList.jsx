import React, { useState, useCallback } from "react";
import { Card, CardMedia, FormControlLabel, Checkbox } from "@mui/material";
import MovieModal from "./MovieModal";

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  // State variables for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieSeen, setIsMovieSeen] = useState(false);

  // Function to handle the click on the movie overlay and show the modal
  const handleOverlayClick = async (movie) => {
    // Fetch additional movie details from the API
    const url = `http://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apikey=2d6f441d`;
    const response = await fetch(url);
    const data = await response.json();
    setSelectedMovie(data);

    // Check if the movie has already a "seen" property. If it doesn't, assign "false" to "seen"
    const movieSeen =
      props.movies.find((m) => m.imdbID === movie.imdbID)?.seen ||
      movie.seen ||
      false;
    setIsMovieSeen(movieSeen);

    setShowModal(true);
  };

  // Function to handle the closing of the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle the change of the "seen" checkbox
  const handleSeenChange = useCallback(
    (event) => {
      // Update the "seen" property of the selected movie in the movies list
      const updatedMovies = props.movies.map((m) => {
        if (m.imdbID === selectedMovie.imdbID) {
          return { ...m, seen: event.target.checked };
        }
        return m;
      });

      setIsMovieSeen(event.target.checked);

      // Update the movies list state
      props.setMovies(updatedMovies);
    },
    [props.movies, selectedMovie]
  );

  return (
    <div style={{ display: "flex" }}>
      {/* Render movie cards */}
      {props.movies.map((movie) => (
        <div
          key={movie.imdbID}
          style={{ flex: "0 0 auto", marginRight: "16px" }}
          className="image-container"
          onClick={() => handleOverlayClick(movie)}
        >
          {/* Render movie card */}
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardMedia
              component="img"
              height={460}
              style={{ objectFit: "cover" }}
              image={movie.Poster}
              alt="movie image"
            />
          </Card>

          {/* Render favourite overlay */}
          <div
            className="overlay"
            onClick={(event) => {
              event.stopPropagation(); // Prevents the showModal from becoming true
              props.handleFavouritesClick(movie);
            }}
          >
            <FavouriteComponent />
          </div>
        </div>
      ))}

      {/* Render the MovieModal component */}
      <MovieModal
        movie={selectedMovie}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        isMovieSeen={isMovieSeen}
        handleSeenChange={handleSeenChange}
      />
    </div>
  );
};

export default MovieList;
