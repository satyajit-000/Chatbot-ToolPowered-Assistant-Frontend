// ==================== AUTH TYPES ====================
export interface User {
    id: number;                  // matches backend user ID
    email: string;
    username: string;            // backend sends 'username'
    firstName: string;
    lastName: string;
    role?: 'admin' | 'staff' | 'user'; // optional if backend doesn't send role
    isActive?: boolean;          // optional if backend doesn't send isActive
}

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}


export interface LoginCredentials {
    username: string;
    password: string;
}

export interface SignupCredentials extends LoginCredentials {
    email: string
    firstName: string;
    lastName: string;
    confirmPassword: string;
}

// ==================== API RESPONSE TYPES ====================
export interface ApiResponse<T, U = any> {
    error: boolean;
    status: number;
    message: string;
    responseData: T | null;
    metadata?: U;
}

export type SignUpResponse = ApiResponse<Partial<User>>;
export type LoginResponse = ApiResponse<{ access: string; refresh: string; user: User }>;

// ==================== ADMIN TYPES ====================
export interface AdminStats {
    totalUsers: number;
    activeSessions: number;
    totalConversations: number;
    totalMessages: number;
}

export interface AdminUser extends User {
    conversationCount: number;
    messageCount: number;
    lastActive: Date;
}

export interface Activity {
    id: string;
    title: string;
    user: string;
    email: string;
    timestamp: Date;
    isActive: boolean;
}
