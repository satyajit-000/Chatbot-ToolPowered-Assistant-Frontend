import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, MessageSquare, Settings, LogOut, ChevronLeft, ChevronRight, LayoutDashboard } from 'lucide-react';
// import { useAuthStore } from '../../common/store/auth.store';
// import { useUIStore } from '../../common/store/ui.store';
// import ConversationList from './ConversationList';
import { useAuthStore } from '../../store/auth.store';
import { useUIStore } from '../../store/ui.store';
import ConversationList from './ConversationList';
import { cn } from '../../lib/utils';
import { useAuth } from '../../hooks/useAuth';
// import { useConversationStore } from '../../store/conversation.store';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth()
    const isSidebarCollapsed = useUIStore((state) => state.isSidebarCollapsed);
    const toggleSidebar = useUIStore((state) => state.toggleSidebar);
    const user = useAuthStore((state) => state.user);

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    const handleNewChat = () => {
        navigate('/chat');
    };

    const isActive = (path: string) => location.pathname.startsWith(path);

    return (
        <>
            {/* Sidebar */}
            <aside
                className={`${isSidebarCollapsed ? 'w-16' : 'w-72'
                    } bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col transition-all duration-300 ease-in-out relative`}
            >
                {/* Header Section */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                    {!isSidebarCollapsed && (
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                            LangGraph
                        </h1>
                    )}

                    {/* Toggle Button */}
                    <button
                        onClick={toggleSidebar}
                        className="absolute cursor-pointer -right-3 top-6 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        {isSidebarCollapsed ? (
                            <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        ) : (
                            <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        )}
                    </button>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                        <button
                            onClick={handleNewChat}
                            className={cn("w-full cursor-pointer flex items-center gap-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors", isSidebarCollapsed ? 'px-1.5' : 'px-3')}
                            title="New Conversation"
                        >
                            <Plus className="w-5 h-5 flex-shrink-0" />
                            {!isSidebarCollapsed && <span className="font-medium">New Chat</span>}
                        </button>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto p-4">
                    {!isSidebarCollapsed && (
                        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 px-3">
                            Navigation
                        </div>
                    )}

                    <div className="space-y-1">
                        <button
                            onClick={() => !location.pathname.startsWith('/chat') ? navigate('/chat') : null}
                            className={cn('w-full cursor-pointer flex items-center gap-3 py-2 rounded-lg transition-colors',
                                isSidebarCollapsed ? 'px-1.5' : 'px-3',
                                isActive('/chat')
                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                            )}
                            title="Chat"
                        >
                            <MessageSquare className="w-5 h-5 flex-shrink-0" />
                            {!isSidebarCollapsed && <span className="font-medium">Chat</span>}
                        </button>

                        {user?.role === 'admin' && (
                            <button
                                onClick={() => navigate('/admin')}
                                className={`w-full cursor-pointer flex items-center gap-3 py-2 rounded-lg transition-colors ${isActive('/admin')
                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                    } ${isSidebarCollapsed ? 'px-1.5' : 'px-3'}`}
                                title="Admin Dashboard"
                            >
                                <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
                                {!isSidebarCollapsed && <span className="font-medium">Admin</span>}
                            </button>
                        )}
                    </div>

                    {/* Conversations List */}
                    {!isSidebarCollapsed && location.pathname.startsWith('/chat') && (
                        <ConversationList />
                    )}
                </nav>

                {/* Footer Section */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="space-y-2">
                        <button
                            onClick={() => {/* TODO: Settings modal */ }}
                            className={cn("w-full cursor-pointer flex items-center gap-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors", isSidebarCollapsed ? 'px-1.5' : 'px-3')}
                            title="Settings"
                        >
                            <Settings className="w-5 h-5 flex-shrink-0" />
                            {!isSidebarCollapsed && <span className="font-medium">Settings</span>}
                        </button>

                        <button
                            onClick={handleLogout}
                            className={cn("w-full cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors", isSidebarCollapsed ? 'px-1.5' : 'px-3')}
                            title="Sign Out"
                        >
                            <LogOut className="w-5 h-5 flex-shrink-0" />
                            {!isSidebarCollapsed && <span className="font-medium">Sign Out</span>}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
