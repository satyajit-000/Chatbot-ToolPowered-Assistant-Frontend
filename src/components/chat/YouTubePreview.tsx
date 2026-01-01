import { Play, ChevronUp, ExternalLink } from 'lucide-react';

interface YouTubePreviewProps {
    videoId: string;
    title: React.ReactNode;
    href: string;
    expanded: boolean;
    onExpand: () => void;
    onCollapse: () => void;
}

export const YouTubePreview = ({
    videoId,
    title,
    href,
    expanded,
    onExpand,
    onCollapse,
}: YouTubePreviewProps) => {
    return (
        <div className="my-3 overflow-hidden rounded-lg border border-slate-700 bg-slate-900">
            {/* COLLAPSED VIEW */}
            <div
                className={`flex items-center gap-3 p-3 transition-all duration-300 ease-in-out
                    ${expanded ? 'opacity-0 max-h-0 pointer-events-none' : 'opacity-100 max-h-24'}
                `}
            >
                {/* Thumbnail */}
                <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-md">
                    <img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt="Video thumbnail"
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                    <button
                        className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/40"
                        onClick={onExpand}
                        aria-label="Play video inline"
                    >
                        <Play className="h-6 w-6 text-white" />
                    </button>
                </div>

                {/* Info */}
                <div className="flex-1">
                    <div className="line-clamp-2 text-sm text-slate-200">
                        {title}
                    </div>

                    {/* EXACT COLOR YOU REQUESTED */}
                    <button
                        onClick={() =>
                            window.open(href, '_blank', 'noopener,noreferrer')
                        }
                        className="mt-1 inline-flex items-center gap-1 text-xs text-blue-400 cursor-pointer hover:text-blue-600"
                    >
                        Open on YouTube
                        <ExternalLink className="h-3 w-3" />
                    </button>
                </div>
            </div>

            {/* EXPANDED VIEW */}
            <div
                className={`transition-all duration-300 ease-in-out
                    ${expanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
                `}
            >
                {expanded && (
                    <div className="space-y-2 p-3">
                        <div className="flex items-center justify-between">
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 underline text-sm"
                            >
                                {title}
                            </a>

                            <button
                                onClick={onCollapse}
                                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                            >
                                <ChevronUp className="h-4 w-4" />
                                Collapse
                            </button>
                        </div>

                        <div className="aspect-video w-full overflow-hidden rounded-lg border border-slate-700">
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="h-full w-full"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
