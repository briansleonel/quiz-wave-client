import { isAxiosError } from "axios";
import { __instanceAxios, endpointsAPI } from "../config/config";
import { APIResponse, PaginationFetch } from "../types/api";
import { ICollection, ICollectionWithUpdatedAt } from "../types/collection";

export interface QueryFetchCollection extends PaginationFetch {}

/**
 * Permite envíar una petición GET a "/api/category/all" para devolver todas las categorías almacenadas en la API, sin paginación de datos
 *
 * @returns todas las categorias
 */
async function getCollectionsPagination({ limit, page }: QueryFetchCollection) {
    const paginationData = `?page=${page}&limit=${limit}`;

    try {
        const response = await __instanceAxios.get(
            endpointsAPI.COLLECTION + paginationData
        );
        console.log(response.data);

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

const collectionService = {
    getCollectionsPagination,
};

export default collectionService;
