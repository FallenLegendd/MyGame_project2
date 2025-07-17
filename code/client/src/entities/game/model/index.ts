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

export type GamesArrayType = Array<GameType>;

export type GameStateType = {
  games: GamesArrayType | null;
  game: GameType | null;
  error: string | null;
  isLoading: boolean;
};

export const initialState: GameStateType = {
  games: null,
  game: null,
  error: null,
  isLoading: false,
};