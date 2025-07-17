import { questionReducer } from "@/entities/question/slice/questionSlice";
import { userReducer } from "@/entities/user/slice/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    question: questionReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
