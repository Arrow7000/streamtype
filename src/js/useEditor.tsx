import { useState } from "react";
import useInterval from "./useInterval";

export interface EditorProps {
    text: string;
    changeText: (text: string) => void;
    timeLeftUntilDelete: number;
    timeUntilDeletion: number;
}

// @TODO: add timer for cancelling Stream mode and export menu can appear
export default function useEditor(
    countdownActive: boolean,
    timeUntilDeletion: number
) {
    const [text, updateText] = useState("");
    const [timerExpired, setTimerExpired] = useState(false);
    const [timeLeftUntilDelete, setTimeLeftUntilDelete] = useState(
        timeUntilDeletion
    );

    const tickRate = (1000 / 60) * 2;
    // const tickRate = 10000000;

    useInterval(() => {
        if (countdownActive && !timerExpired) {
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
        setTimeLeftUntilDelete(timeUntilDeletion);
    }

    if (timeLeftUntilDelete === 0) {
        changeText("");
        console.log("All text deleted");
    }

    return {
        text,
        changeText,
        timeLeftUntilDelete,
        timeUntilDeletion
    };
}
