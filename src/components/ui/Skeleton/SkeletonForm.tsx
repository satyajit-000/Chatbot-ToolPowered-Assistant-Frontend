import Skeleton from "./Skeleton";

const SkeletonForm: React.FC = () => (
  <div className="space-y-6">
    <div>
      <Skeleton width={100} height={14} className="mb-2" />
      <Skeleton height={40} className="rounded-lg" />
    </div>
    <div>
      <Skeleton width={120} height={14} className="mb-2" />
      <Skeleton height={40} className="rounded-lg" />
    </div>
    <div>
      <Skeleton width={80} height={14} className="mb-2" />
      <Skeleton height={100} className="rounded-lg" />
    </div>
    <Skeleton height={44} className="rounded-lg" />
  </div>
);

export default SkeletonForm
