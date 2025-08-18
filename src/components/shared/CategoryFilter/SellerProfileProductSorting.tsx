"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type SortOption = {
  id: string
  label: string
}

const sortOptions: SortOption[] = [
  { id: "relevance", label: "Relevance" },
  { id: "price-high-low", label: "Price: high to low" },
  { id: "price-low-high", label: "Price: low to high" },
  { id: "newest", label: "Newest first" },
]

export function SellerProfileProductSorting() {
  const [selectedSort, setSelectedSort] = useState("price-high-low")

  const selectedOption = sortOptions.find((option) => option.id === selectedSort)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between bg-background hover:bg-accent border-none">
          <span className="flex items-center gap-2">
            <span className="text-muted-foreground">Sort by</span>
            <span className="font-medium">{selectedOption?.label}</span>
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] p-0">
        <div className="p-2 space-y-1">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedSort(option.id)}
              className="w-full flex items-center justify-between p-3 rounded-md hover:bg-accent transition-colors text-left"
            >
              <span className="text-sm font-medium">{option.label}</span>
              <div className="relative">
                <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
                  {selectedSort === option.id && <div className="w-2 h-2 rounded-full bg-teal-600" />}
                </div>
              </div>
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
