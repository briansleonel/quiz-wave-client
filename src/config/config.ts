import axios from "axios";
import { loadStateTokenLocalStorage } from "../libs/token.localstorage";

/**
 * Variables de entorno de la aplicación
 */
export const config = {
    URL_API: import.meta.env.URL_API || "http://localhost:3001/api/",
    URL_SOCKET: import.meta.env.URL_SOCKET || "http://localhost:3002",
};

/**
 * Establezco la instancia de axios para poder hacer consultas HTTP
 */
export const __instanceAxios = axios.create({
    baseURL: config.URL_API,
    headers: {
        Authorization: `Bearer ${loadStateTokenLocalStorage() ?? ""}`,
    },
    //withCredentials: true,
});

/**
 * Endpoints de la API
 */
export enum endpointsAPI {
    USER = "user",
    LOGIN = "login",
    LOGOUT = "logout",
    REGISTER = "register",
    QUESTION = "question",
    CATEGORY = "category",
    GAME = "game",
    COLLECTION = "collection",
}
