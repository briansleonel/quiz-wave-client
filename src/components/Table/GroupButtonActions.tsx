import {
    HandThumbsDown,
    HandThumbsUp,
    PencilSquare,
    Trash3Fill,
} from "react-bootstrap-icons";
import { useAppSelector } from "../../store/hooks.redux";
import ButtonPrimary from "../Button/ButtonPrimary";
import { Role } from "../../libs/enums/role.enum";

interface Props {
    verified: boolean;
    id: string;
    handleDelete: (id: string) => void;
    handleChangeVerification: (id: string) => void;
    handleEdit: (id: string) => void;
}

export default function GroupButtonActions({
    id,
    verified,
    handleChangeVerification,
    handleDelete,
    handleEdit,
}: Props) {
    const { user } = useAppSelector((state) => state.auth);
    return (
        <div className="flex gap-2 justify-center">
            <ButtonPrimary
                className="bg-yellow-500 hover:bg-yellow-400"
                title="Editar"
                onClick={() => handleEdit(id)}
            >
                <PencilSquare />
            </ButtonPrimary>
            <ButtonPrimary
                className="bg-red-600 hover:bg-red-500"
                title="Eliminar"
                onClick={() => handleDelete(id)}
            >
                <Trash3Fill />
            </ButtonPrimary>
            {user.role === Role.ADMIN && (
                <ButtonPrimary
                    className="bg-sky-600 hover:bg-sky-500"
                    title="Cambiar verificación"
                    onClick={() => handleChangeVerification(id)}
                >
                    {verified ? <HandThumbsDown /> : <HandThumbsUp />}
                </ButtonPrimary>
            )}
        </div>
    );
}
