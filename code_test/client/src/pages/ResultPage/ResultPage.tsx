import React from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { resetQuiz } from "@/entities/quiz/slice/quizSlice";
import { useNavigate } from "react-router";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";

export default function ResultPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { score, answers } = useAppSelector((s) => s.quiz);
  const { questions } = useAppSelector((s) => s.question);
  const correctCount = Object.values(answers).filter(Boolean).length;
  const total = questions ? questions.length : 0;

  const handleRestart = () => {
    dispatch(resetQuiz());
    navigate(CLIENT_ROUTES.QUIZ);
  };

  return (
    <div className="result-page main-page-container">
      <div className="main-content quiz-content">
        <h1 className="main-title">Результаты игры</h1>
        <div className="result-info">
          <div className="result-score">
            Ваши очки: <b>{score}</b>
          </div>
          <div className="result-correct">
            Правильных ответов: <b>{correctCount}</b> из {total}
          </div>
        </div>
        <button className="start-button" onClick={handleRestart}>
          Начать заново
        </button>
      </div>
    </div>
  );
}
