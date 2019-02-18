import React, { useState, useEffect, useRef } from "react";

function useTimer(callback: () => void, ms: number) {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        const tick = () => savedCallback.current();
        const intvlId = setInterval(tick, ms);
        return () => clearInterval(intvlId);
    }, []);
}

function App() {
    const msUntilDeletion = 5000;
    const [text, updateText] = useState("");
    const [timer, setTimer] = useState(msUntilDeletion);

    const tickRate = (1000 / 60) * 2;

    useTimer(() => {
        setTimer(state => {
            if (text !== "") {
                return state - tickRate > 0 ? state - tickRate : 0;
            } else {
                return state;
            }
        });
    }, tickRate);

    if (timer === 0) {
        updateText("");
        console.log("All text deleted");
        setTimer(msUntilDeletion);
    }

    const changeText = (newText: string) => {
        updateText(newText);
        setTimer(msUntilDeletion);
    };

    return (
        <div>
            <textarea
                onChange={e => changeText(e.target.value)}
                value={text}
                style={{ opacity: timer / msUntilDeletion }}
            />
        </div>
    );
}

export default App;
