import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../model";
import {
  
  getAllThunkGame,
  getOneThunkGame
} from "../api/GameApi";

const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getAllThunkGame.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllThunkGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.games = action.payload;
      })
      .addCase(getAllThunkGame.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getOneThunkGame.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOneThunkGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.game = action.payload;
      })
      .addCase(getOneThunkGame.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      }),
});
export const gameReducer = gameSlice.reducer;