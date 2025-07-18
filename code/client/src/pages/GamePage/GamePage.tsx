import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { getAllThunk as getAllQuestions } from "@/entities/question/api/questionApi";
import { getAllThunkGame as getAllGames } from "@/entities/game/api/GameApi";
import type { QuestionType } from "@/entities/question/model";
import { getAllForQuestion } from "@/entities/answer/api/AnswerApi";

export default function GamePage() {
  const dispatch = useAppDispatch();
  const { games, isLoading: gamesLoading } = useAppSelector(
    (state) => state.game
  );
  const { questions, isLoading: questionsLoading } = useAppSelector(
    (state) => state.question
  );
  const { answers, isLoading: answersLoading } = useAppSelector(
    (state) => state.answer
  );
  const [selected, setSelected] = useState<{
    gameId: number;
    score: number;
  } | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(
    null
  );

  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getAllQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (selected) {
      const question = questionsByGame[selected.gameId]?.[selected.score];
      if (question) {
        setCurrentQuestionId(question.id);
        dispatch(getAllForQuestion(question.id));
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }
  }, [selected, dispatch]);

  const questionsByGame: Record<
    number,
    Record<number, QuestionType>
  > = React.useMemo(() => {
    const map: Record<number, Record<number, QuestionType>> = {};
    if (questions) {
      questions.forEach((q) => {
        if (!map[q.game_id]) map[q.game_id] = {};
        map[q.game_id][q.score] = q;
      });
    }
    return map;
  }, [questions]);

  const allScores = React.useMemo(() => {
    if (!questions) return [];
    const set = new Set<number>();
    questions.forEach((q) => set.add(q.score));
    return Array.from(set).sort((a, b) => a - b);
  }, [questions]);

  const handleAnswerSelect = (answerId: number, isCorrect: boolean) => {
    setSelectedAnswer(answerId);
    setShowResult(true);

    if (isCorrect) {
      setUserScore((prev) => prev + (selected?.score || 0));
    }
  };

  const handleNextQuestion = () => {
    setSelected(null);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (gamesLoading || questionsLoading) return <div>Загрузка...</div>;
  if (!games || !questions) return <div>Нет данных для игры</div>;

  return (
    <div className="game-container">
      <div className="score-display">
        Ваш счёт: <span className="score-value">{userScore}</span>
      </div>
      <table className="game-table">
        <thead>
          <tr>
            <th className="table-header">Темы / Стоимость</th>
            {allScores.map((score) => (
              <th key={score} className="score-header">
                {score}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td className="theme-cell">{game.theme_name}</td>
              {allScores.map((score) => {
                const q = questionsByGame[game.id]?.[score];
                return (
                  <td key={game.id + "-" + score} className="question-cell">
                    {q ? (
                      <button
                        className="question-button"
                        onClick={() => setSelected({ gameId: game.id, score })}
                        disabled={
                          selected?.gameId === game.id &&
                          selected?.score === score
                        }
                      >
                        {score}
                      </button>
                    ) : (
                      <div className="empty-cell"></div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className="question-modal">
          <div className="modal-content">
            <h2>{games.find((g) => g.id === selected.gameId)?.theme_name}</h2>
            <p className="question-score">{selected.score} очков</p>
            <p className="question-text">
              {questionsByGame[selected.gameId]?.[selected.score]?.question ||
                "Вопрос не найден"}
            </p>

            {answersLoading ? (
              <div>Загрузка ответов...</div>
            ) : (
              <div className="answers-container">
                {answers?.map((answer) => (
                  <button
                    key={answer.id}
                    className={`answer-button 
                      ${selectedAnswer === answer.id ? "selected" : ""}
                      ${showResult && answer.correct_answer ? "correct" : ""}
                      ${
                        showResult &&
                        selectedAnswer === answer.id &&
                        !answer.correct_answer
                          ? "incorrect"
                          : ""
                      }
                    `}
                    onClick={() =>
                      !showResult &&
                      handleAnswerSelect(answer.id, answer.correct_answer)
                    }
                    disabled={showResult}
                  >
                    {answer.answer}
                    {showResult && answer.correct_answer && (
                      <span className="correct-indicator">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {showResult && (
              <div className="result-feedback">
                {selectedAnswer &&
                answers?.find((a) => a.id === selectedAnswer)
                  ?.correct_answer ? (
                  <p className="correct-feedback">
                    Правильно! +{selected.score} очков
                  </p>
                ) : (
                  <p className="incorrect-feedback">Неправильно!</p>
                )}
              </div>
            )}

            <div className="modal-actions">
              {showResult ? (
                <button className="next-button" onClick={handleNextQuestion}>
                  Следующий вопрос
                </button>
              ) : (
                <button
                  className="close-button"
                  onClick={() => setSelected(null)}
                >
                  Закрыть
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
