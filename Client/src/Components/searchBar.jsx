import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    width: "40%",
    margin: "0 auto",
    marginTop: "1rem",
    backgroundColor: "#D5D5D5", // Off-white color
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  searchIcon: {
    color: theme.palette.text.secondary,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: "25rem",
  },
}));
const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState(" ");
  const classes = useStyles();
  return (
    <Paper
      style={{ backgroundColor: "#D5D5D5", borderRadius: "10px" }}
      className={classes.searchContainer}
      elevation={0}
    >
      <IconButton className={classes.searchIcon}>
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Serach Task..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </Paper>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
