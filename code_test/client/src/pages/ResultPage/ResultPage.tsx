import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { resetQuiz } from "@/entities/quiz/slice/quizSlice";
import { useNavigate } from "react-router";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { getAllThunk } from "@/entities/question/api/questionApi";
import "./ResultPage.css";

export default function ResultPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { score, answers } = useAppSelector((s) => s.quiz);
  const { questions } = useAppSelector((s) => s.question);
  const correctCount = Object.values(answers).filter(Boolean).length;
  const total = questions ? questions.length : 0;

  useEffect(() => {
    if (!questions || questions.length === 0) {
      dispatch(getAllThunk());
    }
  }, [dispatch, questions]);

  // История всех игр из localStorage
  const [history, setHistory] = useState<{ score: number; date: string }[]>(
    () => {
      try {
        return JSON.parse(localStorage.getItem("quizResults") || "[]");
      } catch {
        return [];
      }
    }
  );

  const handleRestart = () => {
    dispatch(resetQuiz());
    navigate(CLIENT_ROUTES.QUIZ);
  };

  return (
    <div className="result-page">
      <div className="result-container">
        <h1 className="result-title">Результаты игры</h1>

        <div className="result-card">
          <div className="result-score">
            <span className="result-label">Ваши очки:</span>
            <span className="result-value">{score}</span>
          </div>
          <div className="result-correct">
            <span className="result-label">Правильных ответов:</span>
            <span className="result-value">
              {correctCount} из {total}
            </span>
          </div>
        </div>

        <div className="history-section">
          <h2 className="history-title">История всех игр:</h2>
          {history.length === 0 ? (
            <div className="history-empty">Нет сохранённых результатов.</div>
          ) : (
            <ul className="history-list">
              {history
                .slice()
                .reverse()
                .map((item, idx) => (
                  <li key={idx} className="history-item">
                    <span className="history-date">
                      {new Date(item.date).toLocaleString()}
                    </span>
                    <span className="history-score">{item.score} очков</span>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <button className="restart-button" onClick={handleRestart}>
          Начать заново
        </button>
      </div>
    </div>
  );
}
