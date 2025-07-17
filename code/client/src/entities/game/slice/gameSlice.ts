import { createSlice } from '@reduxjs/toolkit';
import {
  refreshTokensThunk,
  signInThunk,
  signOutThunk,
  signUpThunk,
} from '../api/GameApi';
import { initialState } from '../model';

const userSLice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(refreshTokensThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshTokensThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
        state.isInitialized = true;
      })
      .addCase(refreshTokensThunk.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isInitialized = true;
      })
      .addCase(signUpThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
        state.isInitialized = true;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error ?? null;
        state.user = null;
        state.isInitialized = true;
      })
      .addCase(signInThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
        state.isInitialized = true;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error ?? null;
        state.user = null;
        state.isInitialized = true;
      })
      .addCase(signOutThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signOutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.user = null;
        state.isInitialized = true;
      })
      .addCase(signOutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error ?? null;
        state.user = null;
        state.isInitialized = true;
      }),
});

export const userReducer = userSLice.reducer;
