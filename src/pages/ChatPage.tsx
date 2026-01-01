import React, { useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useChatHistory } from '../hooks/useChatHistory';
import ChatMessage from '../components/chat/ChatMessage';
import { useConversationStore } from '../store/conversation.store';
import SkeletonMessage from '../components/ui/Skeleton/SkeletonMessage';
// import { useSendMessage } from '../hooks/useSendMessage';
import TypingIndicator from '../components/chat/TypeIndicator';
// import type { Message } from '../common/interfaces/chat.type';
import { v4 as uuidv4 } from 'uuid';
import { useStreamMessage } from '../hooks/useStreamMessage';
import ChatInput from '../components/chat/ChatInput';
// import { ToolMessage } from '../components/chat/ToolMessage';

const ChatPage: React.FC = () => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)

    const { threadId } = useParams<{ threadId?: string }>();
    const [message, setMessage] = React.useState('');
    const {
        messages,
        setMessages,
        // currentConversation,
        setCurrentConversation,
        conversations,
        setConversations
    } = useConversationStore();

    const navigate = useNavigate();
    // const { sendMessage, isLoading: isSending } = useSendMessage({
    //     messages,
    //     setMessages,
    //     currentConversation,
    //     setCurrentConversation,
    //     conversations,
    //     setConversations,
    // });

    const { streamMessage, isStreaming, isPending, tools } = useStreamMessage({
        setMessages,
        setConversations,
        setCurrentConversation,
        onThreadCreated: (id) => navigate(`/chat/${id}`, { replace: true }),
    });


    // const title =
    //     conversations.find(c => c.id === threadId)?.title

    // ✅ Only call API when threadId exists
    const {
        messages: chatHistory,
        isLoading,
    } = useChatHistory(threadId ?? null);

    const handleSend = () => {
        if (!message.trim()) return;

        // if (!threadId) {
        //     const userMessage: Message = {
        //         id: uuidv4(),
        //         role: 'user',
        //         content: message,
        //         timestamp: new Date(),
        //     };
        //     setMessages(prev => [...prev, userMessage]);
        // }


        streamMessage({ content: message, threadId, id: uuidv4() });
        setMessage('');
    };


    // const handleKeyPress = (e: React.KeyboardEvent) => {
    //     if (e.key === 'Enter' && !e.shiftKey) {
    //         e.preventDefault();
    //         handleSend();
    //     }
    // };

    const scrollToBottom = (smooth = true) => {
        messagesEndRef.current?.scrollIntoView({
            behavior: smooth ? 'smooth' : 'auto',
        })
    }

    // 🔹 on initial load & whenever messages change
    useEffect(() => {
        if (!isLoading) {
            scrollToBottom(false) // instant on load
        }
    }, [isLoading, chatHistory.length, messages.length, messages.at(-1)?.content?.length])

    // 1️⃣ Reset on thread change
    useEffect(() => {
        setMessages([]);

        if (!threadId) {
            setCurrentConversation(null);
            return;
        }

        const convo = conversations.find(c => c.id === threadId) ?? null;
        setCurrentConversation(convo);
    }, [threadId]);


    // 2️⃣ Hydrate ONCE per thread
    useEffect(() => {
        if (!isLoading && threadId && messages.length === 0) {
            setMessages(chatHistory);
        }
    }, [isLoading, chatHistory, threadId]);

    // useEffect(() => {
    //     if (!threadId) setMessages([]);
    // }, [threadId]);



    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            {/* <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {threadId ? title || 'Conversation' : 'New Conversation'}
                </h2>
                {threadId && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Conversation ID: {threadId}
                    </p>
                )}
            </div> */}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={containerRef}>
                {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <SkeletonMessage key={i} isUser={i % 2 === 0} />
                    ))
                    : (messages.map((msg, i) => {
                        const isLast = i === messages.length - 1;
                        const showTool =
                            isLast &&
                            msg.role === 'assistant' &&
                            Object.keys(tools).length;

                        return (
                            <div key={msg.id}>
                                <ChatMessage
                                    role={msg.role}
                                    content={msg.content}
                                    isStreaming={isStreaming && isLast}
                                    showTool={!!showTool}
                                    tools={tools}

                                />
                            </div>
                        );
                    })
                    )}
                {isPending && <TypingIndicator />}

                <div ref={messagesEndRef} />

                {/* ✅ Existing welcome message untouched */}
                {!threadId && !isLoading && !isStreaming && !isPending && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                            <Send className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                            Start a Conversation
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-md">
                            Ask me anything! I'm here to help you.
                        </p>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4">
                <div className="max-w-4xl mx-auto flex gap-3">
                    <ChatInput
                        value={message}
                        onChange={setMessage}
                        onSend={handleSend}
                        disabled={isPending || isStreaming}
                    />

                    <Button
                        onClick={handleSend}
                        variant="primary"
                        size="md"
                        className='rounded-full'
                        isLoading={isPending}
                        showLoadingText={false}
                        disabled={!message.trim() || isPending || isStreaming}
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
