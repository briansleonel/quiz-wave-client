"use client";

import TableGeneric from "../TableGeneric";

import Pagination from "../Pagination";
import { getColumnDefinition } from "./getColumnDef";
import useDataTable from "../../../hooks/dataTable/useDataTable";
import userService from "../../../services/user.service";
import {
    useChangeVerificationUser,
    useDeleteUserMutation,
} from "../../../hooks/users/useUser";
import AlertDanger from "../../Alerts/Alert";
import Loader from "../../Loader/Loader";

//import "rsuite/dist/rsuite.min.css";

export default function TableUsers() {
    const { data, error, isLoading, pagination, setPagination, isFetching } =
        useDataTable({
            functionFetch: userService.getUsers,
            queryKey: "users",
        });

    const deleteUserMutation = useDeleteUserMutation();
    const changeVerifiedMutation = useChangeVerificationUser();

    const handleDeleteUser = async (userId: string) => {
        await deleteUserMutation.mutateAsync(userId);
    };

    const handleChangeVerificationUser = async (userId: string) => {
        await changeVerifiedMutation.mutateAsync(userId);
    };

    const columnDefinition = getColumnDefinition(
        handleDeleteUser,
        handleChangeVerificationUser
    );

    return (
        <>
            {error && error instanceof Error ? (
                <AlertDanger>Error: {error.message}</AlertDanger>
            ) : isLoading ? (
                <div className="h-36">
                    <Loader style="black" />
                </div>
            ) : data && pagination ? (
                <>
                    {data.data.length > 0 ? (
                        <>
                            {/** Muestro los datos de la tabla */}
                            <TableGeneric
                                columnsDef={columnDefinition}
                                data={data.data}
                            />

                            {/** Muestro la paginación de datos */}
                            <Pagination
                                pagination={pagination}
                                setPagination={setPagination}
                            />
                        </>
                    ) : (
                        <span className="text-neutral-500 uppercase">
                            No se encontraron resultados
                        </span>
                    )}
                </>
            ) : null}
        </>
    );
}
