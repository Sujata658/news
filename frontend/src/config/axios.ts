import axios from 'axios';

const baseURL = "http://localhost:5000/api/v1"

export const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    
});

function getCookie(name: string): string | null {
    const cookies: string[] = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie: string = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            const cookieValue = cookie.substring(name.length + 1);
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken') || getCookie('accessToken');
        if (config.url !== '/auth/login' && token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);