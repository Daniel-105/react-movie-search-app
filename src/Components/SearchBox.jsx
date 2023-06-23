import React from "react";
// import TextField from "@mui/material/TextField";
import { TextField, createTheme, ThemeProvider, Portal } from "@mui/material";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "& fieldset": {
            borderColor: "white",
          },
        },
        input: {
          color: "white",
        },
      },
    },
  },
});

const SearchBox = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <TextField
          variant="outlined"
          label="Find your movie..."
          color="primary"
          InputLabelProps={{
            style: { color: "white" },
          }}
          value={props.value}
          onChange={(event) => props.setSearchValue(event.target.value)}
        />
      </div>
    </ThemeProvider>
  );
};

export default SearchBox;
