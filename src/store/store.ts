import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import filtersSlice from "./features/filters.slice";
import questionFilterSlice from "./features/filters.question.slice";
import gameSlice from "./features/gameSlice";
import collectionFilterSlice from "./features/filters.collection.slice";
import playerSlice from "./features/player.slice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        fitlers: filtersSlice,
        questionFilters: questionFilterSlice,
        game: gameSlice,
        collectionFilters: collectionFilterSlice,
        player: playerSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
