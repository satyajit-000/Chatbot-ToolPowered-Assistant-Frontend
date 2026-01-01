import React, { useRef } from 'react';

interface ChatInputProps {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    disabled?: boolean;
    placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
    value,
    onChange,
    onSend,
    disabled = false,
    placeholder = 'Ask me anything...',
}) => {
    const textAreatRef = useRef<HTMLTextAreaElement | null>(null);
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey && !disabled) {
            e.preventDefault();
            onSend();
            textAreatRef?.current?.focus()
        }
    };

    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            // disabled={disabled}
            rows={1}
            ref={textAreatRef}
            className="
                flex-1
                resize-none
                px-4 py-3
                bg-slate-50 dark:bg-slate-900
                border border-slate-200 dark:border-slate-700
                rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500
                disabled:opacity-60
                disabled:cursor-not-allowed
            "
        />
    );
};

export default ChatInput;
