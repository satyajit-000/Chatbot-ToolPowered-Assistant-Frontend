import axios from 'axios';
import { useAuthStore } from '../store/auth.store';
import { API_CONFIG, AUTH_CONFIG, API_ENDPOINTS } from '../common/constants/config';

console.log('🔧 API Base URL:', API_CONFIG.BASE_URL);

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// ✅ Request interceptor (attach access token)
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
            console.log(token);

            config.headers.Authorization = `${AUTH_CONFIG.AUTH_HEADER_TYPE} ${token}`;
        }
        // Debug: Log the full URL being called
        console.log('📡 API Request:', config.method?.toUpperCase(), config.baseURL! + config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ✅ Response interceptor (refresh token on 401)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const authStore = useAuthStore.getState();

        // If 401 and we have a refresh token, try to refresh
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            authStore.refreshToken
        ) {
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `${AUTH_CONFIG.AUTH_HEADER_TYPE} ${token}`;
                    return api(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = authStore.refreshToken;

                // Call refresh endpoint using constant
                const response = await axios.post(
                    `${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
                    { refresh: refreshToken }
                );

                const newAccessToken = response.data.access;

                // Update store with new access token
                useAuthStore.setState({ accessToken: newAccessToken });

                // Update default headers
                api.defaults.headers.common.Authorization = `${AUTH_CONFIG.AUTH_HEADER_TYPE} ${newAccessToken}`;

                // Process queued requests
                processQueue(null, newAccessToken);

                // Retry original request with new token
                originalRequest.headers.Authorization = `${AUTH_CONFIG.AUTH_HEADER_TYPE} ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed, logout user
                console.error('Token refresh failed:', refreshError);
                processQueue(refreshError, null);
                useAuthStore.getState().logout();

                // Redirect to login
                if (typeof window !== 'undefined') {
                    window.location.href = '/auth';
                }

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
