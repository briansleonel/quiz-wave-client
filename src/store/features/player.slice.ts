import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Player } from "../../types/quiz/player";
import { ICollectionQuestion } from "../../types/question";

interface State extends Player {
    code?: number;
    currentQuestion?: ICollectionQuestion;
    hasNext: boolean;
}

const initialState: State = {
    socketId: "",
    name: "",
    answers: [],
    score: 0,
    hasNext: false,
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
        playerSetCurrentQuestion: function (
            state,
            action: PayloadAction<{
                question: ICollectionQuestion;
                hasNext: boolean;
            }>
        ) {
            state.currentQuestion = action.payload.question;
            state.hasNext = action.payload.hasNext;
        },
        playerUpdateScore: function (state, action: PayloadAction<number>) {
            state.score = action.payload;
        },
    },
});

export const {
    playerSetCode,
    playerSetNameAndSocketId,
    playerSetCurrentQuestion,
    playerUpdateScore,
} = playerSlice.actions;

export default playerSlice.reducer;
