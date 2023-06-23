import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";

const MovieList = (props) => {
  return (
    <div style={{ display: "flex", overflowX: "auto" }}>
      {props.movies.map((movie) => (
        <div
          key={movie.imdbID}
          style={{ flex: "0 0 auto", marginRight: "16px" }}
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
        </div>
      ))}
    </div>
  );
};

export default MovieList;
