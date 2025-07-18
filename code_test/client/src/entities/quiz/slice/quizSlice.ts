import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: null,
  answers: {},
  score: 0,
  finished: false,
  currentQuestion: null,
  modalOpen: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
      state.answers = {};
      state.score = 0;
      state.finished = false;
      state.currentQuestion = null;
      state.modalOpen = false;
    },
    openQuestion(state, action) {
      state.currentQuestion = action.payload;
      state.modalOpen = true;
    },
    closeModal(state) {
      state.modalOpen = false;
      state.currentQuestion = null;
    },
    answerQuestion(state, action) {
      const { questionId, isCorrect, value } = action.payload;
      state.answers[questionId] = isCorrect;
      if (isCorrect) state.score += value;
    },
    finishGame(state) {
      state.finished = true;
      state.modalOpen = false;
      state.currentQuestion = null;
      // Сохраняем результат в localStorage
      const results = JSON.parse(localStorage.getItem("quizResults") || "[]");
      results.push({ score: state.score, date: new Date().toISOString() });
      localStorage.setItem("quizResults", JSON.stringify(results));
    },
    resetQuiz(state) {
      state.theme = null;
      state.answers = {};
      state.score = 0;
      state.finished = false;
      state.currentQuestion = null;
      state.modalOpen = false;
    },
  },
});

export default quizSlice.reducer;
export const {
  setTheme,
  openQuestion,
  closeModal,
  answerQuestion,
  finishGame,
  resetQuiz,
} = quizSlice.actions;
