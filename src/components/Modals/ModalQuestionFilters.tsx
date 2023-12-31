import { optionsRecents, optionsVerified } from "../../libs/enums/filter.enum";
import { Role } from "../../libs/enums/role.enum";
import {
    changeQuestionFilterCategory,
    changeQuestionFilterRecent,
    changeQuestionFilterUser,
    changeQuestionFilterVerified,
    resetQuestionFilters,
} from "../../store/features/filters.question.slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks.redux";
import { IQuestionCategory } from "../../types/questionCategory";
import { IData } from "../../types/util";
import { useEffect, useState } from "react";
import ButtonPrimary from "../Button/ButtonPrimary";
import { Filter } from "react-bootstrap-icons";
import ModalDialog from "./ModalDialog";
import Label from "../Forms/Label/Label";
import ListBoxCategory from "../Forms/ListBox/ListBoxCategory";
import ListBoxData from "../Forms/ListBox/ListBoxData";
import { loadStateAuthLocalStorage } from "../../libs/state.localstorage";

const allCategories: IQuestionCategory = {
    _id: "all",
    name: "Todas las categorías",
};

const users: Array<IData> = [
    { label: "Solo mías", value: loadStateAuthLocalStorage()?._id ?? "" },
    { label: "Todos", value: "all" },
];

export default function ModalQuestionFilters() {
    const dispatch = useAppDispatch();

    const { user } = useAppSelector((state) => state.auth);

    // Modal State
    const [isOpen, setIsOpen] = useState(false);

    // Filters state
    const [selectedCategory, setSelectedCategory] =
        useState<IQuestionCategory>(allCategories);
    const [selectedVerified, setSelectedVerified] = useState<IData>(
        optionsVerified[0]
    );
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
        dispatch(resetQuestionFilters());
        setSelectedCategory(allCategories);
        setSelectedRecent(optionsRecents[0]);
        setSelectedVerified(optionsVerified[0]);
    }

    // Effect to Verified
    useEffect(() => {
        dispatch(
            changeQuestionFilterVerified({
                verified: selectedVerified.value,
            })
        );
    }, [selectedVerified, dispatch]);

    // Effect to Category
    useEffect(() => {
        dispatch(
            changeQuestionFilterCategory({
                category: selectedCategory._id,
            })
        );
    }, [selectedCategory, dispatch]);

    // Effect to Recent
    useEffect(() => {
        dispatch(
            changeQuestionFilterRecent({
                recents: selectedRecent.value === "true",
            })
        );
    }, [selectedRecent, dispatch]);

    useEffect(() => {
        dispatch(changeQuestionFilterUser({ user: selectedUser.value }));
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
                    <Label label="Categoría" name="category">
                        <ListBoxCategory
                            selected={selectedCategory}
                            setSelected={setSelectedCategory}
                            newOption={allCategories}
                        />
                    </Label>

                    <Label label="Mostrar" name="verified">
                        <ListBoxData
                            selected={selectedVerified}
                            setSelected={setSelectedVerified}
                            options={optionsVerified}
                        />
                    </Label>

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
