import { useEffect, useRef } from "react";

export default function useTimeout(callback: () => void, ms: number) {
    const savedCallback = useRef(callback);
    useEffect(() => {
        savedCallback.current = callback;
    });
    useEffect(() => {
        const callback = () => savedCallback.current();
        const timeoutId = setTimeout(callback, ms);
        return () => clearTimeout(timeoutId);
    }, []);
}
