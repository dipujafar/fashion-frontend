"use client"
import { useCallback, useState } from 'react'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import { ISize } from '@/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useGetSizesQuery } from '@/redux/api/size.api'
import { Checkbox } from '@/components/ui/checkbox'

export const RadioIndicator = ({ selected }: { selected: boolean }) => (
    selected ? (
        <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center ml-3 shrink-0">
            <div className="w-2 h-2 rounded-full bg-white" />
        </div>
    ) : (
        <div className="w-5 h-5 rounded-full border-2 border-gray-400 ml-3 shrink-0" />
    )
)

function SmSizeFilter({ categoryId }: { categoryId?: string }) {
    const { isLoading, isSuccess, isError, data } = useGetSizesQuery({ categoryId })
    const searchParams = useSearchParams()
    const selectedItems = searchParams.get("size")?.split(",") || []

    // stack of parent categories the user has drilled into
    const [path, setPath] = useState<ISize[]>([])

    const router = useRouter();

    const pathname = usePathname();

    const updateQueryParam = useCallback(
        (key: string, value: string, targetId?: string) => {
            const currentValues = searchParams.get(key)?.split(",") || [];

            let newValues: string[];
            if (currentValues.includes(value)) {
                newValues = currentValues.filter((v) => v !== value);
            } else {
                newValues = [...currentValues, value];
            }

            const params = new URLSearchParams(searchParams.toString());
            if (newValues.length > 0) {
                params.set(key, newValues.join(","));
            } else {
                params.delete(key);
            }

            router.push(`${pathname}?${params.toString()}`, { scroll: false });

            // optional scroll to element
            setTimeout(() => {
                if (targetId) {
                    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
                }
            }, 50);

        },
        [searchParams, router]
    );

    const handleSelect = (size: string) => {
        updateQueryParam("size", size)
    }

    if (isLoading) return (
        <div className="flex-center h-24 lg:h-32">
            <span className="loaderDark !w-10"> </span>
        </div>
    )

    if (isError) return <div className="flex-center h-24 lg:h-32">Error loading sizes</div>

    const rootItems: ISize[] = isSuccess ? data?.data ?? [] : []
    const currentParent = path[path.length - 1]
    const currentItems: ISize[] = currentParent?.children ?? rootItems

    // at root: "All" means no category filter applied
    // at a nested level: "All" means the parent category id itself (all items under this parent)
    const allValue = currentParent ? currentParent?.id?.toString() : ""

    return (
        <div>
            {/* back row when drilled into a nested level */}
            {currentParent && (
                <button
                    onClick={() => setPath((prev) => prev.slice(0, -1))}
                    className="w-full flex items-center gap-2 p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 text-left"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="font-medium">{currentParent.title}</span>
                </button>
            )}

            {currentItems?.length ? (
                currentItems.map((item) => {
                    const hasChildren = (item?.children?.length ?? 0) > 0
                    const isSelected = selectedItems.includes(item?.id?.toString())

                    if (hasChildren) {
                        return (
                            <button
                                key={item.id}
                                onClick={() => setPath((prev) => [...prev, item])}
                                className="w-full flex justify-between items-center p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 text-left"
                            >
                                <span className="text-base">{item.title}</span>
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                            </button>
                        )
                    }

                    return (
                        <button
                            key={item.id}
                            onClick={() => handleSelect(item?.id?.toString())}
                            className="w-full flex justify-between items-center p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                        >
                            <span className="text-base">{item.title}</span>
                            <Checkbox className='rounded-xs border-gray-500 data-[state=checked]:text-white' checked={isSelected} />
                        </button>
                    )
                })
            ) : (
                <div className="p-3 text-sm text-muted-foreground text-center">
                    No sizes found
                </div>
            )}
        </div>
    )
}

export default SmSizeFilter