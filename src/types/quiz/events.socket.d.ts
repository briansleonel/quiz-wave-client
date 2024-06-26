import { ICollectionQuestion } from "../question";
import { Player } from "./player";

export interface InterServerEvents {}

export interface SocketData {
    code: number;
    role: "moderator" | "player";
}

export interface ServerEvents {
    response: (message: string) => void;
    "room:created": (
        code: number,
        socketId: string,
        questions: Array<ICollectionQuestion>
    ) => void;
    "room:join-player": (player: Player) => void;
    "room:error": (message: string) => void;
    "room:room-exists": (exists: boolean) => void;
    "room:player-disconnected": (player: Player) => void;
    "room:closed-room": () => void;
    "player:joined-room": (player: Player) => void;
    "quiz:started": () => void;
    "quiz:show-question": (question: string) => void;
    "quiz:show-options": (options: Array<string>) => void;
    "quiz:countdown": (count: number) => void;
    "quiz:countdown-stopped": () => void;
    "quiz:ranking-moderator": (players: Array<Player>) => void;
    "quiz:ranking-player": (player: Player) => void;
    "quiz:next-question": (hasNext: boolean, currentQuestion: number) => void;
    "quiz:next-question-player": () => void;
    "quiz:all-players-responded": () => void;
}

export interface ClientEvents {
    hello: () => void;
    "room:create": (id: string) => void;
    "room:check-exists": (code: number) => void;
    "room:close-room": (code: number) => void;
    "player:join-room": (code: number, playername: string) => void;
    "quiz:start": () => void;
    "quiz:show-question": () => void;
    "quiz:show-options": () => void;
    "quiz:countdown": (count: number) => void;
    "quiz:stop-countdown": () => void;
    "quiz-player:send-answer": (index: number, countown: number) => void;
    "quiz:get-ranking-moderator": () => void;
    "quiz:show-ranking-player": () => void;
    "quiz:next-question": () => void;
}
