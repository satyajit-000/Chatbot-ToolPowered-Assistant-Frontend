import React from "react";

const TypingIndicator: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-slate-800 text-sm p-4 rounded-2xl w-fit">
      <div className="flex items-center gap-1">
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-[bounce_0.6s_0.2s_infinite]"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-[bounce_0.6s_0.4s_infinite]"></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
