import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuthStore } from '../store/auth.store';
import type { LoginCredentials, SignupCredentials } from '../common/interfaces/auth.type';
import type { TokenResponse, SignUpResponse } from '../common/interfaces/backend.type';
import { mapLoginResponse, mapSignUpResponse } from '../common/utils/authUserMapper';
import { API_ENDPOINTS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../common/constants/config';
import { startTokenScheduler, stopTokenScheduler } from '../common/utils/tokenScheduler';

export const useAuth = () => {
    const navigate = useNavigate();
    const { login: storeLogin, logout: storeLogout, setLoading } = useAuthStore();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Login user
     */
    const login = async (credentials: LoginCredentials) => {
        setError(null);
        setIsLoading(true);
        setLoading(true);

        try {
            const response = await api.post<TokenResponse>(API_ENDPOINTS.AUTH.LOGIN, {
                username: credentials.username,
                password: credentials.password,
            });

            const mappedData = mapLoginResponse(response.data);

            if (mappedData.responseData) {
                storeLogin({
                    access: mappedData.responseData.access,
                    refresh: mappedData.responseData.refresh,
                });

                startTokenScheduler(mappedData.responseData.access);

                navigate('/chat');
                return { success: true, message: SUCCESS_MESSAGES.LOGIN_SUCCESS };
            }

            return { success: false, error: ERROR_MESSAGES.UNKNOWN_ERROR };
        } catch (err: any) {
            const errorMsg =
                err.response?.data?.detail ||
                err.response?.data?.message ||
                ERROR_MESSAGES.UNAUTHORIZED;
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setIsLoading(false);
            setLoading(false);
        }
    };

    /**
     * Sign up new user
     */
    const signup = async (credentials: SignupCredentials) => {
        setError(null);
        setIsLoading(true);
        console.log(credentials, 'iijnbn');


        try {
            // Validate passwords match
            if (credentials.password !== credentials.confirmPassword) {
                const errorMsg = 'Passwords do not match';
                setError(errorMsg);
                return { success: false, error: errorMsg };
            }

            const response = await api.post<SignUpResponse>(API_ENDPOINTS.AUTH.SIGNUP, {
                username: credentials.username,
                email: credentials.email,
                password: credentials.password,
                first_name: credentials.firstName,
                last_name: credentials.lastName,
            });

            const mappedData = mapSignUpResponse(response.data);

            return {
                success: true,
                data: mappedData,
                message: SUCCESS_MESSAGES.SIGNUP_SUCCESS,
            };
        } catch (err: any) {
            const errorMsg =
                err.response?.data?.message ||
                err.response?.data?.email?.[0] ||
                err.response?.data?.username?.[0] ||
                ERROR_MESSAGES.VALIDATION_ERROR;
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Forgot password
     */
    const forgotPassword = async (email: string) => {
        setError(null);
        setIsLoading(true);

        try {
            await api.post(API_ENDPOINTS.AUTH.PASSWORD_RESET, { email });
            return {
                success: true,
                message: SUCCESS_MESSAGES.PASSWORD_RESET_SENT,
            };
        } catch (err: any) {
            const errorMsg =
                err.response?.data?.message ||
                ERROR_MESSAGES.UNKNOWN_ERROR;
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Logout user - call backend to blacklist token
     */
    const logout = async () => {
        setIsLoading(true);

        try {
            const refreshToken = useAuthStore.getState().refreshToken;

            if (refreshToken) {
                // Call backend logout endpoint to blacklist the refresh token
                await api.post(API_ENDPOINTS.AUTH.LOGOUT, {
                    refresh: refreshToken,
                });
            }

            // Clear local store regardless of API success
            storeLogout();
            navigate('/auth');

            return { success: true, message: SUCCESS_MESSAGES.LOGOUT_SUCCESS };
        } catch (err: any) {
            // Even if logout API fails, clear local store
            console.error('Logout API error:', err);
            storeLogout();
            navigate('/auth');

            return { success: false, error: 'Logout completed with errors' };
        } finally {
            stopTokenScheduler();
            storeLogout();
            navigate('/auth');
            setIsLoading(false);
        }
    };

    return {
        login,
        signup,
        forgotPassword,
        logout,
        error,
        isLoading,
        clearError: () => setError(null),
    };
};