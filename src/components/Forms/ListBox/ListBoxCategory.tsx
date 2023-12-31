import { useQuery } from "@tanstack/react-query";
import { IQuestionCategory } from "../../../types/questionCategory";
import categoryService from "../../../services/category.service";
import { useEffect, useState } from "react";
import { ListBox, ListBoxOption } from "./ListBox";
import AlertDanger from "../../Alerts/Alert";

interface Props {
    selected: IQuestionCategory | undefined;
    setSelected: (category: IQuestionCategory) => void;
    newOption?: IQuestionCategory;
    className?: string;
}

export default function ListBoxCategory({
    selected,
    setSelected,
    newOption,
    className,
}: Props) {
    // Cargo las categorías
    const { data, isLoading, error } = useQuery({
        queryKey: ["categories"],
        queryFn: categoryService.getAllCategories,
    });

    const [options, setOptions] = useState<Array<IQuestionCategory>>([]);

    useEffect(() => {
        if (data && options.length <= 0) {
            if (newOption) {
                const opts = [newOption, ...data];
                setOptions(opts);
            } else {
                setOptions(data);
            }
        }
    }, [data, newOption, options.length]);

    const mapOptions = (data: Array<IQuestionCategory>) => {
        return data.map((category, index) => (
            <ListBoxOption key={index} value={category}>
                {category.name}
            </ListBoxOption>
        ));
    };

    if (error && error instanceof Error) {
        return (
            <>
                <AlertDanger>{error.message}</AlertDanger>
            </>
        );
    }

    if (isLoading) {
        return <>Cargando categorías</>;
    }

    return (
        <>
            {data && options && (
                <ListBox
                    selected={selected}
                    setSelected={setSelected}
                    valueShow={selected?.name ? selected.name : ""}
                    className={className ?? ""}
                >
                    {mapOptions(options)}
                    {/*data.map((category, index) => (
                        <ListBoxOption key={index} value={category}>
                            {category.name}
                        </ListBoxOption>
                    ))*/}
                </ListBox>
            )}
        </>
    );
}
