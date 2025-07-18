import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { closeModal, answerQuestion } from "@/entities/quiz/slice/quizSlice";
import { getAllForQuestion } from "@/entities/answer/api/AnswerApi";
import { checkCorrectThunk } from "@/entities/question/api/questionApi";

export default function QuestionModal() {
  const dispatch = useAppDispatch();
  const { currentQuestion } = useAppSelector((s) => s.quiz);
  const [answers, setAnswers] = useState<any[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [timer, setTimer] = useState(20);
  const [loading, setLoading] = useState(true);
  const [questionText, setQuestionText] = useState<string>("");

  useEffect(() => {
    if (currentQuestion) {
      setTimer(20);
      setSelected(null);
      setLoading(true);
      setQuestionText(currentQuestion.question || "");
      dispatch(getAllForQuestion(currentQuestion.id)).then((res: any) => {
        setAnswers(res.payload || []);
        setLoading(false);
      });
    }
  }, [currentQuestion, dispatch]);

  useEffect(() => {
    if (timer === 0) {
      handleAnswer(null);
      return;
    }
    if (selected !== null) return;
    const t = setTimeout(() => setTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, selected]);

  if (!currentQuestion) return null;

  const handleAnswer = (idx: number | null) => {
    if (selected !== null) return;
    setSelected(idx);
    const answerText = idx !== null && answers[idx] ? answers[idx].answer : "";
    dispatch(
      checkCorrectThunk({ id: currentQuestion.id, answer: answerText })
    ).then((res: any) => {
      dispatch(
        answerQuestion({
          questionId: currentQuestion.id,
          isCorrect: res.payload === true,
          value: currentQuestion.score,
        })
      );
      setTimeout(() => dispatch(closeModal()), 500);
    });
  };

  return (
    <div className="modal-overlay quiz-modal-overlay">
      <div className="modal quiz-modal">
        <h2 className="quiz-modal-title">
          Вопрос на {currentQuestion.score} баллов
        </h2>
        <div className="quiz-modal-question">{questionText}</div>
        {loading ? (
          <div className="quiz-modal-loading">Загрузка вариантов...</div>
        ) : (
          <div className="options quiz-modal-options">
            {answers.map((opt, idx) => (
              <button
                key={opt.id}
                className={
                  selected === idx
                    ? "selected quiz-modal-btn"
                    : "quiz-modal-btn"
                }
                onClick={() => handleAnswer(idx)}
                disabled={selected !== null}
              >
                {opt.answer}
              </button>
            ))}
          </div>
        )}
        <div className="timer quiz-modal-timer">
          Осталось времени: {timer} сек
        </div>
      </div>
    </div>
  );
}
