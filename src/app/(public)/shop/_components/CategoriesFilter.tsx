"use client"

import { useState } from "react"
import { ChevronDown, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { navigationData } from "@/lib/navigation-data"
import { useSearchParams } from "next/navigation"

interface CategoryDropdownProps {
  selectedCategory?: string
  selectedSubcategory?: string
  selectedItem?: string
  onSelectionChange?: (item: string) => void
}

export default function CategoriesFilter({
  selectedItem: propSelectedItem = "",
  onSelectionChange,
}: CategoryDropdownProps) {
  const [openDropdown, setOpenDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Local state for selected item
  const [selectedItem, setSelectedItem] = useState(propSelectedItem)

  const selectedCategory = useSearchParams().get("category")
  const selectedSubcategory = useSearchParams().get("subCategory")

  // Get the current category data
  const categoryData = selectedCategory ? navigationData[selectedCategory as keyof typeof navigationData] : null

  const handleItemSelect = (item: string) => {
    setSelectedItem(item)
    onSelectionChange?.(item)
    setOpenDropdown(false) // Close dropdown after selection
  }

  const clearSelection = () => {
    setSelectedItem("")
    onSelectionChange?.("")
  }

  const getDropdownContent = () => {
    // If no category selected, show message
    if (!selectedCategory || !categoryData) {
      return <div className="p-4 text-center text-muted-foreground">Please select a main category first</div>
    }

    // If category selected but no subcategory, show subcategories with icons
    if (!selectedSubcategory) {
      return (
        <div className="max-h-64 overflow-y-auto">
          {categoryData.subcategories.map((subcategory) => (
            <div key={subcategory.id} className="flex items-center space-x-3 p-3 hover:bg-muted/50 cursor-pointer">
              <div className="flex items-center gap-3 flex-1">
                {subcategory.icon && <subcategory.icon className="h-4 w-4" />}
                <span className="text-sm">{subcategory.name}</span>
              </div>
            </div>
          ))}
        </div>
      )
    }

    // If both category and subcategory selected, show items
    const subcategoryData = categoryData.subcategories.find((sub) => sub.id === selectedSubcategory)

    if (!subcategoryData || subcategoryData.categories.length === 0) {
      return <div className="p-4 text-center text-muted-foreground">No items available for this selection</div>
    }

    // Get all items from all categories
    const allItems = subcategoryData.categories.flatMap((category) => category.items)

    // Filter items based on search
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
          {filteredItems.map((item, index) => (
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
          ))}
          {filteredItems.length === 0 && <div className="p-4 text-center text-muted-foreground">No items found</div>}
        </div>
      </>
    )
  }

  const getDropdownTriggerText = () => {
    return "Category"
  }

  return (
    <div className="w-full">
      {/* Category Dropdown */}
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

      {/* Selected Item Display */}
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
