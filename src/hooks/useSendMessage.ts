import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import api from '../api/axios';
import { API_ENDPOINTS } from '../common/constants/config';
import type { ChatResponseBackend } from '../common/interfaces/backend.type';
import type { Message } from '../common/interfaces/chat.type';
import { mapChatResponse } from '../common/utils/chatMapper';
import { useNavigate } from 'react-router-dom';
import type { ChatRoom } from '../common/interfaces/chatroom.type';

interface SendMessageParams {
    content: string;
    threadId?: string | null;
}

interface UseSendMessageProps {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;

    conversations: ChatRoom[];
    setConversations: React.Dispatch<React.SetStateAction<ChatRoom[]>>;

    currentConversation: ChatRoom | null;
    setCurrentConversation: React.Dispatch<React.SetStateAction<ChatRoom | null>>;
}

export const useSendMessage = ({
    setMessages,
    setConversations,
    currentConversation,
    setCurrentConversation,
}: UseSendMessageProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const sendMessage = async ({ content, threadId }: SendMessageParams) => {
        if (!content.trim()) return;

        setIsLoading(true);

        /** 1️⃣ Optimistically add user message */

        if (threadId) {
            const userMessage: Message = {
                id: uuidv4(),
                role: 'user',
                content,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, userMessage]);
        }


        try {
            /** 2️⃣ Send to backend */
            const response = await api.post<ChatResponseBackend>(
                API_ENDPOINTS.CHAT.MESSAGES,
                {
                    message: content,
                    thread_id: threadId ?? null,
                }
            );

            /** 3️⃣ Map backend response */
            const { threadId: newThreadId, assistantMessage, title } =
                mapChatResponse(response.data);

            /** 4️⃣ Append assistant message */
            setMessages((prev: Message[]) => [...prev, assistantMessage]);

            /** 5️⃣ Update conversation state */
            let updatedConversation: ChatRoom = {
                id: newThreadId,
                title: title ?? currentConversation?.title ?? 'Untitled',
                createdAt: new Date(),
                messageCount: 1,
            };


            setCurrentConversation(updatedConversation);

            /** 6️⃣ Sync conversation list */
            setConversations((prev: ChatRoom[]) => {
                const exists = prev.find(c => c.id === newThreadId);

                if (exists) {
                    return prev.map((c: ChatRoom) =>
                        c.id === newThreadId
                            ? { ...c, title: updatedConversation.title }
                            : c
                    );
                }

                return [updatedConversation, ...prev];
            });

            /** 7️⃣ Sync conversation list */
            setConversations(prev => {
                const exists = prev.find(c => c.id === newThreadId);

                if (exists) {
                    return prev.map(c =>
                        c.id === newThreadId
                            ? { ...c, title: updatedConversation.title }
                            : c
                    );
                }

                return [updatedConversation, ...prev];
            });

            /** 8️⃣ 🚀 NAVIGATE ONLY IF THIS WAS A NEW CHAT */
            if (!threadId && newThreadId) {
                navigate(`/chat/${newThreadId}`);
            }


        } catch (error) {
            // Optional: rollback user message or show toast
            console.error('Send message failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        sendMessage,
        isLoading,
    };
};
