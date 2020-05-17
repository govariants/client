import { createSlice } from "@reduxjs/toolkit";

const initialState: { [key: number]: { [key: number]: string } } = {};

const boardSlice = createSlice({
  name: "board",
  initialState: initialState,
  reducers: {
    playStone(state, action) {
      const { x, y, color } = action.payload;
      if (!state.hasOwnProperty(x)) {
        state[x] = {};
      }
      state[x][y] = color;
    },
    removeStones(state, action) {
      const { coords } = action.payload;
      for (const [x, y] of coords) {
        const ys = state[x];
        delete ys?.[y];
        if (Object.keys(ys).length === 0) {
          delete state[x];
        }
      }
    },
  },
});

export const { playStone, removeStones } = boardSlice.actions;

export default boardSlice.reducer;
