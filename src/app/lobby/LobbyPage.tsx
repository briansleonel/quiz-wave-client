import { useLocation } from "react-router-dom";
import BackgroundQuiz from "../../components/Trivia/BackgroundQuiz";

export default function LobbyPage() {
    const location = useLocation();
    const collectionId = new URLSearchParams(location.search).get("collection");

    console.log(collectionId);

    return (
        <BackgroundQuiz>
            <main className="w-full h-screen flex items-center justify-center">
                {/** Mostrar el código de juego */}
                <section className="flex w-1/4 rounded transform -skew-x-12 bg-indigo-600 ">
                    <div className="w-1/4 rounded py-4 px-6  bg-indigo-700">
                        <div className="transform skew-x-12 ">
                            <h3 className="text-3xl text-center text-white font-bold">
                                PIN
                            </h3>
                        </div>
                    </div>
                    <div className="w-full rounded py-4 px-6 bg-indigo-600 ">
                        <div className="transform skew-x-12 ">
                            <h3 className="text-3xl transform text-center text-neutral-300 font-bold">
                                PIN
                            </h3>
                        </div>
                    </div>
                </section>
            </main>
        </BackgroundQuiz>
    );
}
