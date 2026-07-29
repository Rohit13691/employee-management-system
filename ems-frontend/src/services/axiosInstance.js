import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

const showErrorToast = (message) => {
    const existing = document.getElementById('error-toast');
    if (existing) document.body.removeChild(existing);
    
    const toast = document.createElement('div');
    toast.id = 'error-toast';
    toast.className = 'fixed top-20 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        if (document.getElementById('error-toast')) {
            document.body.removeChild(toast);
        }
    }, 4000);
};

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthEndpoint = error.config?.url?.includes('/api/auth/');
        
        if (!error.response) {
            showErrorToast('⚠ Server is not connected. Please try again later.');
        } else {
            switch (error.response.status) {
                case 400:
                    break;
                case 401:
                    if (!isAuthEndpoint) showErrorToast('⚠ Unauthorized. Please login again.');
                    break;
                case 403:
                    if (!isAuthEndpoint) showErrorToast('⚠ Access denied.');
                    break;
                case 404:
                    showErrorToast('⚠ Resource not found.');
                    break;
                case 500:
                    showErrorToast('⚠ Server error. Please try again later.');
                    break;
                default:
                    showErrorToast('⚠ Something went wrong. Please try again.');
                    break;
            }
        }
        return Promise.reject(error);
    }
);
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 403 || error.response?.status === 401) {
//             localStorage.removeItem('token');
//             localStorage.removeItem('userName');
//             localStorage.removeItem('role');
//             setTimeout(() => {
//                 window.location.href = 'http://localhost:3000/login';
//             }, 100);
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;