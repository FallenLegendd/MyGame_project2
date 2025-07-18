import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import {
  setTheme,
  openQuestion,
  finishGame,
} from "@/entities/quiz/slice/quizSlice";
import QuestionModal from "@/entities/quiz/ui/QuestionModal/QuestionModal";
import { useNavigate } from "react-router";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { getAllThunkGame } from "@/entities/game/api/GameApi";
import { getAllThunk } from "@/entities/question/api/questionApi";

export default function QuizPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { answers, modalOpen, currentQuestion } = useAppSelector((s) => s.quiz);
  const {
    games,
    isLoading: gamesLoading,
    error: gamesError,
  } = useAppSelector((s) => s.game);
  const {
    questions,
    isLoading: questionsLoading,
    error: questionsError,
  } = useAppSelector((s) => s.question);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getAllThunkGame());
    dispatch(getAllThunk());
  }, [dispatch]);

  // Собираем уникальные темы и стоимости
  const themes = games || [];
  const scores = [100, 200, 300, 400, 500];

  // Группируем вопросы по теме и стоимости
  const questionsByTheme: Record<number, Record<number, any>> = {};
  if (questions) {
    for (const q of questions) {
      if (!questionsByTheme[q.game_id]) questionsByTheme[q.game_id] = {};
      questionsByTheme[q.game_id][q.score] = q;
    }
  }

  const handleCellClick = (themeId: number, score: number) => {
    const q = questionsByTheme[themeId]?.[score];
    if (q && !answers[q.id]) {
      setSelectedCell(q.id);
      dispatch(openQuestion(q));
    }
  };

  const handleFinish = () => {
    dispatch(finishGame());
    navigate(CLIENT_ROUTES.QUIZ_RESULT);
  };

  // При открытии модалки выделяем ячейку
  useEffect(() => {
    if (!modalOpen) setSelectedCell(null);
  }, [modalOpen]);

  return (
    <div
      className="quiz-page main-page-container"
      style={{ minHeight: "100vh", background: "#000a3a" }}
    >
      <div className="main-content">
        <h1 className="quiz-board-title">Викторина</h1>
        <div className="quiz-board-wrapper">
          {(gamesLoading || questionsLoading) && (
            <div style={{ color: "#ffd966" }}>Загрузка...</div>
          )}
          {gamesError && (
            <div style={{ color: "red" }}>Ошибка: {gamesError}</div>
          )}
          {questionsError && (
            <div style={{ color: "red" }}>Ошибка: {questionsError}</div>
          )}
          {themes.length > 0 && (
            <div className="quiz-board">
              {/* Темы */}
              {themes.map((theme) => (
                <div className="quiz-theme-cell" key={theme.id}>
                  {theme.theme_name}
                </div>
              ))}
              {/* Кнопки */}
              {scores.map((score) =>
                themes.map((theme) => {
                  const q = questionsByTheme[theme.id]?.[score];
                  return (
                    <button
                      key={theme.id + "-" + score}
                      className={
                        "quiz-cell" +
                        (selectedCell === q?.id ? " quiz-cell-selected" : "")
                      }
                      disabled={!q || !!answers[q.id]}
                      onClick={() => handleCellClick(theme.id, score)}
                    >
                      {q ? q.score : ""}
                    </button>
                  );
                })
              )}
            </div>
          )}
          <button
            className="finish-btn start-button"
            style={{ marginTop: 32 }}
            onClick={handleFinish}
          >
            Завершить игру
          </button>
        </div>
        {modalOpen && <QuestionModal />}
      </div>
    </div>
  );
}
