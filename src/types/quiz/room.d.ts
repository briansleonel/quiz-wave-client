import { Player } from "./player";

export interface Room {
    socketId: string;
    code: number;
    players: Array<Player>;
    status: StatusRoom;
    currentQuestion: number;
}
