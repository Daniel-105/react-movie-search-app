import React from "react";
import { Box, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const RemoveFavourites = (props) => {
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
        Remove from favourites
      </Typography>
      <ClearIcon sx={{ fontSize: "1.3em" }} />
    </Box>
  );
};

export default RemoveFavourites;
