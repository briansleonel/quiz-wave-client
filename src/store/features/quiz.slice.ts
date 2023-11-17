import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICollectionQuestion } from "../../types/question";
import { Player } from "../../types/quiz/player";
import { StatusRoom } from "../../types/quiz/status-room";

interface State {
    code?: number;
    socketId?: string;
    players: Array<Player>;
    status: StatusRoom;
    currentQuestion: number;
    questions: Array<ICollectionQuestion>;
    hasNext: boolean;
}

const initialState: State = {
    status: "finished",
    hasNext: false,
    currentQuestion: -1,
    players: [],
    questions: [],
};

const quizWaveSlice = createSlice({
    name: "quiz-wave",
    initialState,
    reducers: {
        quizSetInitial: function (
            state,
            action: PayloadAction<{ code: number; socketId: string }>
        ) {
            state.code = action.payload.code;
            state.socketId = action.payload.socketId;
            state.status = "waiting";
        },
        quizSetQuestions: function (state, action) {},
        quizAddPlayer: function (state, action) {},
        quizDeletePlayer: function (state, action) {},
    },
});

export const {
    quizSetInitial,
    quizAddPlayer,
    quizDeletePlayer,
    quizSetQuestions,
} = quizWaveSlice.actions;

export default quizWaveSlice.reducer;
