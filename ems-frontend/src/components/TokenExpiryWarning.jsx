import { jwtDecode } from 'jwt-decode'
import { useEffect, useRef, useState } from 'react'

export const TokenExpiryWarning = () => {
    const [showWarning, setShowWarning] = useState(false);
    const warningShown = useRef(false);

    const checkToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            const timeLeft = decoded.exp * 1000 - Date.now();

            if (timeLeft <= 2 * 60 * 1000 && timeLeft > 0 && !warningShown.current) {
                warningShown.current = true;
                setShowWarning(true);
                setTimeout(() => setShowWarning(false), 8000);
            } else {
                setShowWarning(false);
            }
        } catch (error) {
            setShowWarning(false);
        }
    };

    useEffect(() => {
        checkToken();
        const interval = setInterval(checkToken, 10000);
        return () => clearInterval(interval);
    }, []);

    if (!showWarning) return null;

    return (
        <div className='fixed top-20 right-2 left-2 md:left-auto md:right-4 md:w-auto bg-yellow-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3'>
            <span className='text-sm md:text-base'>⚠ Session expiring in 2 minutes! Please save your work.</span>
            <button
                onClick={() => setShowWarning(false)}
                className='text-white font-bold hover:text-yellow-200 transition shrink-0'
            >
                ✕
            </button>
        </div>
    );
}