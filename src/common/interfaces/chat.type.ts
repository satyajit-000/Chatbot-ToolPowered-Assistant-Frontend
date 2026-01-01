// ==================== FRONTEND CHAT TYPES ====================

// Individual message in frontend
export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp?: Date; // optional if backend doesn't provide
    toolCalls?: ToolCall[];
}

// Tool call info
export interface ToolCall {
    id: number | string;
    name: string;
    status: 'completed' | 'pending';
    chatNode?: string;
}

// Conversation info
export interface Conversation {
    id: string;
    title?: string | null;
    messageCount?: number; // optional if not fetched yet
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

// Frontend chat state
export interface ChatState {
    conversations: Conversation[];
    currentConversation: Conversation | null;
    messages: Message[];
    isStreaming: boolean;
    isLoading: boolean;
}
