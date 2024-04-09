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
        quizSetQuestions: function (
            state,
            action: PayloadAction<Array<ICollectionQuestion>>
        ) {
            state.questions = action.payload;
        },
        quizJoinPlayer: function (state, action: PayloadAction<Player>) {
            state.players.push(action.payload);
        },
        quizDeletePlayer: function (state, action: PayloadAction<string>) {
            const updatedPlayers = state.players.filter(
                (p) => p.socketId !== action.payload
            );

            state.players = updatedPlayers;
        },
        quizChangeStatus: function (state, action: PayloadAction<StatusRoom>) {
            state.status = action.payload;
        },
        quizSetCurrentQuestion: function (state) {
            state.currentQuestion += 1;
            state.hasNext = state.currentQuestion + 1 < state.questions.length;
        },
        quizNextQuestion: function (
            state,
            action: PayloadAction<{ hasNext: boolean; currentQuestion: number }>
        ) {
            state.currentQuestion = action.payload.currentQuestion;
            state.hasNext = action.payload.hasNext;
        },
        quizClear: function (state) {
            state.code = undefined;
            state.socketId = undefined;
            state.players = [];
            state.questions = [];
            state.status = "finished";
            state.hasNext = false;
            state.currentQuestion = -1;
        },
    },
});

export const {
    quizSetInitial,
    quizJoinPlayer,
    quizDeletePlayer,
    quizSetQuestions,
    quizChangeStatus,
    quizSetCurrentQuestion,
    quizNextQuestion,
    quizClear,
} = quizWaveSlice.actions;

export default quizWaveSlice.reducer;
