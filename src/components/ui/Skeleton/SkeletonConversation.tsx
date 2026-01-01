import type React from "react";
import Skeleton from "./Skeleton";

const SkeletonConversation: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    <Skeleton width="90%" height={14} />
    <Skeleton width="75%" height={14} />
    <Skeleton width="85%" height={14} />
  </div>
);

export default SkeletonConversation;
