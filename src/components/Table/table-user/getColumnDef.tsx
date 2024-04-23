import { ColumnDef } from "@tanstack/react-table";
import { Check, X } from "react-bootstrap-icons";
import GroupButtonActions from "../GroupButtonActions";
import { IUser } from "../../../types/user";
import confirmAlert from "../../../libs/confirmAlert";

export function getColumnDefinition(
    handleDeleteUser: (id: string) => void,
    handleChangeVerificationUser: (id: string) => void
): Array<ColumnDef<IUser>> {
    const confirmDelete = (id: string) => {
        confirmAlert({
            handler: () => handleDeleteUser(id),
            title: "¿Eliminar usuario?",
        });
    };

    return [
        {
            accessorFn: (row) => `${row.lastName}, ${row.firstName}`,
            accessorKey: "fullName",
            header: "Nombre completo",
        },
        {
            accessorFn: (row) => row.username,
            accessorKey: "username",
            header: "Nombre de usuario",
        },

        {
            accessorFn: (row) => row.email,
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorFn: (row) => row.role,
            accessorKey: "role",
            header: "Rol",
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
                const verified = row.row.original.verified;
                const id = row.row.original._id;

                return (
                    <GroupButtonActions
                        handleChangeVerification={handleChangeVerificationUser}
                        handleDelete={() => confirmDelete(id)}
                        handleEdit={() => {}}
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
