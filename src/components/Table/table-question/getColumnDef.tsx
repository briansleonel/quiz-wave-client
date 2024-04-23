import { ColumnDef } from "@tanstack/react-table";
import { Check, X } from "react-bootstrap-icons";
import GroupButtonActions from "../GroupButtonActions";
import { IQuestionId } from "../../../types/question";
import ModalShowQuestion from "../../Modals/ModalShowQuestion";
import confirmAlert from "../../../libs/confirmAlert";

export function getColumnDefinitionQuestion({
    handleChangeVerification,
    handleDelete,
    handleEdit,
}: {
    handleDelete: (id: string) => void;
    handleChangeVerification: (id: string) => void;
    handleEdit: (id: string) => void;
}): Array<ColumnDef<IQuestionId>> {
    const confirmDelete = (id: string) => {
        confirmAlert({
            handler: () => handleDelete(id),
            title: "¿Eliminar pregunta?",
        });
    };

    const confirmUpdate = (id: string) => {
        confirmAlert({
            handler: () => handleEdit(id),
            title: "¿Editar pregunta?",
        });
    };

    return [
        {
            cell: (row) => (
                <ModalShowQuestion
                    question={row.row.original}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            ),
            accessorKey: "show",
            header: "",
        },
        {
            accessorFn: (row) => row.question,
            accessorKey: "question",
            header: "Pregunta",
        },
        {
            accessorFn: (row) =>
                row.category
                    ? row.category.name.toUpperCase()
                    : "Debe seleccionar una",
            accessorKey: "category.name",
            header: "Categoría",
        },
        {
            cell: (row) => (
                <span className="w-full h-full flex justify-center">
                    {row.getValue() ? (
                        <Check className="text-green-500 w-6 h-6" />
                    ) : (
                        <X className="text-red-500 w-6 h-6" />
                    )}
                </span>
            ),
            accessorKey: "verified",
            header: "Verificado",
        },

        {
            cell: (row) => {
                const verified = row.row.original.verified!;
                const id = row.row.original._id;

                return (
                    <GroupButtonActions
                        handleChangeVerification={() =>
                            handleChangeVerification(id)
                        }
                        handleDelete={() => confirmDelete(id)}
                        handleEdit={() => confirmUpdate(id)}
                        id={id}
                        verified={verified}
                    />
                );
            },
            accessorKey: "actions",
            header: "Acciones",
        },
    ];
}
