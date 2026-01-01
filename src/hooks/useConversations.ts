import { useEffect, useState } from 'react'
import api from '../api/axios'
import { API_ENDPOINTS } from '../common/constants/config'
import type { ChatRoomListResponseBackend } from '../common/interfaces/backend.type'
import { useConversationStore } from '../store/conversation.store'
import { mapChatRoom } from '../common/utils/chatroomMapper'

export const useConversations = () => {
    // const [conversations, setConversations] = useState<Conversation[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { conversations, setConversations } = useConversationStore()

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                setIsLoading(true)
                const res = await api.get<ChatRoomListResponseBackend>(API_ENDPOINTS.CHAT.CONVERSATIONS)

                const mapped = (res.data)
                    ?.responseData?.map((item) => (mapChatRoom(item))) || []

                setConversations(mapped)
            } catch (err) {
                console.error('Failed to fetch conversations', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchConversations()
    }, [])

    return { conversations, isLoading }
}
