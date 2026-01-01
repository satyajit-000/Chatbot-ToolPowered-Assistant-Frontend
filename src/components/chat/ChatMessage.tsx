import React, { useState } from 'react';
import Profile from '../profile/Profile';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from '../../lib/utils';
import { ToolMessage } from './ToolMessage';
import { Check, Copy } from 'lucide-react';
import { MarkdownComponents } from './MarkdownComponents';
import { handleCopy } from '../../lib/utils';
import { useParams } from 'react-router-dom';

interface ChatMessageProps {
    role: 'user' | 'assistant';
    content: string;
    isStreaming?: boolean;
    showTool?: boolean;
    tools: Record<string, { threadId: string, content: string }>
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, isStreaming = false, showTool, tools }) => {
    const isUser = role === 'user';
    const normalizeForMarkdown = (text: string) => {
        return text
            .replace(/\*\* /g, "**\n") // Replace "* " with "*\n"
            .replace(/\r\n|\n/g, "\n\n").trim(); // Replace "** " with "**\n"
    };
    const { threadId } = useParams<{ threadId: string }>()
    const [isCopied, setIsCopied] = useState(false);
    const [expandedVideoId, setExpandedVideoId] = useState<string | null>(null);

    return (
        <div
            className={cn(`flex gap-3 group relative`, isUser ? 'flex-row-reverse' : '')}
        >
            {/* Profile Icon */}
            <Profile profileType={role} />

            {/* Message Bubble */}
            {
                (content || (showTool && Object.keys(tools).length)) &&
                (<div
                    className={cn(`rounded-lg px-4 py-3 max-w-2xl break-words`,
                        isUser
                            ? 'bg-blue-600 text-white'
                            : 'bg-transparent'
                    )}>
                    <>
                        {/* Tool Messages */}
                        {showTool && Object.entries(tools).map(
                            ([toolName, { threadId: id, content: toolMessage }]) => (
                                id == threadId && <ToolMessage
                                    toolName={toolName}
                                    toolMessage={toolMessage}
                                    isStreaming={isStreaming}
                                />
                            )
                        )}
                        {/* AI response */}
                        {content && (<div className="prose prose-sm max-w-none">

                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={MarkdownComponents({
                                    expandedVideoId,
                                    setExpandedVideoId,
                                })}
                            >
                                {normalizeForMarkdown(content) + (isStreaming ? " ▍" : "")}
                            </ReactMarkdown>
                        </div>)}
                    </>
                    {!isUser && (
                        <>
                            <hr className="mt-4 text-gray-800" />
                            <div className="flex items-center gap-2
                                            opacity-0 translate-y-1 py-4
                                            transition-all duration-200 ease-out
                                            group-hover:opacity-100 
                                            group-hover:translate-y-0"
                            >
                                <button
                                    className="cursor-pointer"
                                    title={isCopied ? 'copied' : 'copy'}
                                    onClick={() => handleCopy(content, setIsCopied)}
                                >
                                    {isCopied ? (
                                        <Check className="size-4" />
                                    ) : (
                                        <Copy className="size-4" />
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </div>)
            }

        </div>
    );
};

export default ChatMessage;
