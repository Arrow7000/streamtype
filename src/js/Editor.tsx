import React from "react";
import { EditorProps } from "./useEditor";

export default function Editor({
    text,
    changeText,
    timeLeft,
    totalTimeUntilDeletion
}: EditorProps) {
    if (timeLeft === 0) {
        changeText("");
        console.log("All text deleted");
    }

    return (
        <div>
            <textarea
                onChange={e => changeText(e.target.value)}
                value={text}
                style={{ opacity: timeLeft / totalTimeUntilDeletion }}
            />
        </div>
    );
}
