import { useEffect, useState } from "react";
import BackgroundQuiz from "../../components/Trivia/BackgroundQuiz";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

export default function StartQuizPage() {
    const navigate = useNavigate();

    useEffect(() => {
        function quizStarted() {
            navigate("/game");
            socket.emit("quiz:show-question");
        }

        socket.on("quiz:started", quizStarted);

        return () => {
            socket.off("quiz:started", quizStarted);
        };
    });

    return (
        <BackgroundQuiz>
            <main className="flex w-full h-screen items-center justify-center">
                <Loader />
            </main>
        </BackgroundQuiz>
    );
}
