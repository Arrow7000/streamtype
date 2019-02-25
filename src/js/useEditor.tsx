import { useState } from "react";
import useTimer from "./useTimer";

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

    useTimer(() => {
        setTimeLeft(state => {
            if (text !== "") {
                return state - tickRate > 0 ? state - tickRate : 0;
            } else {
                return state;
            }
        });
    }, tickRate);

    const changeText = (newText: string) => {
        updateText(newText);
        setTimeLeft(totalTimeUntilDeletion);
    };

    return {
        text,
        changeText,
        timeLeft,
        totalTimeUntilDeletion
    };
}
