import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddFavourites = (props) => {
  return (
    <>
      <div className="favourite-wrapper">
        <span>Add to Favourites</span>
        <FavoriteIcon color="error" />
      </div>
    </>
  );
};

export default AddFavourites;
