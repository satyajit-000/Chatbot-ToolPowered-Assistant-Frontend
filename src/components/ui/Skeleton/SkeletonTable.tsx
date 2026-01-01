// import Skeleton from ".";

import Skeleton from "./Skeleton";

const SkeletonTable: React.FC<{ rows?: number; columns?: number }> = ({ 
  rows = 5, 
  columns = 5 
}) => (
  <div className="space-y-3">
    {/* Header */}
    <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700 pb-3">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} width={`${100 / columns}%`} height={16} />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex gap-4">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} width={`${100 / columns}%`} height={20} />
        ))}
      </div>
    ))}
  </div>
);

export default SkeletonTable;
