import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
    const [isValid, setIsValid] = useState(true);
    const checkToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsValid(false);
            return;
        }
        try {
            const decoded = jwtDecode(token);
            const isExpired = decoded.exp * 1000 < Date.now();
            if (isExpired) {
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
                localStorage.removeItem('role');
                setIsValid(false);
            }
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            localStorage.removeItem('role');
            setIsValid(false);
        }
    };

    useEffect(() => {
        checkToken(); // check on load
        const interval = setInterval(checkToken, 60000); // check every 1 minute
        return () => clearInterval(interval); // cleanup
    }, [])
    if (!isValid) return <Navigate to='/login' />;
    return children
}
