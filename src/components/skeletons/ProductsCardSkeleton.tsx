import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"


function ProductsCardSkeleton() {
    return (
        <div className="flex flex-col  rounded-md overflow-hidden border border-border bg-card">
            {/* Product Image */}
            <div className="relative w-full h-[200px]">
                <Skeleton className="w-full h-full rounded-none" />
                {/* Top-left badge (e.g. "OPEN TO OFFERS") */}
                <Skeleton className="absolute top-3 left-3 h-5 w-24 rounded-full" />
                {/* Bottom-left badge (e.g. "TOP SELLER") */}
                <Skeleton className="absolute bottom-3 left-3 h-5 w-20 rounded-full" />
                {/* Bottom-right like button */}
                <Skeleton className="absolute bottom-3 right-3 h-6 w-11 rounded-full" />
            </div>

            {/* Card Body */}
            <div className="p-3 flex flex-col gap-2">

                <Skeleton className="h-4 w-[85%]" />

                {/* Seller avatar + badge */}
                <div className="flex items-center justify-between">
                    <Skeleton className="h-7 w-10 rounded-full" />
                    <Skeleton className="h-5 w-12 rounded" />
                </div>

                {/* Product title */}
                <Skeleton className="h-4 w-[85%]" />
            </div>
        </div>
    )
}

// Render a row of 5 skeletons
export function ProductGridSkeleton({ className, length }: { className?: string, length?: number }) {
    return (
        <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4", className)}>
            {Array.from({ length: length || 15 }).map((_, i) => (
                <ProductsCardSkeleton key={i} />
            ))}
        </div>
    )
}