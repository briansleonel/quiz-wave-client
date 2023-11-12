import BackgroundQuiz from "../../components/Trivia/BackgroundQuiz";

export default function InstructionsPage() {
    return (
        <BackgroundQuiz>
            <main className="w-full h-screen flex items-center justify-center">
                <section className="flex flex-col items-center gap-20 w-1/4 p-4  rounded-sm">
                    <div className="w-full rounded py-4 px-6 transform skew-x-12 bg-white">
                        <div className="transform -skew-x-12">
                            <h3 className="text-3xl text-center text-neutral-800 font-bold">
                                Nombre jugador
                            </h3>
                        </div>
                    </div>

                    <span className="font-bold text-neutral-200 text-3xl transform -skew-x-12">
                        Esperando...
                    </span>
                </section>
            </main>
        </BackgroundQuiz>
    );
}
