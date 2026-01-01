import type React from "react";
import Skeleton from "./Skeleton";

const SkeletonList: React.FC<{ count?: number; className?: string }> = ({ 
  count = 5, 
  className = '' 
}) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1">
          <Skeleton width="70%" height={16} className="mb-2" />
          <Skeleton width="40%" height={12} />
        </div>
      </div>
    ))}
  </div>
);

export default SkeletonList;
