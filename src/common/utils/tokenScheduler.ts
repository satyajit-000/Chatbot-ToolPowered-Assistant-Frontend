// src/auth/tokenScheduler.ts
import axios from 'axios';
// import { AUTH_CONFIG, API_CONFIG, API_ENDPOINTS } from '../common/constants/config';
// import { useAuthStore } from '../store/auth.store';
import { getTokenExpiry } from './jwt';
import { useAuthStore } from '../../store/auth.store';
import { AUTH_CONFIG, API_CONFIG, API_ENDPOINTS } from '../constants/config';

let refreshTimer: number | null = null;

export const startTokenScheduler = (accessToken: string) => {
    stopTokenScheduler();

    const expiry = getTokenExpiry(accessToken);
    const refreshAt = expiry - AUTH_CONFIG.TOKEN_REFRESH_THRESHOLD;
    const delay = refreshAt - Date.now();

    if (delay <= 0) {
        refreshToken();
        return;
    }

    refreshTimer = window.setTimeout(refreshToken, delay);
};

export const stopTokenScheduler = () => {
    if (refreshTimer) {
        clearTimeout(refreshTimer);
        refreshTimer = null;
    }
};

const refreshToken = async () => {
    try {
        const { refreshToken } = useAuthStore.getState();
        if (!refreshToken) throw new Error('No refresh token');

        const res = await axios.post(
            `${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
            { refresh: refreshToken }
        );
        console.log(res)

        useAuthStore.setState({ accessToken: res.data.access });
        startTokenScheduler(res.data.access);
    } catch {
        useAuthStore.getState().logout();
        window.location.href = '/auth';
    }
};
