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
        playerSetNameAndSocketId: function (
            state,
            action: PayloadAction<{ name: string; socketId: string }>
        ) {
            state.name = action.payload.name;
            state.socketId = action.payload.socketId;
        },
    },
});

export const { playerSetCode, playerSetNameAndSocketId } = playerSlice.actions;

export default playerSlice.reducer;
