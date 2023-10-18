import { Eye } from "react-bootstrap-icons";
import useModal from "../../hooks/modal/useModal";
import { useAppSelector } from "../../store/hooks.redux";
import ButtonPrimary from "../Button/ButtonPrimary";
import ModalDialog from "./ModalDialog";

export default function ModalGameInformation() {
    const { closeModal, openModal, showModal } = useModal();
    const { currentQuestion } = useAppSelector((state) => state.game);

    return (
        <>
            {currentQuestion && currentQuestion.description && (
                <ButtonPrimary
                    type="button"
                    title="Mostrar descripción"
                    onClick={openModal}
                    className="bg-purple-600 hover:bg-purple-600 text-white hover:text-white"
                >
                    <Eye />
                </ButtonPrimary>
            )}

            <ModalDialog
                closeModal={closeModal}
                isOpen={showModal}
                title="Descripción"
                //showBtnClose={false}
            >
                <section className="w-full text-xl font-light">
                    {/** MOSTRAR RESPUESTA CORRECTA Y DESCRIPCIÓN */}
                    {currentQuestion && currentQuestion.description && (
                        <p className="mt-2">{currentQuestion.description}</p>
                    )}
                </section>
            </ModalDialog>
        </>
    );
}
