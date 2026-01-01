// src/common/utils/mapper.ts
import type { User, SignUpResponse as FrontSignUpResponse, LoginResponse } from '../interfaces/auth.type';
import type { BackendUser, TokenResponse, SignUpResponse as BackendSignUpResponse } from '../interfaces/backend.type';
import { HttpStatusCode } from 'axios'
/**
 * Maps backend user object to frontend User interface
 */
export const mapUser = (backendUser: BackendUser | TokenResponse): User => {
    return {
        id: backendUser.id,  // convert backend integer ID to string
        email: backendUser.email,
        username: backendUser.username,
        firstName: backendUser.first_name ?? '',
        lastName: backendUser.last_name ?? '',
        role: backendUser.is_superuser ? 'admin' : backendUser.is_staff ? 'staff' : 'user',
        isActive: backendUser.is_active,
    };
};

/**
 * Maps backend signup response to frontend SignUpResponse type
 */
export const mapSignUpResponse = (response: BackendSignUpResponse): FrontSignUpResponse => {
    return {
        error: response.error,
        status: response.status,
        message: response.message,
        responseData: response.responseData
            ? {
                id: response.responseData.id,
                email: response.responseData.email,
                username: response.responseData.username,
            }
            : null,
        metadata: response.metadata ?? undefined,
    };
};

/**
 * Maps backend login (JWT token) response to frontend LoginResponse type
 */
export const mapLoginResponse = (response: TokenResponse): LoginResponse => {
    return {
        error: false,  // backend JWT response does not have `error`, can be adjusted if needed
        status: HttpStatusCode.Ok,   // assuming success
        message: 'Success',
        responseData: {
            access: response.access,
            refresh: response.refresh,
            user: mapUser(response),
        },
        metadata: undefined,
    };
};
