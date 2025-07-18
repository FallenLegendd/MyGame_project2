import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../shared/lib/axiosInstance";
import type { ServerResponseType } from "../../../shared/types";
import type { QuestionArrayType, QuestionType } from "../model";
import { handleAxiosError } from "../../../shared/utils/HandleAxiosError";

enum QUESTION_THUNK_TYPES {
  GETALL = "allquestion/question",
  GETONE = "onequestion/question",
  QUESTIONBYTHEME = "themequestion/question",
  CHECK = "check/question",
}

enum QUESTION_THUNK_URLS {
  GETALL = "/question",
  GETONE = "/question/:id",
  QUESTIONBYTHEME = "question/theme/:game_id",
  CHECK = "/question/:id/check",
}

export const getAllThunk = createAsyncThunk<
  QuestionArrayType,
  void,
  { rejectValue: ServerResponseType<null> }
>(QUESTION_THUNK_TYPES.GETALL, async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<
      ServerResponseType<QuestionArrayType>
    >(QUESTION_THUNK_URLS.GETALL);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const getOneThunk = createAsyncThunk<
  QuestionType,
  number,
  { rejectValue: ServerResponseType<null> }
>(QUESTION_THUNK_TYPES.GETONE, async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<ServerResponseType<QuestionType>>(
      QUESTION_THUNK_URLS.GETONE.replace(":id", id.toString())
    );
    return response.data.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const getQuestionByThemeThunk = createAsyncThunk<
  QuestionArrayType,
  number,
  { rejectValue: ServerResponseType<null> }
>(
  QUESTION_THUNK_TYPES.QUESTIONBYTHEME,
  async (game_id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<
        ServerResponseType<QuestionArrayType>
      >(
        QUESTION_THUNK_URLS.QUESTIONBYTHEME.replace(
          ":game_id",
          game_id.toString()
        )
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const checkCorrectThunk = createAsyncThunk<
  boolean,
  { id: number; answer: string },
  { rejectValue: ServerResponseType<null> }
>(QUESTION_THUNK_TYPES.CHECK, async ({ id, answer }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<ServerResponseType<boolean>>(
      QUESTION_THUNK_URLS.CHECK.replace(":id", id.toString()),
      { answer }
    );
    return response.data.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});
