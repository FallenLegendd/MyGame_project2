import { createSlice } from "@reduxjs/toolkit";
import { getAllThunk, getAllForQuestion } from "../api/AnswerApi";
import { initialState } from "../model";

const answerSlice = createSlice({
  name: "answer",
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
        state.answers = action.payload;
      })
      .addCase(getAllThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllForQuestion.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllForQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.answers = action.payload;
      })
      .addCase(getAllForQuestion.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })
});


export const answerReducer = answerSlice.reducer;