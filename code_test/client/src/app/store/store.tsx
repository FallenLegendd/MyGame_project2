import { answerReducer } from "@/entities/answer/slice/answerSlice";
import { gameReducer } from "@/entities/game/slice/gameSlice";
import { questionReducer } from "@/entities/question/slice/questionSlice";
import { userReducer } from "@/entities/user/slice/userSlice";
import quizReducer from "@/entities/quiz/slice/quizSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    answer: answerReducer,
    game: gameReducer,
    question: questionReducer,
    quiz: quizReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
