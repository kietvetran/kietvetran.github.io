import { useEffect, useRef, Ref } from 'react';

const useInterval = (callback: () => void, delay?: number, doFirst = false): Ref<undefined | NodeJS.Timeout> => {
    const intervalRef = useRef<undefined | NodeJS.Timeout>(undefined);
    const savedCallback = useRef<Function>(callback);
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (intervalRef.current) {
            return;
        }

        const tick = () => savedCallback.current();
        if (delay) {
            if (doFirst) {
                tick();
            }
            intervalRef.current = setInterval(tick, delay);
            return () => clearInterval(intervalRef.current);
        } else {
            tick();
        }
    }, [delay, doFirst]);

    return intervalRef;
};

export default useInterval;
