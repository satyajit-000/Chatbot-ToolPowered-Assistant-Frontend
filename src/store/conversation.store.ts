// store/conversation.store.ts
import { create } from 'zustand'
import type { ChatRoom } from '../common/interfaces/chatroom.type'
import type { Message } from '../common/interfaces/chat.type'

interface ConversationState {
    conversations: ChatRoom[]
    setConversations: React.Dispatch<React.SetStateAction<ChatRoom[]>>

    currentConversation: ChatRoom | null
    setCurrentConversation: React.Dispatch<React.SetStateAction<ChatRoom | null>>

    messages: Message[]
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

export const useConversationStore = create<ConversationState>((set) => ({
    conversations: [],
    setConversations: (updater) =>
        set((state) => ({
            conversations:
                typeof updater === 'function' ? updater(state.conversations) : updater,
        })),

    currentConversation: null,
    setCurrentConversation: (updater) =>
        set((state) => ({
            currentConversation:
                typeof updater === 'function' ? updater(state.currentConversation) : updater,
        })),

    messages: [],
    setMessages: (updater) =>
        set((state) => ({
            messages: typeof updater === 'function' ? updater(state.messages) : updater,
        })),
}))
