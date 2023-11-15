import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Player } from "../../types/quiz/player";

interface State extends Player {
    code?: number;
}

const initialState: State = {
    socketId: "",
    name: "",
    answers: [],
    score: 0,
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        playerSetCode: function (state, action: PayloadAction<number>) {
            state.code = action.payload;
        },
        playerSetName: function (state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
    },
});

export const { playerSetCode, playerSetName } = playerSlice.actions;

export default playerSlice.reducer;
