import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadStateAuthLocalStorage } from "../../libs/state.localstorage";

interface State {
    searchText: string;
    user: string;
    recents: boolean;
}

const initialState: State = {
    searchText: "",
    recents: true,
    user: loadStateAuthLocalStorage()?._id || "",
};

const collectionFilterSlice = createSlice({
    initialState,
    name: "collectionFilter",
    reducers: {
        changeCollectionSearchText: function (
            state,
            action: PayloadAction<{ searchText: string }>
        ) {
            state.searchText = action.payload.searchText;
        },
        changeCollectionFilterRecent: function (
            state,
            action: PayloadAction<{ recents: boolean }>
        ) {
            state.recents = action.payload.recents;
        },
        changeCollectionFilterUser: function (
            state,
            action: PayloadAction<{ user: string }>
        ) {
            state.user = action.payload.user;
        },
        resetCollectionFilters: (state) => {
            state.recents = true;
            state.user = loadStateAuthLocalStorage()?._id || "";
        },
    },
});

export const {
    resetCollectionFilters,
    changeCollectionFilterRecent,
    changeCollectionFilterUser,
    changeCollectionSearchText,
} = collectionFilterSlice.actions;

export default collectionFilterSlice.reducer;
