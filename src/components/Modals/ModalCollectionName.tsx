import { Pencil } from "react-bootstrap-icons";
import useModal from "../../hooks/modal/useModal";
import ButtonPrimary from "../Button/ButtonPrimary";
import ModalDialog from "./ModalDialog";
import Label from "../Forms/Label/Label";
import { Input } from "../Forms/Input/Input";
import { InputPropType, InputTextAreaPropType } from "../../types/util";
import { TextArea } from "../Forms/Input/TextArea";
import { useFormInput, useFormTextArea } from "../../hooks/inputs/useFormInput";

interface Props {
    title: string;
    description: string;
    changeTitleAndDescription: (title: string, description: string) => void;
}

export default function ModalCollectionName({
    changeTitleAndDescription,
    description,
    title,
}: Props) {
    const { closeModal, openModal, showModal } = useModal();

    const inputTitle = useFormInput(title);
    const inputDescription = useFormTextArea(description);

    const handleSubmit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        changeTitleAndDescription(
            inputTitle.inputProps.value,
            inputDescription.inputProps.value
        );
        closeModal();
    };

    return (
        <>
            <ButtonPrimary
                className="bg-transparent !text-neutral-600 text-lg hover:bg-transparent hover:!text-neutral-800 hover:shadow"
                title="Editar nombre y descripción"
                onClick={openModal}
            >
                <Pencil />
            </ButtonPrimary>

            <ModalDialog
                closeModal={closeModal}
                isOpen={showModal}
                title=""
                showBtnClose={false}
            >
                <form className="w-full grid grid-cols-1 gap-4">
                    <Label label="Título" name="name">
                        <Input
                            type="text"
                            name="name"
                            inputProps={inputTitle.inputProps}
                        />
                    </Label>

                    <Label label="Descripción" name="description">
                        <TextArea
                            name="description"
                            inputProps={inputDescription.inputProps}
                        />
                    </Label>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full mt-6">
                        <ButtonPrimary
                            className="text-sm font-normal w-full bg-neutral-200 !text-black hover:bg-neutral-300"
                            onClick={closeModal}
                            type="button"
                        >
                            Cancelar
                        </ButtonPrimary>
                        <ButtonPrimary
                            className="text-sm font-normal w-full"
                            onClick={handleSubmit}
                        >
                            Listo
                        </ButtonPrimary>
                    </div>
                </form>
            </ModalDialog>
        </>
    );
}
