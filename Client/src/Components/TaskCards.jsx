import {} from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { DeleteTask } from "../Redux/taskSlice";
import { toast } from "react-toastify";

const TaskCard = ({
  _id,
  taskTitle,
  description,
  priority,
  taskPicture,
  render,
  setRender,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let badgeColor = "error"; // Default color

  if (priority === "Medium") {
    badgeColor = "primary";
  } else if (priority === "Low") {
    badgeColor = "success";
  } else if (priority === "High") {
    badgeColor = "error";
  }

  const handleDelete = async () => {
    const response = await dispatch(DeleteTask(_id));
    if (response?.payload?.data?.status === "success") {
      setRender(!render)
    }
  };
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={taskPicture ? taskPicture : ""}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Badge
              badgeContent={priority ? priority : "Not Provided"}
              color={badgeColor}
            >
              {taskTitle ? taskTitle : "NOT PROVIDED"}
            </Badge>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description ? description : "Not PROVIDED"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="text"
            style={{
              color: "black",
              marginBottom: "5px",
              marginRight: "5px",
            }}
            startIcon={<EditIcon />}
            onClick={() => navigate(`edit_task/${_id}`)}
          >
            EDIT
          </Button>
          <Button
            variant="text"
            style={{
              color: "black",
              marginBottom: "5px",
              marginRight: "5px",
            }}
            startIcon={<DeleteIcon />}
            onClick={()=>{
              toast.warning(
                <div>
                  <p>Are you sure you want to Delete Task?</p>
                  <div>
                    <Button
                      color="success"
                      variant="contained"
                      size="small"
                      onClick={() => {
                        handleDelete()
                        toast.success("Deleted Successfully");
                      }}
                      style={{ marginRight: "1rem" }}
                    >
                      Yes
                    </Button>
                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={toast.dismiss()}
                    >
                      No
                    </Button>
                  </div>
                </div>,
                {
                  autoClose: false,
                }
              );
              
              }}
          >
            DELETE
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

TaskCard.propTypes = {
  _id: PropTypes.string.isRequired,
  taskTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  taskPicture: PropTypes.string.isRequired,
  render: PropTypes.string.isRequired,
  setRender: PropTypes.string.isRequired,
};

export default TaskCard;
