"use client"
import CategoryFilterSelector from "@/components/shared/UserProfile/AddProduct/Categories/CategoryFilterSelector";
import { Category } from "@/components/shared/UserProfile/AddProduct/Categories/CategorySelector"
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { useGetCategoryparentChainQuery, useGetCategoryQuery } from "@/redux/api/categoryApi";

function CategorySelectClient({ selectedCat, className }: { selectedCat: string | undefined, className?: string }) {

  const { isLoading, isSuccess, isError, data } = useGetCategoryQuery();

  const updateparams = useUpdateSearchParams();

  const handleCategorySelect = (cat: Category | null) => {
    updateparams({ category: cat?.id || null })
  }

  return (
    <div className="max-w-60">
      <CategoryFilterSelector
        categories={isSuccess ? data?.data : []}
        value={selectedCat || ""}
        onSelect={handleCategorySelect}
        placeholder="Category"
        className={className}
        isLoading={isLoading}
      />
    </div>
  )
}

export default CategorySelectClient;

export const SelectCatBypath = ({ categoryId }: { categoryId?: string }) => {

  const { isLoading, data } = useGetCategoryparentChainQuery({categoryId});

  const updateparams = useUpdateSearchParams();

  const handleCategorySelect = (cat: Category) => {
    updateparams({ category: cat?.id })
  }

  if (isLoading) return <div className="flex flex-row gap-x-2 items-center mt-5">
    <Skeleton className="h-5 w-20" />
    <Skeleton className="h-5 w-30" />
    <Skeleton className="h-5 w-15" />
    <Skeleton className="h-5 w-20" />
  </div>

  return <div className="space-x-2 text-black/70">
    {data?.data?.map((cat, index) => (
      <span key={cat.id}>
        <button onClick={() => handleCategorySelect(cat)} className="text-gray-950 last:text-gray-700 underline underline-offset-2 cursor-pointer last:cursor-default last:no-underline">{cat?.name}</button>
        {index < data?.data?.length - 1 && <span className="ml-2">/</span>}
      </span>
    ))}
  </div>
}