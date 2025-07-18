export type AnswerType = {
    id: number;
    answer: string;
    question_id: number;
    correct_answer: boolean;
    createdAt: string;
    updatedAt: string;
}

export type AnswerArrayType = Array<AnswerType>

export type AnswerStateType = {
    answers: AnswerArrayType | null;
    answer: AnswerType | null;
    correctAnswer: boolean | null;
    error: string | null;
    isLoading: boolean;
}

export const initialState: AnswerStateType = {
    answers: null,
    answer: null,
    correctAnswer: null,
    error: null,
    isLoading: false,
}