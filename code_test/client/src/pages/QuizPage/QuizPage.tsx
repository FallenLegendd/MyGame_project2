import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { openQuestion, finishGame } from "@/entities/quiz/slice/quizSlice";
import QuestionModal from "@/entities/quiz/ui/QuestionModal/QuestionModal";
import { useNavigate } from "react-router";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { getAllThunkGame } from "@/entities/game/api/GameApi";
import { getAllThunk } from "@/entities/question/api/questionApi";
import "./QuizPage.css";

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

  const themes = games || [];
  const scores = [100, 200, 300, 400, 500];

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

  useEffect(() => {
    if (!modalOpen) setSelectedCell(null);
  }, [modalOpen]);

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <h1 className="quiz-title">Викторина</h1>

        <div className="quiz-board-wrapper">
          {(gamesLoading || questionsLoading) && (
            <div className="quiz-loading">Загрузка...</div>
          )}

          {gamesError && <div className="quiz-error">Ошибка: {gamesError}</div>}

          {questionsError && (
            <div className="quiz-error">Ошибка: {questionsError}</div>
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
                  const isAnswered = q && answers[q.id] !== undefined;
                  return (
                    <button
                      key={`${theme.id}-${score}`}
                      className={`quiz-cell ${
                        selectedCell === q?.id ? "quiz-cell-selected" : ""
                      } ${isAnswered ? "quiz-cell-answered" : ""}`}
                      disabled={!q || isAnswered}
                      onClick={() => handleCellClick(theme.id, score)}
                    >
                      {q && !isAnswered ? q.score : isAnswered ? "✓" : ""}
                    </button>
                  );
                })
              )}
            </div>
          )}

          <button className="quiz-finish-button" onClick={handleFinish}>
            Завершить игру
          </button>
        </div>

        {modalOpen && <QuestionModal />}
      </div>
    </div>
  );
}
