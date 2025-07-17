import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../model";
import {
  checkCorrectThunk,
  getAllThunk,
  getOneThunk,
  getQuestionByThemeThunk,
} from "../api/questionApi";

const questionSlice = createSlice({
  name: "question",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getAllThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.questions = action.payload;
      })
      .addCase(getAllThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getOneThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOneThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.question = action.payload;
      })
      .addCase(getOneThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getQuestionByThemeThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getQuestionByThemeThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.questions = action.payload;
      })
      .addCase(getQuestionByThemeThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(checkCorrectThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkCorrectThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.lastAnswerCorrect = action.payload;
      })
      .addCase(checkCorrectThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      }),
});
export const questionReducer = questionSlice.reducer;
