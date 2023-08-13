import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskApi from "../api/taskApi";
export const PostTask = createAsyncThunk("post_task", async (payload) => {
  try {
    const response = await taskApi.post("post_task", payload, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
});

export const EditTask = createAsyncThunk(
  "edit_task",
  async ({ taskId, payload }) => {
    try {
      const response = await taskApi.put(`edit_task/${taskId}`, payload);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const GetAllTasks = createAsyncThunk(
  "get_all_tasks",
  async () => {
    try {
      const response = await taskApi.get(`get_all_tasks`);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const GetTask = createAsyncThunk(
  "get_task",
  async (taskId) => {
    try {
      const response = await taskApi.get(`get_task/${taskId}`);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const DeleteTask = createAsyncThunk("delete_task", async (taskId) => {
  try {
    const response = await taskApi.delete(`delete_task/${taskId}`);
    return response;
  } catch (err) {
    console.log(err);
  }
});

const initialState = {
  tasks: {},
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllTasks.pending, () => {
        console.log("pending");
      })
      .addCase(GetAllTasks.fulfilled, (state, { payload }) => {
        state.tasks = payload?.data?.allTasks;
      })
      .addCase(GetAllTasks.rejected, () => {
        console.log("rejected");
      });
  },
});
// export const { } = seekerSlice.actions;
export default taskSlice.reducer;
