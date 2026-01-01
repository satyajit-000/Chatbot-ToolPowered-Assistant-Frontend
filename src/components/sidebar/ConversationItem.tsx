import React from 'react';
import { MessageSquare, Trash2, MoreVertical } from 'lucide-react';
import type { ChatRoom } from '../../common/interfaces/chatroom.type';

interface ConversationItemProps {
    conversation: ChatRoom;
    isActive: boolean;
    onClick: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, isActive, onClick }) => {
    const [showMenu, setShowMenu] = React.useState(false);

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        // TODO: Implement delete conversation
        console.log('Delete conversation:', conversation.id);
    };

    const handleMenuToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    return (
        <div
            onClick={onClick}
            className={`group relative px-3 py-2.5 rounded-lg cursor-pointer transition-all ${isActive
                ? 'bg-slate-900 dark:bg-slate-700 text-white'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
        >
            <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium truncate flex-1">
                    {conversation.title}
                </span>

                {/* Actions Menu */}
                <div className="relative">
                    <button
                        onClick={handleMenuToggle}
                        className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${isActive
                            ? 'hover:bg-slate-800 dark:hover:bg-slate-600'
                            : 'hover:bg-slate-200 dark:hover:bg-slate-600'
                            }`}
                    >
                        <MoreVertical className="w-4 h-4" />
                    </button>

                    {/* Dropdown Menu */}
                    {showMenu && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowMenu(false)}
                            />
                            <div className="absolute right-0 top-8 z-20 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1">
                                <button
                                    onClick={handleDelete}
                                    className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete Conversation
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConversationItem;