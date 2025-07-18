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
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

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
      console.log(
        "Ответ сервера:",
        res.payload,
        "Отправленный ответ:",
        answerText
      );
      const correct =
        res.payload?.isCorrect === true || res.payload?.isCorrect === "true";
      setIsCorrect(correct);
      setShowResult(true);
      dispatch(
        answerQuestion({
          questionId: currentQuestion.id,
          isCorrect: correct,
          value: currentQuestion.score,
        })
      );
      setTimeout(() => {
        setShowResult(false);
        dispatch(closeModal());
      }, 800);
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
            {answers.map((opt, idx) => {
              let btnClass = "quiz-modal-btn";
              if (selected !== null) {
                if (opt.correct_answer) {
                  btnClass += " correct";
                }
                if (selected === idx) {
                  btnClass += opt.correct_answer
                    ? " selected"
                    : " incorrect selected";
                }
              }
              return (
                <button
                  key={opt.id}
                  className={btnClass}
                  onClick={() => handleAnswer(idx)}
                  disabled={selected !== null}
                >
                  {opt.answer}
                </button>
              );
            })}
          </div>
        )}
        {showResult && selected !== null && isCorrect !== null && (
          <div
            style={{
              marginTop: 8,
              fontWeight: 600,
              fontSize: "1.1rem",
              color: isCorrect ? "#00c853" : "#ff1744",
            }}
          >
            {isCorrect === true ? "Правильно!" : "Неправильно!"}
          </div>
        )}
        <div className="timer quiz-modal-timer">
          Осталось времени: {timer} сек
        </div>
      </div>
    </div>
  );
}
