import type { Components } from 'react-markdown';
import { CodeBlock } from './CodeBlock';
import { YouTubePreview } from './YoutubePreview';
// import { YouTubePreview } from './YouTubePreview';

const getYouTubeId = (url: string) => {
    try {
        const u = new URL(url);
        if (u.hostname.includes('youtube.com')) {
            return u.searchParams.get('v');
        }
        if (u.hostname === 'youtu.be') {
            return u.pathname.slice(1);
        }
    } catch {
        return null;
    }
};

export const MarkdownComponents = ({
    expandedVideoId,
    setExpandedVideoId,
}: {
    expandedVideoId: string | null;
    setExpandedVideoId: (id: string | null) => void;
}): Components => ({
    code({ className, children }) {
        const match = /language-(\w+)/.exec(className || '');
        const code = String(children).replace(/\n$/, '');

        if (className || code.includes('\n')) {
            const formattedCode = code.replace(/\n{2,}/g, "\n").trim();
            return (
                <CodeBlock
                    language={match?.[1] ?? 'bash'}
                    value={formattedCode}
                />
            );
        }

        return (
            <code className="rounded bg-slate-200 dark:bg-slate-700 px-1 py-0.5 text-sm">
                {children}
            </code>
        );
    },

    a({ href, children }) {
        if (!href) return null;

        const videoId = getYouTubeId(href);

        if (videoId) {
            return (
                <YouTubePreview
                    videoId={videoId}
                    title={children}
                    href={href}
                    expanded={expandedVideoId === videoId}
                    onExpand={() => setExpandedVideoId(videoId)}
                    onCollapse={() => setExpandedVideoId(null)}
                />
            );
        }

        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
            >
                {children}
            </a>
        );
    },
});
