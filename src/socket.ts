import { Socket, io } from "socket.io-client";
import { config } from "./config/config";
import { ClientEvents, ServerEvents } from "./types/quiz/events.socket";

// "undefined" means the URL will be computed from the `window.location` object
const URL = config.URL_SOCKET;

export const socket: Socket<ServerEvents, ClientEvents> = io(URL, {
    autoConnect: false,
});

//{autoConnect: false}
