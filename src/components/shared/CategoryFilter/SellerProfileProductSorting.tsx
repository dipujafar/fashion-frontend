"use client"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams"
import { useSearchParams } from "next/navigation"

type SortOption = {
  id: string
  label: string
}

const sortOptions: SortOption[] = [
  { id: "newest", label: "Newest first" },
  // { id: "relevance", label: "Relevance" },
  { id: "price", label: "Price: high to low" },
  { id: "-price", label: "Price: low to high" }
]

export function SellerProfileProductSorting() {
  const searchParams = useSearchParams()
  const updateparams = useUpdateSearchParams();

  const selectedSort = searchParams.get("sortBy") ?? "newest"

  const selectedOption = sortOptions.find((option) => option.id === selectedSort)

  const handleSelect = (sortBy: string) => {
    updateparams({ sortBy })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between bg-transparent hover:bg-gray-50 duration-150 border-none shadow-none cursor-pointer">
          <span className="flex items-center gap-2">
            <span className="text-muted-foreground">Sort by</span>
            <span className="font-medium">{selectedOption?.label}</span>
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] p-0 rounded-none space-y-1">

        {sortOptions.map((option) => (
          <DropdownMenuItem key={option.id} onClick={() => handleSelect(option.id)} className="p-0">
            <button
              className="w-full flex items-center justify-between p-3 hover:bg-accent transition-colors text-left cursor-pointer"
            >
              <span className="text-sm font-medium">{option.label}</span>
              <div className="relative">
                <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
                  {selectedSort === option.id && <div className="w-2 h-2 rounded-full bg-black" />}
                </div>
              </div>
            </button>
          </DropdownMenuItem>
        ))}

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
