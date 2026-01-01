// src/common/utils/chatMapper.ts
import { v4 as uuidv4 } from 'uuid';
import type { Message, Conversation } from '../interfaces/chat.type';
import type {
    ChatResponseBackend,
    ChatStreamResponseBackend,
    ChatHistoryResponseBackend,
    BackendMessage
} from '../interfaces/backend.type';

/**
 * Map a single backend message to frontend Message
 */
export const mapMessage = (backendMessage: BackendMessage): Message => {
    return {
        id: backendMessage.id?.toString() ?? uuidv4(),
        role: backendMessage.role,
        content: backendMessage.content,
        timestamp: backendMessage.timestamp ? new Date(backendMessage.timestamp) : undefined,
    };
};

/**
 * Map backend chat response (single message) to frontend
 */
export const mapChatResponse = (response: ChatResponseBackend): { threadId: string; assistantMessage: Message; title?: string | null } => {
    return {
        threadId: response.responseData?.thread_id ?? '',
        assistantMessage: {
            id: uuidv4(),
            role: 'assistant',
            content: response.responseData?.assistant_message ?? '',
            timestamp: response.responseData?.timestamp ? new Date(response.responseData?.timestamp) : undefined,
        },
        title: response.responseData?.title ?? null,
    };
};

/**
 * Map backend streaming chunk to frontend Message
 */
export const mapChatStreamChunk = (chunk: ChatStreamResponseBackend): Message => {
    const data = chunk.responseData;
    return {
        id: `chunk_${uuidv4()}`, // generate unique id
        role: 'assistant',
        content: data?.assistant_message ?? '',
        timestamp: data?.timestamp ? new Date(data?.timestamp) : undefined,
        toolCalls: data?.tool_name
            ? [{
                id: `tool_${uuidv4()}`,
                name: data.tool_name,
                status: data.is_tool_message ? 'completed' : 'pending',
                chatNode: data.chat_node ?? undefined,
            }]
            : undefined,
    };
};

/**
 * Map backend chat history to frontend Message[]
 */
export const mapChatHistory = (historyResponse: ChatHistoryResponseBackend): Message[] => {
    return historyResponse.responseData?.map(mapMessage) ?? [];
};

/**
 * Map backend conversation info to frontend Conversation
 */
export const mapConversation = (threadId: string, title?: string | null, messageCount?: number): Conversation => {
    return {
        id: threadId,
        title: title ?? 'Untitled',
        messageCount: messageCount ?? 0,
    };
};
