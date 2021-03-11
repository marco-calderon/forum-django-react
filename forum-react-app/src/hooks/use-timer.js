import React, { useEffect, useRef, useState } from 'react';

const useTimer = ({ onExpire, onStart, onInit }) => {
    const [isRunning, setIsRunning] = useState(false);
    const expirationRef = useRef(null)
    const intervalRef = useRef(null);

    const start = (expiration = null) => {
        if (expiration) {
            expirationRef.current = expiration;
        }
        if (!isRunning)
            initInterval();
    }

    const stop = () => {
        if (isRunning) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
        }
    }

    const restart = (expiration = null) => {
        if (isRunning) {
            clearInterval(intervalRef.current);
        }
        if (expiration) {
            expirationRef.current = expiration;
        }
        initInterval();
    }

    const update = (expiration) => {
        if (expiration) {
            expirationRef.current = expiration;
        }
    }

    const initInterval = () => {
        if (isRunning) {
            return;
        }
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            const nowTimestamp = new Date().valueOf();
            if (expirationRef.current && nowTimestamp >= expirationRef.current.valueOf()) {
                onExpire();
            }
        }, 1000);
    }

    useEffect(() => {
        onInit();
        initInterval();
        return () => {
            clearInterval(intervalRef.current);
            setIsRunning(false);
        }
    }, []);

    return {
        start,
        stop,
        restart,
        update,
        isRunning
    };
}

export default useTimer;