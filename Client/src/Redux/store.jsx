import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    // Handle potential errors while saving
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    tasks:taskReducer
  },

  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
