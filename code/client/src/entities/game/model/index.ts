export interface InitialGameType {
  theme_name: string;
  fullGameScore: number;
}

export interface GameType extends InitialGameType {
  id: number;
  user_id: number;
  createdAt: string;
  updatedAt: string;
}

// export type GamesArrayType = Array<GameType>;

// export const initialState: GameStateType = {
//   game: null,
//   isInitialized: false,
//   error: null,
//   isLoading: false,
// };