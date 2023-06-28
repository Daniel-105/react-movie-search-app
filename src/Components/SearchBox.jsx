import React from "react";
import { TextField, createTheme, ThemeProvider, Box } from "@mui/material";

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
      <Box sx={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
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
      </Box>
    </ThemeProvider>
  );
};

export default SearchBox;
