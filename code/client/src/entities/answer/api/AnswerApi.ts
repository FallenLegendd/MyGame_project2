import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '@/shared/lib/axiosInstance';
import type {
  AnswerType,
} from '../model';
import { HandleAxiosError } from '@/shared/utils/HandleAxiosError';
import type { ServerResponseType } from '@/shared/types';




