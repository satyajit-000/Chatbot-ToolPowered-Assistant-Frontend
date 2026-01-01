import { useEffect, useState } from 'react'
import api from '../api/axios'
import { API_ENDPOINTS } from '../common/constants/config'
import type { ChatHistoryResponseBackend } from '../common/interfaces/backend.type'
import { mapChatHistory } from '../common/utils/chatMapper'
import type { Message } from '../common/interfaces/chat.type'

export const useChatHistory = (threadId: string | null) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!threadId) return

        const fetchHistory = async () => {
            try {
                setIsLoading(true)

                const res = await api.get<ChatHistoryResponseBackend>(
                    API_ENDPOINTS.CHAT.CHAT_HISTORY.replace(':thread_id', threadId)
                )

                const mapped = mapChatHistory(res.data);
                setMessages(mapped);
            } catch (err) {
                console.error('Failed to load chat history', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchHistory()
    }, [threadId])

    return { messages, isLoading }
}
