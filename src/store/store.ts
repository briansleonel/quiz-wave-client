import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import filtersSlice from "./features/filters.slice";
import questionFilterSlice from "./features/filters.question.slice";
import gameSlice from "./features/gameSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        fitlers: filtersSlice,
        questionFilters: questionFilterSlice,
        game: gameSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
