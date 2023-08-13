import mongoose, { Schema, model } from "mongoose";

const TaskSchema = new Schema(
  {
    taskTitle: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    priority: {
      type: String,
      trim: true,
    },
    taskPicture: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
const Tasks = model("Tasks", TaskSchema);
export default Tasks;
