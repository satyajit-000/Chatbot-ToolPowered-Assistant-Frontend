import { jwtDecode } from 'jwt-decode'
import type { BackendUser, TokenResponse } from '../interfaces/backend.type'

/**
 * Decode JWT access token and extract user claims
 */
export const decodeUserFromToken = (accessToken: string): BackendUser => {
    const decoded = jwtDecode<TokenResponse>(accessToken)

    return {
        id: decoded.id,
        email: decoded.email,
        username: decoded.username,
        first_name: decoded.first_name ?? '',
        last_name: decoded.last_name ?? '',
        is_staff: decoded.is_staff ?? false,
        is_superuser: decoded.is_superuser ?? false,
        is_active: decoded.is_active ?? true,
    }
}

// utils/jwt.ts
export const getTokenExpiry = (token: string): number => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000; // ms
};
