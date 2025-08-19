"use client"
import { useState } from "react"
import { ChevronDown, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { navigationData } from "@/lib/navigation-data"
import { useSearchParams } from "next/navigation"

interface CategoryDropdownProps {
  selectedItem?: string
  onSelectionChange?: (item: string) => void
  updateParams?: (params: {
    path: string
    params: {
      category?: string
      subCategory?: string | null
      finalCategory?: string
      filter?: string | null
    }
  }) => void
}

export default function CategoriesFilter({
  selectedItem: propSelectedItem = "",
  onSelectionChange,
  updateParams,
}: CategoryDropdownProps) {
  const [openDropdown, setOpenDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItem, setSelectedItem] = useState(propSelectedItem)

  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get("category")
  const selectedSubcategory = searchParams.get("subCategory")

  const categoryData = selectedCategory ? navigationData[selectedCategory as keyof typeof navigationData] : null

  const handleMainCategorySelect = (categoryKey: string) => {
    updateParams?.({
      path: "/shop",
      params: {
        category: categoryKey,
        subCategory: null,
        finalCategory: "",
        filter: null,
      },
    })
    setOpenDropdown(false)
  }

  const handleSubcategorySelect = (subcategoryId: string) => {
    if (!selectedCategory) return

    updateParams?.({
      path: "/shop",
      params: {
        category: selectedCategory,
        subCategory: subcategoryId,
        finalCategory: "",
        filter: null,
      },
    })
    setOpenDropdown(false)
  }

  const handleItemSelect = (item: string) => {
    setSelectedItem(item)
    onSelectionChange?.(item)

    if (selectedCategory && selectedSubcategory) {
      updateParams?.({
        path: "/shop",
        params: {
          category: selectedCategory,
          subCategory: selectedSubcategory,
          finalCategory: item,
          filter: null,
        },
      })
    }
    setOpenDropdown(false)
  }

  const clearSelection = () => {
    setSelectedItem("")
    onSelectionChange?.("")
  }

  const formatCategoryName = (categoryKey: string) => {
    return categoryKey.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
  }

  const renderMainCategories = () => (
    <div className="max-h-64 overflow-y-auto">
      <div className="flex items-center justify-between space-x-3 p-3 bg-muted/30 cursor-not-allowed opacity-60">
        <span className="text-sm font-medium text-muted-foreground">All</span>
        {!selectedCategory && <div className="w-2 h-2 bg-black rounded-full" />}
      </div>
      {Object.entries(navigationData).map(([categoryKey, categoryValue]) => (
        <div
          key={categoryKey}
          className="flex items-center justify-between space-x-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors"
          onClick={() => handleMainCategorySelect(categoryKey)}
        >
          <span className="text-sm font-medium">{formatCategoryName(categoryKey)}</span>
          {selectedCategory === categoryKey && <div className="w-2 h-2 bg-black rounded-full" />}
        </div>
      ))}
    </div>
  )

  const renderSubcategories = () => {
    if (!categoryData) return null

    return (
      <div className="max-h-64 overflow-y-auto">
        {categoryData.subcategories.map((subcategory) => (
          <div
            key={subcategory.id}
            className="flex items-center justify-between space-x-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={() => handleSubcategorySelect(subcategory.id)}
          >
            <div className="flex items-center gap-3">
              {subcategory.icon && <subcategory.icon className="h-4 w-4" />}
              <span className="text-sm">{subcategory.name}</span>
            </div>
            {selectedSubcategory === subcategory.id && <div className="w-2 h-2 bg-black rounded-full" />}
          </div>
        ))}
      </div>
    )
  }

  const renderItems = () => {
    const subcategoryData = categoryData?.subcategories.find((sub) => sub.id === selectedSubcategory)

    if (!subcategoryData?.categories.length) {
      return <div className="p-4 text-center text-muted-foreground">No items available</div>
    }

    const allItems = subcategoryData.categories.flatMap((category) => category.items)
    const filteredItems = allItems.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
      <>
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div key={`${item}-${index}`} className="flex items-center space-x-3 p-3 hover:bg-muted/50">
                <input
                  type="radio"
                  name="category-items"
                  id={`category-${item}-${index}`}
                  checked={selectedItem === item}
                  onChange={() => handleItemSelect(item)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor={`category-${item}-${index}`} className="flex-1 text-sm cursor-pointer">
                  {item}
                </label>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">No items found</div>
          )}
        </div>
      </>
    )
  }

  const getDropdownContent = () => {
    if (!selectedCategory) return renderMainCategories()
    if (!selectedSubcategory) return renderSubcategories()
    return renderItems()
  }

  const getDropdownTriggerText = () => {
    if (!selectedCategory) return "All"
    if (!selectedSubcategory) return formatCategoryName(selectedCategory)

    const subcategoryData = categoryData?.subcategories.find((sub) => sub.id === selectedSubcategory)
    return subcategoryData?.name || "Category"
  }

  return (
    <div className="w-full">
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-10 justify-between bg-transparent rounded-full min-w-[200px]">
            <span className="truncate">{getDropdownTriggerText()}</span>
            <ChevronDown className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-0" align="start">
          {getDropdownContent()}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedItem && (
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full text-sm">
              <span>{selectedItem}</span>
              <Button variant="ghost" size="sm" className="h-4 w-4 p-0 hover:bg-transparent" onClick={clearSelection}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
