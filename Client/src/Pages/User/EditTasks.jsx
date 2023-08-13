import {
  Autocomplete,
  Avatar,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { EditTask, GetTask } from "../../Redux/taskSlice";
import UserHeader from "../../Components/UserHeader";
import Footer from "../../Components/footer";
import { useNavigate, useParams } from "react-router";

const EditTasks = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [task, setTask] = useState(null);

  useEffect(() => {
    const getTask = async () => {
      const response = await dispatch(GetTask(taskId));
      if (response?.payload?.data?.status === "success") {
        setTask(response?.payload?.data?.Task);
      }
    };
    getTask();
  }, [taskId]);

  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const formik = useFormik({
    initialValues: {
      taskTitle: "",
      description: "",
      priority: "",
      taskPicture: {},
    },
    validationSchema: Yup.object({
      taskTitle: Yup.string().required("Task title is required"),
      description: Yup.string().required("description is required"),
      priority: Yup.string().required("priority is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      if (values.taskPicture) {
        formData.append("taskPicture", values?.taskPicture);
      }
      formData.append("taskTitle", values?.taskTitle);
      formData.append("description", values?.description);
      formData.append("priority", values?.priority);

      const response = await dispatch(EditTask({ taskId, payload: formData }));
      if (response?.payload?.data?.status === "success") {
        navigate("/");
      }
    },
  });
  useEffect(() => {
    if (task) {
      formik.setFieldValue("taskTitle", task?.taskTitle || "");
      formik.setFieldValue("description", task?.description || "");
      formik.setFieldValue("priority", task?.priority || "");
      formik.setFieldValue("taskPicture", task?.taskPicture || "");
    }
  }, [task]);

  const fileInputRef = useRef(null);
  if (!task) {
    return (
      <><UserHeader />
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
        <Footer/>
      </>
    );
  }
  return (
    <>
      <UserHeader />
      <Container
        maxWidth="md"
        style={{ textAlign: "center", marginTop: "40px" }}
      >
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <EditIcon />
          </Avatar>
          <h2>Edit Task</h2>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="taskTitle"
                name="taskTitle"
                label="Task Title"
                value={formik.values.taskTitle}
                onChange={formik.handleChange}
                error={
                  formik.touched.taskTitle && Boolean(formik.errors.taskTitle)
                }
                helperText={formik.touched.taskTitle && formik.errors.taskTitle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="priority"
                name="priority"
                options={["Low", "Medium", "High"]}
                value={formik.values.priority || ""}
                onChange={(event, value) =>
                  formik.setFieldValue("priority", value)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Priority"
                    error={
                      formik.touched.priority && Boolean(formik.errors.priority)
                    }
                    helperText={
                      formik.touched.priority && formik.errors.priority
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                id="description"
                name="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.errors.description && formik.touched.description}
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
            <Grid item xs={6}>
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : task?.taskPicture
                    ? task?.taskPicture
                    : ""
                }
                alt="Task Picture"
                style={{
                  marginLeft: "4rem",
                  width: "100px",
                  height: "80px",
                  objectFit: "cover",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                component="span"
                style={{
                  marginTop: "1rem",
                  borderRadius: "4px",
                  backgroundColor: "#f50057",
                  color: "white",
                  cursor: "pointer",
                  marginBottom: "2rem",
                }}
                onClick={() => fileInputRef.current.click()} // Trigger the file input click event
              >
                SELECT TASK PICTURE
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                accept="companylogo"
                onChange={(event) => {
                  formik.setFieldValue("taskPicture", event.target.files[0]);
                  setSelectedImage(event.target.files[0]);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                style={{ backgroundColor: "black", marginBottom: "70px" }}
                type="submit"
                fullWidth
                variant="contained"
                //   className={classes.customButton}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      <Footer />
    </>
  );
};

export default EditTasks;
