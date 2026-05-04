"use client"
import CategorySelector, { Category } from "@/components/shared/UserProfile/AddProduct/Categories/CategorySelector"
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";

function CategorySelectClient({ selectedCat, categories }: { selectedCat: string | undefined, categories: Category[] }) {
  const updateparams = useUpdateSearchParams();

  const handleCategorySelect = (cat: Category) => {
    updateparams({ category: cat?.id })
  }

  return (
    <div className="w-60">
      <CategorySelector
        categories={categories}
        value={selectedCat || ""}
        onSelect={handleCategorySelect}
        placeholder="Select category"
      />
    </div>
  )
}

export default CategorySelectClient;

export const SelectCatBypath = ({ cats }: { cats: Category[] }) => {
  const updateparams = useUpdateSearchParams();

  const handleCategorySelect = (cat: Category) => {
    updateparams({ category: cat?.id })
  }

  return <div className="mt-5 space-x-2 text-black/70 mb-5">
    {cats?.map((cat, index) => (
      <span key={cat.id}>
        <button onClick={() => handleCategorySelect(cat)} className="text-gray-950 last:text-gray-700 underline underline-offset-2 cursor-pointer last:cursor-default last:no-underline">{cat?.name}</button>
        {index < cats.length - 1 && <span className="ml-2">/</span>}
      </span>
    ))}
  </div>
}