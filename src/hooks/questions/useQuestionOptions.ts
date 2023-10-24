import { useState } from "react";
import { useFormInput } from "../inputs/useFormInput";
import {
    toastError,
    toastInformation,
    toastSuccess,
    toastWarning,
} from "../../components/Sonner/sonner.toast";

interface Props {
    optionsGroup: Array<string>;
    correct: string;
}

export function useQuestionOption({ correct, optionsGroup }: Props) {
    // Estado para almacenr las opciones correspondientes a una pregunta
    const [options, setOptions] = useState<Array<string>>(optionsGroup);
    // Estado para controlar cuando se edita una opción
    const [editOption, setEditOption] = useState(false);
    // Estado para establecer una opción como correcta
    const [correctOption, setCorrectOption] = useState(correct);
    // Estado para el input en el que se ingresa la opción
    const inputOptions = useFormInput("");

    /**
     * Permite filtrar el array de opciones, para así poder quitar la opción que no se usará
     * @param option opción a quitar
     * @returns un arreglo con la lista de opciones actualizada
     */
    function quitOption(option: string) {
        return options.filter((e) => e !== option);
    }

    /**
     * Evento para agregar una nueva opción a la lista de opciones
     */
    function handlerAddOption() {
        // Verifico que el input no se encuentre vacío
        if (inputOptions.inputProps.value !== "") {
            if (options && options.length < 4) {
                // Verifico que la opción a ingresar no se encuentre entre las opciones añadidas
                if (
                    !options.find(
                        (e) =>
                            e.toLowerCase() ===
                            inputOptions.inputProps.value.toLowerCase()
                    )
                ) {
                    const opts = options;
                    opts.push(inputOptions.inputProps.value);
                    setOptions(opts);
                    inputOptions.resetInput();
                    toastSuccess("Opción agregada");
                    setCorrectOption("");
                    setEditOption(false);
                } else {
                    toastError("No puede agregar opciones repetidas");
                }
            } else {
                toastInformation("No se puede agregar más opciones");
            }
        } else {
            toastInformation("Opción no válida");
        }
    }

    /**
     * Manejador para cancelar la edición de una opción
     */
    function handlerCancelEditOption() {
        handlerAddOption();
        setEditOption(false);
        inputOptions.setInput("");
    }

    /**
     * Manejador para controlar cuando se edite una opción seleccionada
     * @param option opción a editar
     */
    function handlerEditOption(option: string) {
        inputOptions.setInput(option); // set value from option input
        setEditOption(!editOption);
        setOptions(quitOption(option));
        setCorrectOption("");
    }

    /**
     * Manejador para eliminar una determinada opción de la lista de opciones
     * @param option opción a eliminar
     */
    function handlerDeleteOption(option: string) {
        const updated = quitOption(option);
        console.log(updated);
        setOptions(updated);
        toastWarning("Opción eliminada");
        setCorrectOption("");
    }

    return {
        options,
        inputOptions,
        editOption,
        correctOption,
        setCorrectOption,
        setOptions,
        handlerAddOption,
        handlerCancelEditOption,
        handlerEditOption,
        handlerDeleteOption,
    };
}
