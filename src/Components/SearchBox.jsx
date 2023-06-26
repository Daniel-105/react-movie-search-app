import React from "react";
import { TextField, createTheme, ThemeProvider } from "@mui/material";

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

const SearchBox = ({ label, value, onChange }) => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <TextField
          variant="outlined"
          label={label}
          color="primary"
          InputLabelProps={{
            style: { color: "white" },
          }}
          value={value}
          onChange={onChange}
        />
      </div>
    </ThemeProvider>
  );
};

export default SearchBox;
