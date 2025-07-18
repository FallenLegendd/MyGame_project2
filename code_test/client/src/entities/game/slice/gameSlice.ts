import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../model";
import {
  
  createThunkGame,
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
      })
      .addCase(createThunkGame.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(createThunkGame.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.game = action.payload;
      //! Если нужно добавить в общий список игр:
      // state.games = state.games ? [...state.games, action.payload] : [action.payload];
    })
    .addCase(createThunkGame.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.error || "Не удалось создать игру";
    }),
});
export const gameReducer = gameSlice.reducer;