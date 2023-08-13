import cloudinary from "../Config/cloudinary.js";
import taskHelper from "../Helpers/taskHelper.js";
import asyncHandler from "express-async-handler";

const taskController = () => {
  const postTask = asyncHandler(async (req, res) => {
    const Task = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);
    const UpdatedTask = { ...Task, taskPicture: result.url };
    const task = await taskHelper().postTask(UpdatedTask);
    res.json({
      status: "success",
      message: "Task Added successfully",
    });
  });
  const editTask = asyncHandler(async (req, res) => {
    const EditedTask = req.body;
    const taskId = req.params.taskId;
    if (req?.file?.path) {
      const result = await cloudinary.uploader.upload(req.file.path);
      const UpdatedTask = { ...EditedTask, taskPicture: result.url };
      const task = await taskHelper().editTask(UpdatedTask, taskId);
      res.json({
        status: "success",
        message: "Task Edited successfully",
        task,
      });
    } else {
      const task = await taskHelper().editTask(EditedTask, taskId);
      res.json({
        status: "success",
        message: "Task Edited successfully",
        task,
      });
    }
  });
  const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    await taskHelper().deleteTask(taskId);
    res.json({
      status: "success",
      message: "Task Deleted successfully",
    });
  });

  const getTask = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    const Task = await taskHelper().getTask(taskId);
    res.json({
      status: "success",
      message: "Task fetched successfully",
      Task,
    });
  });

  const getAllTask = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    const allTasks = await taskHelper().getAllTask(taskId);
    res.json({
      status: "success",
      message: "Tasks fetched successfully",
      allTasks,
    });
  });

  return {
    postTask,
    editTask,
    deleteTask,
    getAllTask,
    getTask,
  };
};

export default taskController;
