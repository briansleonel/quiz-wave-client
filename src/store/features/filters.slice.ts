import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Verified } from "../../libs/enums/filter.enum";

interface State {
    verified: Verified;
    searchText: string;
}

const initialState: State = {
    searchText: "",
    verified: Verified.ALL,
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        changeSearchText: function (
            state,
            action: PayloadAction<{ searchText: string }>
        ) {
            state.searchText = action.payload.searchText;
        },
        changeFilterVerified: function (
            state,
            action: PayloadAction<{ verified: Verified }>
        ) {
            state.verified = action.payload.verified;
        },
    },
});

export const { changeFilterVerified, changeSearchText } = filtersSlice.actions;

export default filtersSlice.reducer;
