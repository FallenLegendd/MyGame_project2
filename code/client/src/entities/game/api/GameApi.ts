import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../shared/lib/axiosInstance";
import type { ServerResponseType } from "../../../shared/types";
import type { GamesArrayType, GameType } from "../model";
import { handleAxiosError } from "../../../shared/utils/HandleAxiosError";

enum GAME_THUNK_TYPES {
  GET_ALL_GAMES = "allgames/games",
  GET_ONE_GAME = "onegame/game",
}

enum GAME_API_URLS {
  GET_ALL_GAMES = "/game",
  GET_ONE_GAME = "/game/:id",
}

export const getAllThunkGame = createAsyncThunk<
  GamesArrayType,
  void,
  { rejectValue: ServerResponseType<null> }
>(GAME_THUNK_TYPES.GET_ALL_GAMES, async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<
      ServerResponseType<GamesArrayType>
    >(GAME_API_URLS.GET_ALL_GAMES);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const getOneThunkGame = createAsyncThunk<
  GameType,
  number,
  { rejectValue: ServerResponseType<null> }
>(GAME_THUNK_TYPES.GET_ONE_GAME, async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<ServerResponseType<GameType>>(
      GAME_API_URLS.GET_ONE_GAME.replace(":id", id.toString())
    );
    return response.data.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});