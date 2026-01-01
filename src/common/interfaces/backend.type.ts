// ==================== BACKEND AUTH TYPES ====================

import type { ApiResponse } from "./auth.type";

// User object as returned from backend (SignUp / JWT token)
export interface BackendUser {
    id: number;              // backend uses integer ID
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    is_superuser: boolean;
    is_active: boolean;
}

// JWT Token response from /api/token/ endpoint
export interface TokenResponse {
    refresh: string;
    access: string;
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    is_superuser: boolean;
    is_active: boolean;
}

// JWT Refresh response from /api/token/refresh/ endpoint
export interface TokenRefreshResponse {
    access: string;
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    is_superuser: boolean;
    is_active: boolean;
}

// SignUp API response
export interface SignUpResponse {
    error: boolean;
    status: number;
    message: string;
    responseData: {
        id: number;
        email: string;
        username: string;
    } | null;
    metadata?: any;
}

// ==================== BACKEND CHATROOM TYPES ====================

// Single chatroom object returned in list
export interface BackendChatRoom {
    id: string;            // UUID
    user: number;          // User ID
    title: string;
    created_at: string;    // ISO timestamp
    message_count: number; // Total messages in this chatroom
}

// Response from /chatrooms/
export type ChatRoomListResponseBackend = ApiResponse<BackendChatRoom[]>;


// ==================== BACKEND CHAT TYPES ====================

export interface ResponseBackend {
    thread_id: string;
    assistant_message: string;
    timestamp?: string;
    title: string | null;
}

export interface StreamingBackend extends ResponseBackend {
    tool_name: string | null;
    is_tool_message: boolean;
    chat_node: string | null;
}
// Single response from /chat/ (synchronous)
export type ChatResponseBackend = ApiResponse<ResponseBackend>

// Streaming response from /chat/stream/ (NDJSON)
export type ChatStreamResponseBackend = ApiResponse<StreamingBackend>
// Chat history response from /chat/history/{thread_id}/
export type ChatHistoryResponseBackend = ApiResponse<BackendMessage[], BackendMessageMetaData>;

// Individual message returned by backend (from history or stream)
export interface BackendMessage {
    id: string; // may not exist for streaming chunks
    role: 'user' | 'assistant';
    content: string;
    timestamp?: string; // optional if backend doesn't provide
}

export interface BackendMessageMetaData {
    tolal_count: number
}
