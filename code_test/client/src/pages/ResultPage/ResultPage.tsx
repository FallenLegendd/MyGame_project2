import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { resetQuiz } from "@/entities/quiz/slice/quizSlice";
import { useNavigate } from "react-router";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { getAllThunk } from "@/entities/question/api/questionApi";

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
        <div style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: 8 }}>
            История всех игр:
          </h2>
          {history.length === 0 ? (
            <div>Нет сохранённых результатов.</div>
          ) : (
            <ul style={{ textAlign: "left", maxWidth: 400, margin: "0 auto" }}>
              {history
                .slice()
                .reverse()
                .map((item, idx) => (
                  <li key={idx} style={{ marginBottom: 6 }}>
                    <b>{new Date(item.date).toLocaleString()}</b>: {item.score}{" "}
                    очков
                  </li>
                ))}
            </ul>
          )}
        </div>
        <button className="start-button" onClick={handleRestart}>
          Начать заново
        </button>
      </div>
    </div>
  );
}
