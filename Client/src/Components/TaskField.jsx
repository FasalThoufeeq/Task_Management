import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCards";
import { useDispatch } from "react-redux";
import { GetAllTasks } from "../Redux/taskSlice";
import { useNavigate } from "react-router";
import FilterModal from "../Modal/filterModal";
import SearchBar from "./searchBar";

const TaskField = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Tasks, setTasks] = useState();
  const [render, setRender] = useState(false);
  const [filteredTask, setFilteredTask] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const getAllTasks = async () => {
      const result = await dispatch(GetAllTasks());
      if (result?.payload?.data?.status === "success") {
        setTasks(result?.payload?.data?.allTasks);
      }
    };
    getAllTasks();
  }, [render]);
  useEffect(() => {
    const searched =
      Tasks && Tasks.length > 0
        ? Tasks?.filter((task) => {
            const { taskTitle, priority } = task;
            return (
              taskTitle.toLowerCase().includes(searchValue.toLowerCase()) ||
              priority.toLowerCase().includes(searchValue.toLowerCase())
            );
          })
        : [];
    setFilteredTask(searched);
    setpage(1);
  }, [Tasks, searchValue]);

  const handleSearch = (searchValue) => {
    setSearchValue(searchValue.toLowerCase().trim());
  };

  const handleFilter = (filters) => {
    const { priority } = filters;

    const filtered = Tasks?.filter((task) => {
      const taskPriority = task?.priority.toLowerCase();
      return (
        taskPriority === "" || taskPriority.includes(priority.toLowerCase())
      );
    });

    setFilteredTask(filtered);
    setpage(1);
  };
  const [page, setpage] = useState(1);
  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };
  const rowsPerPage = 6;
  const displayJobs = filteredTask
    ? filteredTask?.slice((page - 1) * rowsPerPage, page * rowsPerPage)
    : [];

  if (!Tasks) {
    return (
      <>
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            height="55vh"
          >
            <CircularProgress />
          </Grid>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container
        style={{ textAlign: "center", marginTop: "40px", marginBottom: "40px" }}
      >
        <Typography
          variant="h5"
          component="h1"
          align="center"
          mb={5}
          mt={5}
          gutterBottom
        >
          YOUR TASKS
        </Typography>
        <div style={{ marginBottom: "2rem" }}>
          <SearchBar handleSearch={handleSearch} />
        </div>
        <FilterModal onFilter={handleFilter} />

        <Grid container display={"flex"}>
          {displayJobs && displayJobs?.length > 0
            ? displayJobs.map((task, index) => {
                return (
                  <Grid
                    key={index}
                    item
                    xs={4}
                    style={{ marginBottom: "2.8rem" }}
                  >
                    <TaskCard
                      _id={task?._id}
                      taskTitle={task?.taskTitle}
                      description={task?.description}
                      priority={task?.priority}
                      taskPicture={task?.taskPicture}
                      render={render}
                      setRender={setRender}
                    />
                  </Grid>
                );
              })
            : ""}
        </Grid>
        <Button
          variant="contained"
          style={{ backgroundColor: "black" }}
          onClick={() => navigate("/post_task")}
        >
          Post Task
        </Button>
      </Container>
      <Pagination
        count={Math.ceil(filteredTask?.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        variant="outlined"
        color="primary"
        shape="rounded"
        sx={{
          display: "flex",
          justifyContent: "center",
          // marginRight: '35rem',
          marginBottom: "5rem",
        }}
      />
    </>
  );
};

export default TaskField;
