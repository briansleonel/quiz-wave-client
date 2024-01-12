import { useEffect, useState, useRef } from "react";

/**
 * Hook personalizado que permite realizar una cuenta regresiva a partir de un valor inicial.
 * Ofrece métodos para resetear la cuenta regresiva a sus valores iniciales, y para iniciar la cuenta regresiva
 * @param initialTime valor inicial de la cuenta regresiva
 * @param auto si debe iniciar automaticamente
 * @returns countdos: cuenta regresiva - resetTimer: funcion para resetear los valores - startTimer: funcion para iniciar la cuenta regresiva
 */
export default function useCountdown(initialTime: number, auto = true) {
    const [countdown, setCountdown] = useState(initialTime);
    const [start, setStart] = useState(auto);

    const timerID = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (start) {
            if (countdown <= 0) {
                return;
            }

            // Set up the timer
            timerID.current = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            // Clean up the timer
            return () => clearInterval(timerID.current);
        }
    }, [countdown, start]);

    function resetTimer(newTime?: number) {
        setCountdown(newTime ?? initialTime);
        setStart(false);
    }

    return { countdown, resetTimer, startTimer: setStart };
}

/*
export default function useCountdown(initialTime: number, auto = true) {
    const [countdown, setCountdown] = useState(initialTime);
    const [start, setStart] = useState(auto);

    const timerID = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (start)
            timerID.current = setInterval(() => {
                if (countdown > 0) {
                    setCountdown((prev) => prev - 1);
                } else {
                    clearInterval(timerID.current);
                }
            }, 1000);

        return () => clearInterval(timerID.current);
    });

    return { countdown, setStart };
}
*/
