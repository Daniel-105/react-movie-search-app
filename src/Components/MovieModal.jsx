import React from "react";
import {
  Modal,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  CardMedia,
} from "@mui/material";

const modalContentStyles = {
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
};

const MovieModal = ({
  movie,
  showModal,
  handleCloseModal,
  isMovieSeen,
  handleSeenChange,
}) => {
  if (!movie) {
    return null;
  }

  return (
    <Modal
      open={showModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalContentStyles}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <CardMedia
            component="img"
            sx={{ flex: "0 0 30%", maxHeight: 800, objectFit: "contain" }}
            image={movie.Poster}
            alt="movie image"
          />
          <div sx={{ flex: "1" }}>
            <Typography variant="h6" component="h2" sx={{ fontSize: "3em" }}>
              {movie.Title}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontSize: "2em" }}>
              Year: {movie.Year}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.5em" }}>
              Plot: {movie.Plot}
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isMovieSeen}
                  onChange={handleSeenChange}
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
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default MovieModal;
