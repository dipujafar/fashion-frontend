import { Skeleton } from "@/components/ui/skeleton";

function WishlistMobileSkeleton() {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl mt-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-4 w-14" />
      </div>

      {/* Cards */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 border border-gray-100 rounded-xl p-3 mb-3"
        >
          {/* Image */}
          <Skeleton className="h-[110px] w-[110px] rounded-xl flex-shrink-0" />

          {/* Info */}
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-28 mt-1" />
            <Skeleton className="h-3 w-28" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 items-center">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default WishlistMobileSkeleton;