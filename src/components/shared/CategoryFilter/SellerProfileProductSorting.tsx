"use client"
import { ArrowDownUp, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

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

  const selectedSort = searchParams.get("sortBy")

  const selectedOption = sortOptions.find((option) => option.id === selectedSort)

  const handleSelect = (sortBy: string) => {
    updateparams({ sortBy })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>

        <Button variant="outline" className={cn("justify-between hover:bg-zinc-50 duration-150 border border-gray-300 shadow-none cursor-pointer rounded px-2.5 h-8", selectedOption && "border-gray-700")}>
          <ArrowDownUp />
          <span className="flex items-center gap-2">
            <span className={cn("text-foreground text-sm font-normal", selectedOption && "font-semibold")}>Sort</span>
          </span>
        </Button>

      </DropdownMenuTrigger>
      <DropdownMenuContent className=" p-0 rounded-none min-w-48" align="end">

        {sortOptions.map((option) => {
          const isChecked = selectedSort === option.id

          return (
            <div key={option.id} onClick={() => handleSelect(option.id)} className="p-0 border-b border-gray-200 last:border-b-0">
              <button
                className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-accent transition-colors text-left cursor-pointer">

                <p className="text-sm">{option?.label}</p>


                <Checkbox className='rounded-xs border-gray-500 data-[state=checked]:text-white' checked={isChecked} />
              </button>
            </div>
          )
        })}

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
