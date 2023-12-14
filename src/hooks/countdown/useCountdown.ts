import { useEffect, useState, useRef } from "react";

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
