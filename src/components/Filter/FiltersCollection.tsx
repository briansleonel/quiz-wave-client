import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks.redux";
import { useFormInput } from "../../hooks/inputs/useFormInput";
import { SearchInput } from "../Forms/Input/SearchInput";
import ButtonPrimary from "../Button/ButtonPrimary";
import { Plus, Search } from "react-bootstrap-icons";
import { changeCollectionSearchText } from "../../store/features/filters.collection.slice";
import ModalCollectionFilters from "../Modals/ModalCollectionFilters";

export default function FiltersCollection() {
    const dispatch = useAppDispatch();
    const collectionFilters = useAppSelector((state) => state.questionFilters);

    const navigate = useNavigate();

    // Search input
    const searchInput = useFormInput(collectionFilters.searchText);

    const handlerSearch = () => {
        dispatch(
            changeCollectionSearchText({
                searchText: searchInput.inputProps.value,
            })
        );
    };

    const resetSearchInput = () => {
        searchInput.resetInput();
        dispatch(changeCollectionSearchText({ searchText: "" }));
    };

    const addNewCollection = () => {
        navigate("/dashboard/collection/new");
    };

    return (
        <section className="grid grid-cols-2 md:grid-cols-7 lg:grid-cols-9 items-center w-full gap-2">
            <SearchInput
                inputProps={searchInput.inputProps}
                name="search"
                onClick={() => resetSearchInput()}
                type="text"
                className="col-span-2 md:col-span-4 lg:col-span-6"
            />
            <ButtonPrimary
                onClick={() => handlerSearch()}
                className="flex items-center justify-center gap-2 text-sm drop-shadow col-span-2 md:col-span-1"
            >
                <Search className="w-3 h-3" />
                <span>Buscar</span>
            </ButtonPrimary>
            <ModalCollectionFilters />
            <ButtonPrimary
                className="flex items-center justify-center gap-2 text-sm bg-emerald-500 hover:bg-emerald-600"
                onClick={() => addNewCollection()}
                title="Agregar nueba pregunta"
            >
                <Plus className="w-5 h-5" /> <span>Nuevo</span>
            </ButtonPrimary>
        </section>
    );
}
