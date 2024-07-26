import { configureStore } from "@reduxjs/toolkit";
import tertrominoReducer from "./boardSlice";

const store = configureStore({
  reducer: {
    tetromino: tertrominoReducer,
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
