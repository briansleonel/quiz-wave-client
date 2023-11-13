import ButtonTrivia from "../components/Button/ButtonTrivia";
import { Input } from "../components/Forms/Input/Input";
import { useFormInput } from "../hooks/inputs/useFormInput";
import BackgroundQuiz from "../components/Trivia/BackgroundQuiz";
import { socket } from "../socket";
import { useEffect, useState } from "react";
import { toastInformation } from "../components/Sonner/sonner.toast";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    // estado para el input de codigo de sala
    const inputCodeRoom = useFormInput("");

    // estado para indicar cuando se está verificando la existencia de la sala
    const [loading, setLoading] = useState(false);

    const handleJoinRoom = () => {
        if (!loading)
            if (inputCodeRoom.inputProps.value != "") {
                setLoading(true); // indico que se está cargando
                socket.connect(); // conecto el cliente al servidor
                setTimeout(() => {
                    // emito el evento desde el cliente para verificar si existe una sala
                    socket.emit(
                        "room:check-exists",
                        Number(inputCodeRoom.inputProps.value)
                    );
                }, 3000);
            } else {
                toastInformation("Ingrese un PIN de juego.");
            }
    };

    useEffect(() => {
        function roomExists(exists: boolean) {
            if (exists) navigate("/join");
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
                    <section className="grid grid-cols-1 gap-4 w-72 p-4 bg-white rounded-sm">
                        <Input
                            type="number"
                            name="limit"
                            inputProps={inputCodeRoom.inputProps}
                            className="text-neutral-900 rounded-sm text-xl font-bold text-center drop-shadow-none placeholder:text-gray-400/90 placeholder:font-semibold placeholder:text-xl inputDisableArrows"
                            placeholder="PIN de juego"
                        />

                        <ButtonTrivia
                            onClickFn={() => handleJoinRoom()}
                            className={`w-full text-neutral-100 ${!loading ? "!bg-neutral-800  hover:!bg-neutral-900" : "!bg-gray-800"}`}
                        >
                            {loading ? "Cargando..." : "Ingresar"}
                        </ButtonTrivia>
                    </section>
                </main>
            </BackgroundQuiz>
        </>
    );
}
