import ButtonTrivia from "../components/Button/ButtonTrivia";
import { Input } from "../components/Forms/Input/Input";
import { useFormInput } from "../hooks/inputs/useFormInput";
import BackgroundQuiz from "../components/Trivia/BackgroundQuiz";
import { socket } from "../socket";
import { useEffect, useState } from "react";
import { toastInformation } from "../components/Sonner/sonner.toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks.redux";
import { playerSetCode } from "../store/features/player.slice";
import LoaderCircle from "../components/Loader/LoaderCircle";

export default function HomePage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // estado para el input de codigo de sala
    const inputCodeRoom = useFormInput("");

    // estado para indicar cuando se está verificando la existencia de la sala
    const [loading, setLoading] = useState(false);

    const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!loading)
            if (inputCodeRoom.inputProps.value != "") {
                setLoading(true); // indico que se está cargando
                socket.connect(); // conecto el cliente al servidor
                // emito el evento desde el cliente para verificar si existe una sala
                socket.emit(
                    "room:check-exists",
                    Number(inputCodeRoom.inputProps.value)
                );
            } else {
                toastInformation("Ingrese un PIN de juego.");
            }
    };

    useEffect(() => {
        function roomExists(exists: boolean) {
            if (exists) {
                dispatch(playerSetCode(Number(inputCodeRoom.inputProps.value)));
                navigate("/join");
            }
        }

        function roomError(message: string) {
            setLoading(false);
            toastInformation(message);
        }

        socket.on("room:room-exists", roomExists);

        socket.on("room:error", roomError);

        return () => {
            socket.off("room:room-exists", roomExists);
            socket.off("room:error", roomError);
        };
    });

    return (
        <>
            <BackgroundQuiz>
                <main className="w-full h-screen flex items-center justify-center">
                    <form
                        className="grid grid-cols-1 gap-4 w-72 p-4 bg-white rounded-sm"
                        onSubmit={handleJoinRoom}
                    >
                        <Input
                            type="number"
                            name="code"
                            inputProps={inputCodeRoom.inputProps}
                            className="text-neutral-900 rounded-sm text-xl font-bold text-center drop-shadow-none placeholder:text-gray-400/90 placeholder:font-semibold placeholder:text-xl inputDisableArrows"
                            placeholder="PIN de juego"
                        />

                        <ButtonTrivia
                            className={`w-full flex justify-center gap-3 text-neutral-100 ${
                                !loading
                                    ? "!bg-neutral-800  hover:!bg-neutral-900"
                                    : "!bg-gray-950"
                            }`}
                        >
                            {loading ? <LoaderCircle /> : "Ingresar"}
                        </ButtonTrivia>
                    </form>
                </main>
            </BackgroundQuiz>
        </>
    );
}
