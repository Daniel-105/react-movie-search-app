import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

const RemoveFavourites = (props) => {
  return (
    <>
      <div className="favourite-wrapper">
        <span>Remove from favourites</span>
        <ClearIcon />
      </div>
    </>
  );
};

export default RemoveFavourites;
