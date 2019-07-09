import { useEffect, useRef } from "react";

export default function useInterval(callback: () => void, ms: number) {
    const savedCallback = useRef(callback);
    useEffect(() => {
        savedCallback.current = callback;
    });
    useEffect(() => {
        const tick = () => savedCallback.current();
        const intvlId = setInterval(tick, ms);
        return () => clearInterval(intvlId);
    }, [ms]);
}
