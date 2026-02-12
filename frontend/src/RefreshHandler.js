import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsAuthenticated(true);

            // If user is on login, signup, or root, redirect to home
            if (['/', '/login', '/signup'].includes(location.pathname)) {
                navigate('/home', { replace: true });
            }
        } else {
            setIsAuthenticated(false);
        }
    }, [location.pathname, navigate, setIsAuthenticated]);

    return null;
}

export default RefreshHandler;
