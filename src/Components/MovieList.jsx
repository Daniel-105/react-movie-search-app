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

  // Function to make the modal visible
  const handleOverlayClick = async (movie) => {
    // Making the request to the api to have the plot information
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

  // Function to make the modal disappear when the user clicks out of the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function that accepts and event (the checkbox one)
  const handleSeenChange = (event) => {
    // Iterats through the movies passed through and checks if the imdb from the movie passed in is the same as the selected one
    const updatedMovies = props.movies.map((m) => {
      if (m.imdbID === selectedMovie.imdbID) {
        // creates a copy of the m (movie) and sets the seen property to true (event.target.checked)
        return { ...m, seen: event.target.checked };
      }
      return m;
    });

    // update the current state of the checkbox
    setIsMovieSeen(event.target.checked);

    // updates the state of "movies"
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
              event.stopPropagation(); // Prevents the showModal to become true
              props.handleFavouritesClick(movie); // add
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
