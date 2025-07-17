import { gameReducer } from "@/entities/game/slice/gameSlice";
import { userReducer } from "@/entities/user/slice/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,

    game: gameReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
