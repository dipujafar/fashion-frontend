import { useGetCategoryparentChainQuery } from '@/redux/api/categoryApi'
import React from 'react'
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';

function CategoryBreadcrump({ categoryId }: { categoryId: string }) {
    const { data, isLoading, isSuccess } = useGetCategoryparentChainQuery({ categoryId }, { skip: !categoryId })
    return (
        <div className="py-2">
            {isLoading && <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-4 w-10" />
                <span className="text-gray-300">/</span>
                <Skeleton className="h-4 w-16" />
                <span className="text-gray-300">/</span>
                <Skeleton className="h-4 w-36" />
                <span className="text-gray-300">/</span>
                <Skeleton className="h-4 w-14" />
            </div>}
            {
                isSuccess && data && (
                    data?.data?.map((i, index) => (
                        <React.Fragment key={i?.id}>
                            <Link href={`/shop?category=${i?.id}`} className="font-normal hover:underline text-black underline-offset-2 last:hover:no-underline text-gray-700 last:text-primary-black">{i?.name}</Link>
                            {index !== data?.data?.length - 1 && <ChevronRight className="size-4 inline text-gray-700" />}
                        </React.Fragment>
                    ))
                )
            }
        </div >
    )
}

export default CategoryBreadcrump