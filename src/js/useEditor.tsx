import { useState } from "react";
import useInterval from "./useInterval";

export interface EditorProps {
    text: string;
    changeText: (text: string) => void;
    restartSession: () => void;
    timeLeftUntilDelete: number;
    totalTimeUntilDeletion: number;
    sessionLengthRemaining: number;
}

export default function useEditor(
    sessionLength: number,
    totalTimeUntilDeletion: number
): EditorProps {
    const [text, updateText] = useState("");

    const [sessionRemaining, setSessionRemaining] = useState(sessionLength);

    const restartSession = () => setSessionRemaining(sessionLength);

    const [timeLeftUntilDelete, setTimeLeftUntilDelete] = useState(
        totalTimeUntilDeletion
    );

    const tickRate = (1000 / 60) * 2;

    const sessionExpired = sessionRemaining <= 0;

    useInterval(() => {
        if (!sessionExpired) {
            setSessionRemaining(sessRem => {
                if (text !== "") {
                    return sessRem - tickRate > 0 ? sessRem - tickRate : 0;
                } else {
                    return sessRem;
                }
            });

            setTimeLeftUntilDelete(timeLeft => {
                if (text !== "") {
                    return timeLeft - tickRate > 0 ? timeLeft - tickRate : 0;
                } else {
                    return timeLeft;
                }
            });
        }
    }, tickRate);

    function changeText(textOrUpdater: ((oldText: string) => string) | string) {
        updateText(textOrUpdater);
        setTimeLeftUntilDelete(totalTimeUntilDeletion);
    }

    if (sessionExpired) {
        console.log("Session finished!");
    } else if (timeLeftUntilDelete <= 0) {
        changeText("");
        setSessionRemaining(sessionLength);
        console.log("All text deleted");
    }

    return {
        text,
        changeText,
        restartSession,
        timeLeftUntilDelete,
        totalTimeUntilDeletion,
        sessionLengthRemaining: sessionRemaining
    };
}
