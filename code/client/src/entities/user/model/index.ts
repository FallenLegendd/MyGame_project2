export type UserSignUpDataType = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export type UserSignInDataType = {
  email: string;
  password: string;
};

export type UserType = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type UserResponseType = {
  accessToken: string;
  user: UserType;
};

export type ValidatorResponseType = {
  isValid: boolean;
  error: string | null;
};

export type UserStateType = {
  user: UserType | null;
  isInitialized: boolean;
  error: string | null;
  isLoading: boolean;
};

export const initialState: UserStateType = {
  user: null,
  isInitialized: false,
  error: null,
  isLoading: false,
};
