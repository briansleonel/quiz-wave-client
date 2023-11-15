import BackgroundQuiz from "../../components/Trivia/BackgroundQuiz";
import ButtonTrivia from "../../components/Button/ButtonTrivia";
import { Input } from "../../components/Forms/Input/Input";
import { useFormInput } from "../../hooks/inputs/useFormInput";
import { useAppSelector } from "../../store/hooks.redux";
import { useEffect, useState } from "react";
import { socket } from "../../socket";
import { toastInformation } from "../../components/Sonner/sonner.toast";

export default function JoinPage() {
    const { code } = useAppSelector((state) => state.player);

    const inputPlayerName = useFormInput("");

    const [loading, setLoading] = useState(false);

    const handleAddName = () => {
        if (!loading) {
            const playername = inputPlayerName.inputProps.value;
            if (playername !== "" && code) {
                setLoading(true);
                setTimeout(() => {
                    socket.emit("player:join-room", code, playername);
                }, 3000);
            } else {
                toastInformation("Ingrese un nombre");
            }
        }
    };

    return (
        <>
            <BackgroundQuiz>
                <main className="w-full h-screen flex items-center justify-center">
                    <section className="grid grid-cols-1 gap-4 w-72 p-4 bg-white rounded-sm">
                        <Input
                            type="text"
                            name="limit"
                            inputProps={inputPlayerName.inputProps}
                            className="text-neutral-900 rounded-sm text-xl font-bold text-center drop-shadow-none placeholder:text-gray-400/90 placeholder:font-semibold placeholder:text-xl"
                            placeholder="Ingresar nombre"
                        />

                        <ButtonTrivia
                            onClickFn={handleAddName}
                            className="w-full !bg-neutral-800 text-neutral-100 hover:!bg-neutral-900 normal-case"
                        >
                            {loading ? "Cargando..." : "¡Listo, vamos!"}
                        </ButtonTrivia>
                    </section>
                </main>
            </BackgroundQuiz>
        </>
    );
}
