import { Skeleton } from "@/components/ui/skeleton";

function WishlistSkeleton() {
  return (
    <div className="w-full border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-[1fr_120px_160px_140px] bg-black px-6 py-3">
        {["Product", "Price", "Date Added", "Action"].map((h) => (
          <span key={h} className="text-white text-sm font-medium">{h}</span>
        ))}
      </div>

      {/* Skeleton Rows */}
      {Array.from({ length: 8}).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[1fr_120px_160px_140px] items-center px-6 py-4 border-b last:border-b-0"
        >
          {/* Product Cell */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-[82px] w-[72px] rounded-lg" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>

          {/* Price */}
          <Skeleton className="h-4 w-10" />

          {/* Date */}
          <Skeleton className="h-4 w-24" />

          {/* Button */}
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export default WishlistSkeleton;