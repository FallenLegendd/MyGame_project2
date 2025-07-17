import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance, setAccessToken } from '../../../shared/lib/axiosInstance';
import type { GameType } from '../model';
import { handleAxiosError } from '../../../shared/utils/HandleAxiosError';
import type { ServerResponseType } from '@/shared/types';

enum GAME_THUNK_TYPES {
  ALL_GAMES = 'games/games',
  ONE_GAMES = 'games/',
}

enum GAME_API_URLS {
  REFRESH_TOKENS = 'auth/refreshTokens',
  SIGN_UP = 'auth/signUp',
  SIGN_IN = 'auth/signIn',
  SIGN_OUT = 'auth/signOut',
}

export const refreshTokensThunk = createAsyncThunk<
  UserType,
  void,
  { rejectValue: ServerResponseType<null> }
>(USER_THUNK_TYPES.REFRESH_TOKENS, async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<
      ServerResponseType<UserResponseType>
    >(USER_API_URLS.REFRESH_TOKENS);

    setAccessToken(response.data.data.accessToken);
    return response.data.data.user;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const signUpThunk = createAsyncThunk<
  UserType,
  UserSignUpDataType,
  { rejectValue: ServerResponseType<null> }
>(USER_THUNK_TYPES.SIGN_UP, async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<
      ServerResponseType<UserResponseType>
    >(USER_API_URLS.SIGN_UP, userData);

    setAccessToken(response.data.data.accessToken);
    return response.data.data.user;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const signInThunk = createAsyncThunk<
  UserType,
  UserSignInDataType,
  { rejectValue: ServerResponseType<null> }
>(USER_THUNK_TYPES.SIGN_IN, async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<
      ServerResponseType<UserResponseType>
    >(USER_API_URLS.SIGN_IN, userData);

    setAccessToken(response.data.data.accessToken);
    return response.data.data.user;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const signOutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: ServerResponseType<null> }
>(USER_THUNK_TYPES.SIGN_OUT, async (_, { rejectWithValue }) => {
  try {
    await axiosInstance.get<ServerResponseType<null>>(USER_API_URLS.SIGN_OUT);

    setAccessToken('');
    return;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});
