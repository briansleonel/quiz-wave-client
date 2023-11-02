import { optionsRecents } from "../../libs/enums/filter.enum";
import { Role } from "../../libs/enums/role.enum";
import { useAppDispatch, useAppSelector } from "../../store/hooks.redux";
import { IData } from "../../types/util";
import { useEffect, useState } from "react";
import ButtonPrimary from "../Button/ButtonPrimary";
import { Filter } from "react-bootstrap-icons";
import ModalDialog from "./ModalDialog";
import Label from "../Forms/Label/Label";
import ListBoxData from "../Forms/ListBox/ListBoxData";
import { loadStateAuthLocalStorage } from "../../libs/state.localstorage";
import {
    changeCollectionFilterRecent,
    changeCollectionFilterUser,
    resetCollectionFilters,
} from "../../store/features/filters.collection.slice";

const users: Array<IData> = [
    { label: "Solo mías", value: loadStateAuthLocalStorage()?._id ?? "" },
    { label: "Todos", value: "all" },
];

export default function ModalCollectionFilters() {
    const dispatch = useAppDispatch();

    const { user } = useAppSelector((state) => state.auth);

    // Modal State
    const [isOpen, setIsOpen] = useState(false);

    // Filters state
    const [selectedRecent, setSelectedRecent] = useState<IData>(
        optionsRecents[0]
    );

    const [selectedUser, setSelectedUser] = useState<IData>(users[0]);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    useEffect(() => {
        if (user.role === Role.ADMIN) {
            setSelectedUser(users[1]);
        }
    }, [user]);

    /**
     * Permite resetear todos los filtros de búsqueda de preguntas
     */
    function resetFilters() {
        dispatch(resetCollectionFilters());
        setSelectedRecent(optionsRecents[0]);
    }

    // Effect to Verified

    // Effect to Recent
    useEffect(() => {
        dispatch(
            changeCollectionFilterRecent({
                recents: selectedRecent.value === "true",
            })
        );
    }, [selectedRecent, dispatch]);

    useEffect(() => {
        dispatch(changeCollectionFilterUser({ user: selectedUser.value }));
    }, [dispatch, selectedUser]);

    return (
        <>
            <ButtonPrimary
                type="button"
                title="Filtros"
                onClick={openModal}
                className="flex items-center justify-center gap-2 text-sm !bg-white !text-black border drop-shadow hover:!bg-neutral-900 hover:!text-white hover:border-neutral-900"
            >
                <Filter className="w-4 h-4" /> <span>Filtrar</span>
            </ButtonPrimary>

            <ModalDialog
                closeModal={closeModal}
                isOpen={isOpen}
                title="Filtros"
                className="md:max-w-sm lg:max-w-md overflow-visible"
            >
                <div className="flex flex-col w-full gap-4">
                    <Label label="Ordenar por" name="recents">
                        <ListBoxData
                            selected={selectedRecent}
                            setSelected={setSelectedRecent}
                            options={optionsRecents}
                        />
                    </Label>

                    {user.role === Role.ADMIN && (
                        <Label label="Usuario" name="user">
                            <ListBoxData
                                selected={selectedUser}
                                setSelected={setSelectedUser}
                                options={users}
                            />
                        </Label>
                    )}

                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full mt-6">
                        <ButtonPrimary
                            className="text-sm w-full bg-neutral-900 text-white hover:bg-neutral-800 hover:text-white"
                            onClick={() => resetFilters()}
                        >
                            Limpiar filtros
                        </ButtonPrimary>
                        <ButtonPrimary
                            className="text-sm w-full"
                            onClick={() => closeModal()}
                        >
                            Cerrar
                        </ButtonPrimary>
                    </div>
                </div>
            </ModalDialog>
        </>
    );
}
