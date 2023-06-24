import React, { useState, useCallback } from "react";
import {
  Card,
  CardMedia,
  Modal,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  // State variables for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieSeen, setIsMovieSeen] = useState(false);

  const handleOverlayClick = async (movie) => {
    const url = `http://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apikey=2d6f441d`;
    const response = await fetch(url);
    const data = await response.json();
    setSelectedMovie(data);

    // Check if the movie is already seen in the props.movies array
    const movieSeen =
      props.movies.find((m) => m.imdbID === movie.imdbID)?.seen ||
      movie.seen ||
      false;
    setIsMovieSeen(movieSeen);

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSeenChange = (event) => {
    const updatedMovies = props.movies.map((m) => {
      if (m.imdbID === selectedMovie.imdbID) {
        return { ...m, seen: event.target.checked };
      }
      return m;
    });

    setIsMovieSeen(event.target.checked);
    props.setMovies(updatedMovies);
  };

  const memoizedHandleSeenChange = useCallback(handleSeenChange, [
    props.movies,
    selectedMovie,
  ]);

  return (
    <div style={{ display: "flex" }}>
      {/* Movie cards */}
      {props.movies.map((movie) => (
        <div
          key={movie.imdbID}
          style={{ flex: "0 0 auto", marginRight: "16px" }}
          className="image-container"
          onClick={() => handleOverlayClick(movie)}
        >
          {/* Movie card */}
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

          {/* Favourite overlay */}
          <div
            className="overlay"
            onClick={(event) => {
              event.stopPropagation();
              props.handleFavouritesClick(movie);
            }}
          >
            <FavouriteComponent />
          </div>
        </div>
      ))}

      {/* Modal */}
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            height: "70%",
            backgroundColor: "black",
            color: "white",
            padding: "16px",
          }}
        >
          {selectedMovie && (
            <>
              <CardMedia
                component="img"
                height="100%"
                width="100%"
                style={{ objectFit: "contain", marginRight: "16px" }}
                image={selectedMovie.Poster}
                alt="movie image"
              />
              <div>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontSize: "3em" }}
                >
                  {selectedMovie.Title}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: "2em" }}>
                  Year: {selectedMovie.Year}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.5em" }}>
                  Plot: {selectedMovie.Plot}
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isMovieSeen}
                      onChange={handleSeenChange} // Update the isMovieSeen state
                      name="seen"
                      sx={{ color: "white" }}
                    />
                  }
                  label={
                    <Typography variant="body1" sx={{ fontSize: "1.5em" }}>
                      Seen
                    </Typography>
                  }
                />
                {/* Add more movie details here */}
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default MovieList;
