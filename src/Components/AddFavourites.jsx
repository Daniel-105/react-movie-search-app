import React from "react";
import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const FavouriteWrapper = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Typography
        sx={{
          fontSize: "1em",
          // display: "inline",
          marginRight: "8px",
        }}
      >
        Add to Favourites
      </Typography>
      <FavoriteIcon color="error" sx={{ fontSize: "1.3em" }} />
    </Box>
  );
};

export default FavouriteWrapper;
