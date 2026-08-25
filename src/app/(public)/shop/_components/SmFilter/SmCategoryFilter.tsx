"use client"
import { useGetCategoryQuery } from '@/redux/api/categoryApi'
import { useState } from 'react'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import { ICategory } from '@/types'
import { useSearchParams } from 'next/navigation'
import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams'

export const RadioIndicator = ({ selected }: { selected: boolean }) => (
  selected ? (
    <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center ml-3 shrink-0">
      <div className="w-2 h-2 rounded-full bg-white" />
    </div>
  ) : (
    <div className="w-5 h-5 rounded-full border-2 border-gray-400 ml-3 shrink-0" />
  )
)

function SmCategoryFilter() {
  const { isLoading, isSuccess, isError, data } = useGetCategoryQuery()
  const selectedItems = useSearchParams().get("category")?.split(",") || []
  const updateparams = useUpdateSearchParams()

  // stack of parent categories the user has drilled into
  const [path, setPath] = useState<ICategory[]>([])

  const handleSelect = (category: string) => {
    if (category) {
      updateparams({ "category": category })
    } else {
      updateparams({ "category": null })
    }
  }

  if (isLoading) return (
    <div className="flex-center h-24 lg:h-32">
      <span className="loaderDark !w-10"> </span>
    </div>
  )

  if (isError) return <div className="flex-center h-24 lg:h-32">Error loading categories</div>

  const rootItems: ICategory[] = isSuccess ? data?.data ?? [] : []
  const currentParent = path[path.length - 1]
  const currentItems: ICategory[] = currentParent?.children ?? rootItems

  // at root: "All" means no category filter applied
  // at a nested level: "All" means the parent category id itself (all items under this parent)
  const allValue = currentParent ? currentParent?.id?.toString() : ""
  const isAllSelected = currentParent
    ? selectedItems.includes(allValue)
    : selectedItems.length === 0

  return (
    <div>
      {/* back row when drilled into a nested level */}
      {currentParent && (
        <button
          onClick={() => setPath((prev) => prev.slice(0, -1))}
          className="w-full flex items-center gap-2 p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 text-left"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">{currentParent.name}</span>
        </button>
      )}

      {/* "All" row: clears filter at root, selects parentId at nested levels */}
      <button
        onClick={() => handleSelect(allValue)}
        className="w-full flex justify-between items-center p-3.5 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
      >
        <span className="text-base">All</span>
        <RadioIndicator selected={isAllSelected} />
      </button>

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
                <span className="text-base">{item.name}</span>
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
              <span className="text-base">{item.name}</span>
              <RadioIndicator selected={isSelected} />
            </button>
          )
        })
      ) : (
        <div className="p-3 text-sm text-muted-foreground text-center">
          No categories found
        </div>
      )}
    </div>
  )
}

export default SmCategoryFilter