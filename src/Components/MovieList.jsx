import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;
  return (
    <div style={{ display: "flex" }}>
      {props.movies.map((movie) => (
        <div
          key={movie.imdbID}
          style={{ flex: "0 0 auto", marginRight: "16px" }}
          className="image-container"
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
            onClick={() => props.handleFavouritesClick(movie)}
          >
            <FavouriteComponent />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
