import { useState } from "react";
import useInterval from "./useInterval";

export interface EditorProps {
    text: string;
    changeText: (text: string) => void;
    timeLeft: number;
    totalTimeUntilDeletion: number;
}

export default function useEditor(totalTimeUntilDeletion: number) {
    const [text, updateText] = useState("");
    const [timeLeft, setTimeLeft] = useState(totalTimeUntilDeletion);

    const tickRate = (1000 / 60) * 2;

    useInterval(() => {
        setTimeLeft(state => {
            if (text !== "") {
                return state - tickRate > 0 ? state - tickRate : 0;
            } else {
                return state;
            }
        });
    }, tickRate);

    function changeText(textOrUpdater: ((oldText: string) => string) | string) {
        updateText(textOrUpdater);
        setTimeLeft(totalTimeUntilDeletion);
    }

    return {
        text,
        changeText,
        timeLeft,
        totalTimeUntilDeletion
    };
}
