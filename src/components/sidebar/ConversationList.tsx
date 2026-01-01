import React from 'react'
import SkeletonList from '../ui/Skeleton/SkeletonList'
import ConversationItem from './ConversationItem'
import { useConversations } from '../../hooks/useConversations'
import { useNavigate, useParams } from 'react-router-dom'

const ConversationList: React.FC = () => {
    const { conversations, isLoading } = useConversations()
    // const [activeId, setActiveId] = React.useState<string | null>(null)
    const { threadId: activeId } = useParams<{ threadId?: string }>();

    const navigate = useNavigate();

    const handleConversationClick = (id: string) => {
        navigate(`/chat/${id}`)
    }

    if (isLoading) {
        return (
            <div className="mt-6">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 px-3">
                    Recent Conversations
                </div>
                <SkeletonList count={6} />
            </div>
        )
    }

    if (conversations.length === 0) {
        return (
            <div className="mt-6 px-3">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                    Recent Conversations
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-8">
                    No conversations yet. Start a new chat!
                </p>
            </div>
        )
    }

    return (
        <div className="mt-6">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 px-3">
                Recent Conversations
            </div>
            <div className="space-y-1">
                {[...conversations].reverse().map((conversation) => (
                    <ConversationItem
                        key={conversation.id}
                        conversation={conversation}
                        isActive={conversation.id === activeId}
                        onClick={() => handleConversationClick(conversation.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ConversationList
