import { Skeleton } from "@/components/ui/skeleton";

function ProductDetailSkeleton() {
    return (
        <div className="mt-2">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-4 w-10" />
                <span className="text-gray-300">/</span>
                <Skeleton className="h-4 w-16" />
                <span className="text-gray-300">/</span>
                <Skeleton className="h-4 w-36" />
                <span className="text-gray-300">/</span>
                <Skeleton className="h-4 w-14" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                {/* Left: Image gallery */}
                <div className="w-full">
                    <Skeleton className="w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-md" />
                    <div className="flex gap-3 mt-3">
                        <Skeleton className="h-16 w-16 sm:h-20 sm:w-20 rounded-md" />
                        <Skeleton className="h-16 w-16 sm:h-20 sm:w-20 rounded-md" />
                    </div>
                </div>

                {/* Right: Product info */}
                <div className="w-full flex flex-col gap-4">
                    {/* Title + wishlist */}
                    <div className="flex items-start justify-between gap-4">
                        <Skeleton className="h-7 w-2/3" />
                        <Skeleton className="h-6 w-10 shrink-0" />
                    </div>

                    {/* Price row */}
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-7 w-24" />
                        <Skeleton className="h-5 w-14" />
                        <Skeleton className="h-6 w-12 rounded-full" />
                    </div>

                    {/* Description */}
                    <Skeleton className="h-4 w-1/2" />

                    {/* Tags */}
                    <div className="flex gap-2">
                        <Skeleton className="h-4 w-14" />
                        <Skeleton className="h-4 w-10" />
                        <Skeleton className="h-4 w-14" />
                    </div>

                    {/* Details table */}
                    <div className="flex flex-col gap-3 pt-2">
                        {[
                            ["w-16", "w-20"],
                            ["w-16", "w-28"],
                            ["w-12", "w-32"],
                            ["w-12", "w-16"],
                            ["w-20", "w-10"],
                            ["w-14", "w-16"],
                            ["w-24", "w-full sm:w-56"],
                            ["w-24", "w-full sm:w-48"],
                        ].map(([labelW, valueW], i) => (
                            <div
                                key={i}
                                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4"
                            >
                                <Skeleton className={`h-4 ${labelW} shrink-0`} />
                                <Skeleton className={`h-4 ${valueW}`} />
                            </div>
                        ))}
                    </div>

                    {/* Secure payment banner */}
                    <Skeleton className="h-10 w-full rounded-md" />

                    {/* CTA button */}
                    <Skeleton className="h-11 w-full rounded-md" />

                    {/* Added confirmation */}
                    <Skeleton className="h-4 w-16 mx-auto" />

                    <div className="border-t pt-4 mt-1">
                        {/* Seller row */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                                <div className="flex flex-col gap-1.5">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-3 w-16" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>
                            {/* <Skeleton className="h-6 w-20 rounded-full shrink-0" /> */}
                        </div>

                        {/* Seller action buttons */}
                        <div className="flex gap-3 mt-4">
                            <Skeleton className="h-9 w-24 rounded-md" />
                            <Skeleton className="h-9 w-32 rounded-md" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailSkeleton;