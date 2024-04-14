import axios from "axios";
import { loadStateTokenLocalStorage } from "../libs/token.localstorage";

/**
 * Variables de entorno de la aplicación
 */
export const config = {
    URL_API: import.meta.env.VITE_URL_API,
    URL_SOCKET: import.meta.env.VITE_URL_SOCKET,
};

/**
 * Establezco la instancia de axios para poder hacer consultas HTTP
 */
export const __instanceAxios = axios.create({
    baseURL: config.URL_API,
    //withCredentials: true,
});

/**
 * Hago uso de un interceptor para verificar el token almacenado en el cliente cada que se realiza una petición a la APIF
 */
__instanceAxios.interceptors.request.use((axiosConf) => {
    const token = loadStateTokenLocalStorage();

    if (token) {
        axiosConf.headers["Authorization"] = `Bearer ${token}`;
    }

    return axiosConf;
});

/**
 * Endpoints de la API
 */
export enum endpointsAPI {
    USER = "users",
    LOGIN = "login",
    LOGOUT = "logout",
    REGISTER = "register",
    QUESTION = "questions",
    CATEGORY = "categories",
    GAME = "game",
    COLLECTION = "collections",
}
