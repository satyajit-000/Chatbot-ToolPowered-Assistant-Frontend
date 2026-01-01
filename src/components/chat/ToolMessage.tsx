// components/chat/ToolMessage.tsx
import { useState, useEffect, useRef } from 'react';

interface ToolMessageProps {
    toolName: string;
    toolMessage: string;
    isStreaming?: boolean;
}

export const ToolMessage = ({
    toolName,
    toolMessage,
    isStreaming = false,
}: ToolMessageProps) => {
    const [open, setOpen] = useState(true);
    const contentRef = useRef<HTMLDivElement>(null);

    // Auto-scroll when streaming
    useEffect(() => {
        if (isStreaming && contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    }, [toolMessage, isStreaming]);

    useEffect(() => {
        if (!isStreaming && open) {
            setOpen(false);
        } else if (isStreaming && !open) {
            setOpen(true);
        }
    }, [isStreaming])

    return (
        <div className="my-2 w-full rounded-md border border-gray-300 bg-gray-50 dark:bg-slate-700">
            {/* Header */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium dark:bg-slate-800 text-whitegray-700 hover:bg-slate-600"
            >
                <span>
                    🔧 Using <code className="rounded bg-gray-200 dark:bg-slate-900 px-1">{toolName}</code>
                    {isStreaming && <span className="ml-2 animate-pulse">…</span>}
                </span>

                <span className="text-xs text-gray-200">
                    {open ? 'Hide' : 'Show'}
                </span>
            </button>

            {/* Content */}
            {open && (
                <div
                    ref={contentRef}
                    className="max-h-64 overflow-y-auto border-t border-gray-700 dark:bg-slate-800 px-3 py-2 text-sm"
                >
                    <pre className="whitespace-pre-wrap break-words text-white-800">
                        {toolMessage}
                    </pre>
                </div>
            )}
        </div>
    );
};
