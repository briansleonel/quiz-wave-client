import { useDataTableCategory } from "../../../hooks/dataTable/useDataTable";
import { useDeleteCategoryMutation } from "../../../hooks/questions/useQuestionCategory";
import { Role } from "../../../libs/enums/role.enum";
import { useAppSelector } from "../../../store/hooks.redux";
import AlertDanger from "../../Alerts/Alert";
import Loader from "../../Loader/Loader";
import Pagination from "../Pagination";
import TableGeneric from "../TableGeneric";
import { getColumnDefinitionCategory } from "./getColumnDef";

export default function TableQuestionCategory() {
    const { data, error, isLoading, pagination, setPagination } =
        useDataTableCategory();

    const { user } = useAppSelector((state) => state.auth);

    const deleteCategoryMutation = useDeleteCategoryMutation();

    async function handleDelete(id: string) {
        await deleteCategoryMutation.mutateAsync(id);
    }

    const columnDefinition = getColumnDefinitionCategory({
        handleDelete,
        isAdmin: user.role === Role.ADMIN,
    });
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
