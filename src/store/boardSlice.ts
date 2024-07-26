import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Tetromino } from "../type";
import { tetrominoes, randomTet } from "../utils/tetrominoes";

const initialState: Tetromino = {
  x: 4,
  y: 0,
  shape: tetrominoes[randomTet()],
};

const tetrominoSlice = createSlice({
  name: "tetromino",
  initialState,
  reducers: {
    updateTetromino: (state, { payload }: PayloadAction<Tetromino>): void => {
      state.x = payload.x;
      state.y = payload.y;
      state.shape = payload.shape;
    },
  },
});

setInterval(() => {
  console.log("ok");
}, 900);

export const { updateTetromino } = tetrominoSlice.actions;
export default tetrominoSlice.reducer;
