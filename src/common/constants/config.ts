/**
 * Application Configuration Constants
 * Centralized configuration for better maintainability
 */

// ==================== API Configuration ====================
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
    TIMEOUT: 30000, // 30 seconds
} as const;

// ==================== Authentication Configuration ====================
export const AUTH_CONFIG = {
    // Token lifetimes (in milliseconds) - should match backend settings
    ACCESS_TOKEN_LIFETIME: 60 * 60 * 1000, // 60 minutes (matches backend)
    REFRESH_TOKEN_LIFETIME: 7 * 24 * 60 * 60 * 1000, // 7 days (matches backend)

    // Token refresh threshold - refresh when 5 minutes left
    TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes before expiry

    // Storage keys
    STORAGE_KEY: 'auth-storage',

    // Auth header type
    AUTH_HEADER_TYPE: 'Bearer',
} as const;

// ==================== API Endpoints ====================
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login/',
        SIGNUP: '/api/auth/signup/',
        LOGOUT: '/api/auth/logout/',
        REFRESH: '/api/auth/refresh/',
        PASSWORD_RESET: '/api/auth/password-reset/',
        PASSWORD_RESET_CONFIRM: '/api/auth/password-reset-confirm/',
    },
    CHAT: {
        CONVERSATIONS: '/api/chatrooms/',
        MESSAGES: '/api/chat/send/',
        STREAM: '/api/chat/stream/',
        CHAT_HISTORY: '/api/chat/history/:thread_id/'
        // NEW_CONVERSATION: '/api/chat/conversations/new/',
    },
    USER: {
        PROFILE: '/api/user/profile/',
        UPDATE_PROFILE: '/api/user/profile/update/',
    },
    ADMIN: {
        STATS: '/api/admin/stats/',
        USERS: '/api/admin/users/',
        CONVERSATIONS: '/api/admin/conversations/',
    },
} as const;

// ==================== UI Configuration ====================
export const UI_CONFIG = {
    THEME: {
        DEFAULT: 'light' as 'light' | 'dark',
        STORAGE_KEY: 'ui-storage',
    },
    SIDEBAR: {
        DEFAULT_COLLAPSED: false,
        BREAKPOINT: 1024, // px - collapse on screens smaller than this
    },
    CHAT: {
        MAX_MESSAGE_LENGTH: 4000,
        TYPING_INDICATOR_DELAY: 500, // ms
        MESSAGE_LOAD_LIMIT: 50,
    },
    PAGINATION: {
        DEFAULT_PAGE_SIZE: 20,
        MAX_PAGE_SIZE: 100,
    },
} as const;

// ==================== Validation Rules ====================
export const VALIDATION_RULES = {
    USERNAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 30,
        PATTERN: /^[a-zA-Z0-9_-]+$/,
        ERROR_MESSAGE: 'Username must be 3-30 characters and contain only letters, numbers, hyphens, and underscores',
    },
    PASSWORD: {
        MIN_LENGTH: 8,
        MAX_LENGTH: 128,
        REQUIRE_UPPERCASE: true,
        REQUIRE_LOWERCASE: true,
        REQUIRE_NUMBER: true,
        REQUIRE_SPECIAL: false,
        ERROR_MESSAGE: 'Password must be at least 8 characters with uppercase, lowercase, and number',
    },
    EMAIL: {
        PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        ERROR_MESSAGE: 'Please enter a valid email address',
    },
} as const;

// ==================== Error Messages ====================
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UNAUTHORIZED: 'Session expired. Please login again.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    NOT_FOUND: 'The requested resource was not found.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
} as const;

// ==================== Success Messages ====================
export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: 'Login successful!',
    SIGNUP_SUCCESS: 'Account created successfully!',
    LOGOUT_SUCCESS: 'Logged out successfully.',
    PASSWORD_RESET_SENT: 'Password reset link sent to your email.',
    PROFILE_UPDATED: 'Profile updated successfully.',
    MESSAGE_SENT: 'Message sent successfully.',
} as const;

// ==================== Feature Flags ====================
export const FEATURE_FLAGS = {
    ENABLE_CHAT_HISTORY: true,
    ENABLE_FILE_UPLOAD: false,
    ENABLE_VOICE_INPUT: false,
    ENABLE_DARK_MODE: true,
    ENABLE_NOTIFICATIONS: false,
    ENABLE_ANALYTICS: false,
} as const;

// ==================== Environment ====================
export const ENV = {
    IS_PRODUCTION: import.meta.env.VITE_PROD,
    IS_DEVELOPMENT: import.meta.env.VITE_DEV,
    APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
} as const;
