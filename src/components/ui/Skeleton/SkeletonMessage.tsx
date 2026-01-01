import type React from "react";
import Skeleton from "./Skeleton";

const SkeletonMessage: React.FC<{ isUser?: boolean }> = ({ isUser = false }) => (
  <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
    <Skeleton variant="circular" width={36} height={36} />
    <div className="flex-1 max-w-[600px]">
      <Skeleton height={80} className="rounded-lg" />
    </div>
  </div>
);

export default SkeletonMessage;
