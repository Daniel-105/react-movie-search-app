import React, { useState } from "react";
import { Card, CardMedia, Modal, Box, Typography } from "@mui/material";

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  // State variables for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleOverlayClick = async (movie) => {
    const url = `http://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apikey=2d6f441d`;
    const response = await fetch(url);
    const data = await response.json();
    setSelectedMovie(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ display: "flex" }}>
      {props.movies.map((movie) => (
        <div
          key={movie.imdbID}
          style={{ flex: "0 0 auto", marginRight: "16px" }}
          className="image-container"
          onClick={() => handleOverlayClick(movie)}
        >
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
