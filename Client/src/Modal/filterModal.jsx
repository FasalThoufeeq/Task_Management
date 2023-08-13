import { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 400,
    borderRadius: 25,
  },
  formControl: {
    marginBottom: theme.spacing(2),
    minWidth: 120,
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const FilterModal = ({ onFilter }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState("");

  const Tasks = useSelector((state) =>
    state?.tasks?.tasks ? state?.tasks?.tasks : []
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilter = () => {
    const filters = {
      priority: priorityFilter,
    };
    onFilter(filters);
    handleClose();
  };

  const uniquePriorities = [
    ...new Set(Tasks?.length > 0 ? Tasks?.map((task) => task?.priority) : ""),
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "2rem",
      }}
    >
      <Button variant="contained" color="primary" onClick={handleOpen}>
        <FilterAltIcon />
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="filter-modal"
        aria-describedby="filter-modal-description"
      >
        <div className={classes.modalContent}>
          <h2 id="filter-modal">Filter Tasks</h2>
          <FormControl
            className={classes.formControl}
            style={{ marginBottom: "10px" }}
          >
            <InputLabel id="priority-filter-label">Priority</InputLabel>
            <Select
              labelId="priority-filter-label"
              id="priority-filter"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              {uniquePriorities.map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div
            className={classes.buttonContainer}
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" color="primary" onClick={handleFilter}>
              Refine Tasks
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

FilterModal.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
export default FilterModal;
