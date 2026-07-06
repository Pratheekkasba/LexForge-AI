interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  circle?: boolean;
}

export function Skeleton({
  className = '',
  width,
  height,
  rounded = true,
  circle = false,
}: SkeletonProps) {
  return (
    <div
      className={`animate-pulse ${circle ? 'rounded-full' : rounded ? 'rounded-lg' : ''} ${className}`}
      style={{
        width: width ?? '100%',
        height: height ?? 20,
        background: 'rgba(225, 224, 204, 0.06)',
      }}
    />
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={14}
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div
      className="rounded-2xl border p-6 space-y-4"
      style={{
        background: '#111111',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <div className="flex items-center gap-3">
        <Skeleton circle width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton height={16} width="50%" />
          <Skeleton height={12} width="30%" />
        </div>
      </div>
      <SkeletonText lines={2} />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 p-6">
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border p-6"
            style={{
              background: '#111111',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <Skeleton height={14} width="40%" className="mb-3" />
            <Skeleton height={32} width="60%" className="mb-2" />
            <Skeleton height={12} width="50%" />
          </div>
        ))}
      </div>
      {/* Table skeleton */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          background: '#111111',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        <div className="p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton width={24} height={24} circle />
              <Skeleton height={16} width="30%" />
              <Skeleton height={16} width="20%" />
              <Skeleton height={16} width="15%" />
              <Skeleton height={16} width="10%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
