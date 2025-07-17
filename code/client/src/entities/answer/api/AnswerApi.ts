import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import type { AnswerArrayType } from "../model";
import { handleAxiosError } from "@/shared/utils/HandleAxiosError";
import type { ServerResponseType } from "@/shared/types";

enum ANSWER_THUNK_TYPES {
  GET_ALL = "allanswers/answers",
  GET_ALL_FOR_QUESTION = "answers/questionanswers",
}

enum ANSWER_API_URLS {
  GET_ALL = "/answer/all",
  GET_ALL_FOR_QUESTION = "/answer/:id",
}

export const getAllThunk = createAsyncThunk<
  AnswerArrayType,
  void,
  { rejectValue: ServerResponseType<null> }
>(ANSWER_THUNK_TYPES.GET_ALL, async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<
      ServerResponseType<AnswerArrayType>
    >(ANSWER_API_URLS.GET_ALL);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const getAllForQuestion = createAsyncThunk<
  AnswerArrayType,
  number,
  { rejectValue: ServerResponseType<null> }
>(ANSWER_THUNK_TYPES.GET_ALL_FOR_QUESTION, async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<
      ServerResponseType<AnswerArrayType>
    >(ANSWER_API_URLS.GET_ALL_FOR_QUESTION.replace(":id", id.toString()));
    return response.data.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});
