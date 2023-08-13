import Tasks from "../Models/taskModel.js";
const taskHelper = () => {
  const postTask = async (Task) => {
    const newTask = new Tasks(Task);
    newTask.save();
    return;
  };
  const editTask = async (UpdatedTask, taskId) => {
    const Updated = await Tasks.findByIdAndUpdate(
      { _id: taskId },
      { $set: UpdatedTask },
      { new: true }
    );

    return Updated;
  };
  const deleteTask = async (taskId) => {
    await Tasks.findByIdAndDelete({ _id: taskId });

    return;
  };
  const getTask = async (taskId) => {
    const Task = await Tasks.findById({ _id: taskId });
    return Task;
  };

  const getAllTask = async () => {
    const allTasks = await Tasks.find();
    return allTasks;
  };

  return {
    postTask,
    editTask,
    deleteTask,
    getTask,
    getAllTask
  };
};

export default taskHelper;
