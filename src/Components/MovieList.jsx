import React, { useState, useCallback, useEffect } from "react";
import {
  Card,
  CardMedia,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import MovieModal from "./MovieModal";
import { styled } from "@mui/system";

const ImageContainer = styled("div")(({ theme }) => ({
  position: "relative",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.1)",
    cursor: "pointer",
    "& .overlay": {
      opacity: 1,
    },
  },
}));

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

    // Check if the movie has already a "seen" property. If it doesn't, assign "false" to "movieSeen"
    const movieSeen =
      props.movies.find((m) => m.imdbID === m.imdbID)?.seen ||
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
      const isChecked = event.target.checked;

      setIsMovieSeen(isChecked);

      // Update the "seen" property of the selected movie in the movies list without modifying the array
      const updatedMovies = props.movies.map((m) => {
        if (m.imdbID === selectedMovie?.imdbID) {
          return { ...m, seen: isChecked };
        }
        return m;
      });

      // Update localStorage with the new checkbox state for the selected movie
      if (selectedMovie?.imdbID) {
        const movieSeenData =
          JSON.parse(localStorage.getItem("movieSeen")) || {};
        movieSeenData[selectedMovie.imdbID] = isChecked;
        localStorage.setItem("movieSeen", JSON.stringify(movieSeenData));
      }

      console.log(updatedMovies);
    },
    [props.movies, selectedMovie]
  );

  // Retrieve checkbox state from localStorage during component initialization
  useEffect(() => {
    if (selectedMovie && selectedMovie.imdbID) {
      const movieSeenData = JSON.parse(localStorage.getItem("movieSeen"));
      const movieSeen = movieSeenData && movieSeenData[selectedMovie.imdbID];
      if (movieSeen !== undefined) {
        setIsMovieSeen(movieSeen);
      }
    }
  }, [selectedMovie]);

  return (
    <div style={{ display: "flex" }}>
      {/* Render movie cards */}
      {props.movies.map((movie) => (
        <ImageContainer
          key={movie.imdbID}
          style={{ flex: "0 0 auto", marginRight: "16px" }}
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
          <Box
            className="overlay"
            onClick={(event) => {
              event.stopPropagation();
              props.handleFavouritesClick(movie);
            }}
            sx={{
              position: "absolute",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              width: "100%",
              transition: "0.5s ease",
              opacity: 0,
              bottom: 0,
              fontSize: "1.4em",
              textAlign: "center",
              height: "10%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <FavouriteComponent />
          </Box>
        </ImageContainer>
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
