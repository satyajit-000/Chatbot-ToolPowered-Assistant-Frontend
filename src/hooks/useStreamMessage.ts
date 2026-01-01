import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { API_CONFIG, API_ENDPOINTS } from '../common/constants/config';
import type { Message } from '../common/interfaces/chat.type';
import { useAuthStore } from '../store/auth.store';
import type { ChatStreamResponseBackend } from '../common/interfaces/backend.type';
import type { ChatRoom } from '../common/interfaces/chatroom.type';

interface StreamMessageParams {
    content: string;
    threadId?: string | null;
    id: string | null;
}

interface UseStreamMessageProps {
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    setConversations: React.Dispatch<React.SetStateAction<ChatRoom[]>>;
    setCurrentConversation: React.Dispatch<
        React.SetStateAction<ChatRoom | null>
    >;
    onThreadCreated?: (threadId: string) => void;
}

export const useStreamMessage = ({
    setMessages,
    setConversations,
    setCurrentConversation,
    onThreadCreated,
}: UseStreamMessageProps) => {
    const [isPending, setIsPending] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [tools, setTools] = useState<Record<string, { threadId: string, content: string }>>({})

    const token = useAuthStore.getState().accessToken;

    const abortRef = useRef<AbortController | null>(null);

    const streamMessage = async ({ content, threadId }: StreamMessageParams) => {
        if (!content.trim()) return;

        setIsPending(true);
        setIsStreaming(false);


        // 1️⃣ Add user message
        const userMessage: Message = {
            id: uuidv4(),
            role: 'user',
            content,
            timestamp: new Date(),
        };

        // 2️⃣ Add placeholder assistant message
        const assistantId = uuidv4();
        setMessages(prev => [
            ...prev,
            userMessage,
            {
                id: assistantId,
                role: 'assistant',
                content: '',
                timestamp: new Date(),
            },
        ]);

        abortRef.current?.abort();
        abortRef.current = new AbortController();

        try {
            setTools({});
            const res = await fetch(API_CONFIG.BASE_URL + API_ENDPOINTS.CHAT.STREAM, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    message: content,
                    thread_id: threadId ?? null,
                }),
                signal: abortRef.current.signal,
            });

            if (!res.body) throw new Error('No stream body');

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let resolvedThreadId: string | null = threadId ?? null;
            let newThreadId: string | undefined;

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() ?? '';

                for (const line of lines) {
                    if (!line.trim()) continue;

                    const chunk: ChatStreamResponseBackend = JSON.parse(line);
                    const text = chunk?.responseData?.assistant_message ?? '';
                    const chatNode = chunk?.responseData?.chat_node;
                    const isToolMessage = chunk?.responseData?.is_tool_message;
                    const toolName = chunk?.responseData?.tool_name;
                    newThreadId = newThreadId ?? chunk?.responseData?.thread_id;

                    if (isToolMessage && toolName && text) {
                        setTools(prev => (
                            {
                                ...prev,
                                [toolName]: {
                                    threadId: resolvedThreadId || threadId || '',
                                    content: (((prev[toolName] || {}).content || '') + text)
                                }
                            }
                        ))
                    }

                    // 3️⃣ Resolve thread id ONCE
                    if (!resolvedThreadId && newThreadId) {
                        resolvedThreadId = newThreadId;

                        const convo: ChatRoom = {
                            id: newThreadId,
                            title: chunk?.responseData?.title ?? 'Untitled',
                            createdAt: new Date(),
                            messageCount: 1,
                        };

                        setCurrentConversation(convo);
                        setConversations(prev =>
                            prev.find(c => c.id === newThreadId)
                                ? prev
                                : [convo, ...prev]
                        );

                        // onThreadCreated?.(newThreadId);
                    }

                    // 4️⃣ Append stream chunk
                    if (text) {
                        setIsPending(false);
                        setIsStreaming(true);
                        if (!isToolMessage && chatNode == 'chat_node') {
                            setMessages(prev =>
                                prev.map(m =>
                                    m.id === assistantId
                                        ? { ...m, content: m.content + text }
                                        : m
                                )
                            );
                        }
                    }
                }
            }
            if (newThreadId && newThreadId != threadId) {
                onThreadCreated?.(newThreadId);
            }
        } catch (err) {
            console.error('Streaming failed', err);
        } finally {
            setIsStreaming(false);
            setIsPending(false);
        }
    };

    const stopStream = () => {
        abortRef.current?.abort();
        setIsStreaming(false);
        setIsPending(false)
    };

    return { streamMessage, stopStream, tools, isStreaming, isPending };
};
