import LoaderRoom from "../../components/Lobby/LoaderRoom";
import BackgroundQuiz from "../../components/Trivia/BackgroundQuiz";
import { useAppSelector } from "../../store/hooks.redux";

export default function InstructionsPage() {
    const { name } = useAppSelector((state) => state.player);

    return (
        <BackgroundQuiz>
            <main className="w-full h-screen flex items-center justify-center">
                <section className="flex flex-col items-center gap-20 w-1/4 p-4  rounded-sm">
                    <div className="w-full rounded py-4 px-6 transform skew-x-12 bg-white">
                        <div className="transform -skew-x-12">
                            <h3 className="text-3xl text-center text-neutral-800 font-bold">
                                {name}
                            </h3>
                        </div>
                    </div>

                    <LoaderRoom text="Esperando" />
                </section>
            </main>
        </BackgroundQuiz>
    );
}
