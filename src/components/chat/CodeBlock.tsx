// components/chat/CodeBlock.tsx
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { handleCopy } from '../../lib/utils';
import { cn } from '../../lib/utils';

interface CodeBlockProps {
    language?: string;
    value: string;
}

export const CodeBlock = ({ language, value }: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);

    return (
        <div className="relative my-3 rounded-lg pt-6 overflow-hidden group">
            {/* Copy button */}
            <button
                onClick={() => handleCopy(value, setCopied)}
                className={cn("absolute opacity-0 group-hover:opacity-100 right-0 z-10 px-2 rounded text-xs text-white hover:bg-slate-600 transition-all duration-300 ease-in-out",
                    language != 'bash' ? 'top-3 py-1' : 'top-1/2 -translate-y-1/2 py-2'
                )}
            >
                <div className='flex gap-2 items-center justify-center opacity-0 group-hover:opacity-100'>
                    {copied ? (<>
                        <Check className="size-3" />
                        {language != 'bash' && 'Copied'}
                    </>
                    ) : (<>
                        <Copy className="size-3" />
                        {language != 'bash' && 'Copy'}
                    </>
                    )}
                </div>
            </button>
            <div className='text-xs absolute top-3 left-0'>{language}</div>

            <SyntaxHighlighter
                language={language}
                style={oneDark}
                wrapLines={true}
                customStyle={{
                    margin: 0,
                    // padding: '1rem',
                    background: 'var(--code-bg)',
                    fontSize: '0.85rem',
                }}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    );
};
