import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StateFilter } from "../../types/filters";
import { Verified } from "./filters.slice";
import { loadStateAuthLocalStorage } from "../../libs/state.localstorage";

interface State extends StateFilter {
    category: string;
    user: string;
    recents: boolean;
}

const initialState: State = {
    category: "all",
    recents: true,
    searchText: "",
    user: loadStateAuthLocalStorage()?._id || "",
    verified: Verified.ALL,
};

const questionFilterSlice = createSlice({
    initialState,
    name: "questionFilters",
    reducers: {
        changeQuestionSearchText: function (
            state,
            action: PayloadAction<{ searchText: string }>
        ) {
            state.searchText = action.payload.searchText;
        },
        changeQuestionFilterVerified: function (
            state,
            action: PayloadAction<{ verified: string }>
        ) {
            state.verified = action.payload.verified;
        },
        changeQuestionFilterRecent: function (
            state,
            action: PayloadAction<{ recents: boolean }>
        ) {
            state.recents = action.payload.recents;
        },
        changeQuestionFilterUser: function (
            state,
            action: PayloadAction<{ user: string }>
        ) {
            state.user = action.payload.user;
        },
        changeQuestionFilterCategory: function (
            state,
            action: PayloadAction<{ category: string }>
        ) {
            state.category = action.payload.category;
        },
        resetQuestionFilters: (state) => {
            state.category = "all";
            state.recents = true;
            state.user = loadStateAuthLocalStorage()?._id || "";
            state.verified = Verified.ALL;
        },
    },
});

export const {
    changeQuestionFilterCategory,
    changeQuestionFilterRecent,
    changeQuestionFilterUser,
    changeQuestionFilterVerified,
    changeQuestionSearchText,
    resetQuestionFilters,
} = questionFilterSlice.actions;

export default questionFilterSlice.reducer;
