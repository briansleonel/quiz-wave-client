import { useFormInput } from "../../hooks/inputs/useFormInput";
import { useAppDispatch } from "../../store/hooks.redux";
import { useEffect, useState } from "react";
import { IData } from "../../types/util";
import { Verified, optionsVerified } from "../../libs/enums/filter.enum";
import {
    changeFilterVerified,
    changeSearchText,
} from "../../store/features/filters.slice";
import { SearchInput } from "../Forms/Input/SearchInput";
import ButtonPrimary from "../Button/ButtonPrimary";
import { Search } from "react-bootstrap-icons";
import ListBoxData from "../Forms/ListBox/ListBoxData";

export default function Filters() {
    const dispatch = useAppDispatch();

    const searchInput = useFormInput("");

    const [selectedVerified, setSelectedVerified] = useState<IData>(
        optionsVerified[0]
    );

    const searchHandle = () => {
        dispatch(
            changeSearchText({
                searchText: searchInput.inputProps.value,
            })
        );
    };

    const resetSearchInput = () => {
        searchInput.resetInput();
        dispatch(
            changeSearchText({
                searchText: "",
            })
        );
    };

    // Effect to Verified
    useEffect(() => {
        dispatch(
            changeFilterVerified({
                verified: selectedVerified.value as Verified,
            })
        );
    }, [selectedVerified, dispatch]);

    return (
        <section className="grid grid-cols-2 md:grid-cols-7 lg:grid-cols-9 items-center w-full gap-2">
            <SearchInput
                type="text"
                name="searchInput"
                placeholder="Nombre completo o nombre de usuario..."
                inputProps={searchInput.inputProps}
                className="col-span-2 md:col-span-5 lg:col-span-5"
                onClick={() => resetSearchInput()}
            />
            <ButtonPrimary
                onClick={() => searchHandle()}
                className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center col-span-2 md:col-span-2 lg:col-span-1 py-2 text-sm shadow"
            >
                <span>Buscar</span>
                <Search className="ml-3" />
            </ButtonPrimary>

            <div className="flex items-center flex-col gap-0 col-span-2 md:flex-row md:gap-2 md:col-span-7 lg:col-span-3">
                <label
                    htmlFor="verified"
                    className="w-full whitespace-pre text-base text-start md:text-end md:mb-0"
                >
                    Mostrar
                </label>
                <ListBoxData
                    selected={selectedVerified}
                    setSelected={setSelectedVerified}
                    options={optionsVerified}
                />
            </div>
        </section>
    );
}
