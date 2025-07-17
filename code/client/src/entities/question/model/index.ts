export interface InitialQuestionType {
  question: string;
  score: number;
}

export interface QuestionType extends InitialQuestionType {
  id: number;
  game_id: number;
  createdAt: string;
  updatedAt: string;
  answers?: AnswerType[];
}

export type QuestionArrayType = Array<QuestionType>;

export type QuestionStateType = {
  questions: QuestionArrayType | null;
  question: QuestionType | null;
  lastAnswerCorrect: boolean | null;
  error: string | null;
  isLoading: boolean;
};

export type CheckAnswerResponse = {
  isCorrect: boolean;
  correctAnswer?: string;
};

export const initialState: QuestionStateType = {
  questions: null,
  question: null,
  lastAnswerCorrect: null,
  error: null,
  isLoading: false,
};
