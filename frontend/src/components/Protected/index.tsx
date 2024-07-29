import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from '@/pages/Auth/Login';
import { toast } from 'sonner';
import renewToken from '@/apis/users/renewToken';
import { ThemeButton } from '../General/ThemeButton';
import Navbar from '../Navbar';

interface JwtPayload {
    exp: number;
    [key: string]: any;
}

const Protected = () => {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const checkAccessToken = async () => {
            const token = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            if (token) {
                setAccessToken(token);
                try {
                    const decodedToken = parseJwt(token) as JwtPayload;
                    const currentTime = Date.now() / 1000;

                    if (decodedToken.exp < currentTime) {
                        console.log('Access token has expired!');

                        if (refreshToken) {
                            try {
                                const decodedRefreshToken = parseJwt(refreshToken) as JwtPayload;
                                if (decodedRefreshToken.exp < currentTime) {
                                    console.log('Refresh token has expired!');
                                    handleLogout();
                                } else {
                                    try {
                                        const response = await renewToken(refreshToken);
                                        if (!response) {
                                            handleLogout();
                                        } else {

                                            const newAccessToken = response;

                                            localStorage.setItem('accessToken', newAccessToken.accessToken);
                                            setAccessToken(newAccessToken.accessToken);
                                        }
                                    } catch (error) {
                                        console.error('Failed to renew access token:', error);
                                        handleLogout();
                                    }
                                }
                            } catch (error) {
                                console.error('Error decoding refresh token:', error);
                                handleLogout();
                            }
                        } else {
                            console.log('No refresh token found!');
                            handleLogout();
                        }
                    }
                } catch (error) {
                    console.error('Error decoding token:', error);
                    handleLogout();
                }
            } else {
                console.log('Navigating to login page');
                navigate('/login');
            }
        };

        checkAccessToken();
    }, [navigate]);

    const handleLogout = () => {
        toast('Session Expired! Please login again.');
        Cookies.remove('accessToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const parseJwt = (token: string): JwtPayload | null => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join('')
            );

            return JSON.parse(jsonPayload);
        } catch (error) {
            return null;
        }
    };

    return accessToken ?
        <div className='relative'>
            <div className=' max-h-screen min-h-screen overflow-y-auto'>
                <div className='h-[10vh]'>

                <Navbar />
                </div>
                <div className='h-[90vh] max-w-screen'>
                <Outlet />
                </div>

            </div>
            <div className='absolute bottom-4 right-8'>
                <ThemeButton />
            </div>
        </div>



        : <Login />;
};

export default Protected;
