import { isAxiosError } from "axios";
import { __instanceAxios, endpointsAPI } from "../config/config";
import { APIResponse, PaginationFetch } from "../types/api";
import {
    ICollection,
    ICollectionWithId,
    ICollectionWithUpdatedAt,
} from "../types/collection";
import { getQueryCollection } from "../libs/query.collection";

export interface QueryFetchCollection extends PaginationFetch {
    searchText?: string;
    user?: string;
    recents?: boolean;
}

/**
 * Permite envíar una petición GET a "/api/collection/" para devolver todas las collections almacenadas en la API, con paginación de datos
 *
 * @returns todas las categorias
 */
async function getCollectionsPagination({
    limit,
    page,
    recents,
    searchText,
    user,
}: QueryFetchCollection) {
    const paginationData = `?page=${page}&limit=${limit}`;

    const queryData = getQueryCollection({
        searchText,
        recents,
        user,
    });

    try {
        const response = await __instanceAxios.get(
            endpointsAPI.COLLECTION + paginationData + queryData
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

async function addCollection(collection: ICollection) {
    try {
        const response = await __instanceAxios.post(
            `${endpointsAPI.COLLECTION}`,
            collection
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

async function updateCollection(collection: ICollectionWithId) {
    try {
        const response = await __instanceAxios.put(
            `${endpointsAPI.COLLECTION}/${collection._id}`,
            collection
        );
        return response.data as APIResponse<ICollectionWithId>;
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

async function deleteCollection(id: string) {
    try {
        const response = await __instanceAxios.delete(
            `${endpointsAPI.COLLECTION}/${id}`
        );
        return response.data;
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
    addCollection,
    updateCollection,
    deleteCollection,
};

export default collectionService;
