import { gameReducer } from "@/entities/game/slice/gameSlice";
import { questionReducer } from "@/entities/question/slice/questionSlice";
import { userReducer } from "@/entities/user/slice/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
    question: questionReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
