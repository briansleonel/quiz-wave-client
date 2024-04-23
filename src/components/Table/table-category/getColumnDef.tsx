import { ColumnDef } from "@tanstack/react-table";
import { IQuestionCategory } from "../../../types/questionCategory";
import ModalCategory from "../../Modals/ModalCategory";
import ButtonPrimary from "../../Button/ButtonPrimary";
import { Trash3Fill } from "react-bootstrap-icons";
import confirmAlert from "../../../libs/confirmAlert";

export function getColumnDefinitionCategory({
    handleDelete,
    isAdmin,
}: {
    handleDelete: (id: string) => void;
    isAdmin: boolean;
}): Array<ColumnDef<IQuestionCategory>> {
    const columnDefinition: Array<ColumnDef<IQuestionCategory>> = [
        {
            accessorFn: (row) => row.name.toUpperCase(),
            accessorKey: "name",
            header: "Nombre de categoría",
        },
    ];

    const confirmDelete = (id: string) => {
        confirmAlert({
            handler: () => handleDelete(id),
            title: "¿Eliminar categoría?",
        });
    };

    const actionsColumn: ColumnDef<IQuestionCategory> = {
        cell: (row) => {
            const id = row.row.original._id;

            return (
                <div className="flex gap-2 justify-center">
                    <ModalCategory category={row.row.original} edit={true} />
                    <ButtonPrimary
                        className="bg-red-600 hover:bg-red-500"
                        title="Eliminar"
                        onClick={() => confirmDelete(id)}
                    >
                        <Trash3Fill />
                    </ButtonPrimary>
                </div>
            );
        },
        accessorKey: "actions",
        header: "Acciones",
    };

    if (isAdmin) columnDefinition.push(actionsColumn);

    return columnDefinition;
}
