import { isAxiosError } from "axios";
import { __instanceAxios, endpointsAPI } from "../config/config";
import { APIResponse, PaginationFetch } from "../types/api";
import { ICollectionWithUpdatedAt } from "../types/collection";

export interface QueryFetchCollection extends PaginationFetch {}

/**
 * Permite envíar una petición GET a "/api/collection/" para devolver todas las collections almacenadas en la API, con paginación de datos
 *
 * @returns todas las categorias
 */
async function getCollectionsPagination({ limit, page }: QueryFetchCollection) {
    const paginationData = `?page=${page}&limit=${limit}`;

    try {
        const response = await __instanceAxios.get(
            endpointsAPI.COLLECTION + paginationData
        );

        return response.data as APIResponse<Array<ICollectionWithUpdatedAt>>;
    } catch (error) {
        // Si el error es una instancia de AxiosError, puedes acceder a la propiedad response
        if (isAxiosError(error)) {
            //Si la respuesta tiene un código de estado, significa que la API respondió con un error HTTP
            if (error.response) {
                // Lanza una excepción con el mensaje de error recibido de la API
                throw new Error(error.response.data.message);
            }
        }
        if (error instanceof Error) throw new Error(error.message);
    }
}

/**
 * Permite enviar una petición GET a '/api/collection/:id' y devolver una determinada collection, de acuerdo a su ID
 * @param id idetntificador de collection
 * @returns
 */
async function getCollection(id: string) {
    try {
        const response = await __instanceAxios.get(
            `${endpointsAPI.COLLECTION}/${id}`
        );

        return response.data as APIResponse<ICollectionWithUpdatedAt>;
    } catch (error) {
        // Si el error es una instancia de AxiosError, puedes acceder a la propiedad response
        if (isAxiosError(error)) {
            //Si la respuesta tiene un código de estado, significa que la API respondió con un error HTTP
            if (error.response) {
                // Lanza una excepción con el mensaje de error recibido de la API
                throw new Error(error.response.data.message);
            } else {
                throw new Error(error.message);
            }
        } else {
            // Si no hay respuesta o no se pudo conectar con la API, lanza una excepción genérica
            throw new Error("Error sin procesar");
        }
    }
}

const collectionService = {
    getCollectionsPagination,
    getCollection,
};

export default collectionService;
