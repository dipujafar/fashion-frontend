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

export function StatusFilterSelect({ options, searchParamsKey, defaultValue, label }: { options: SortOption[], searchParamsKey: string, defaultValue: string, label: string }) {
  const searchParams = useSearchParams()
  const updateparams = useUpdateSearchParams();

  const selectedSort = searchParams.get(searchParamsKey) ?? defaultValue

  const selectedOption = options.find((option) => option.id === selectedSort)

  const handleSelect = (value: string) => {
    updateparams({ [searchParamsKey]: value })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between bg-transparent hover:bg-gray-50 duration-150 border-none shadow-none cursor-pointer">
          <span className="flex items-center gap-2">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium">{selectedOption?.label}</span>
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" p-0 rounded-none space-y-1">

        {options.map((option) => (
          <DropdownMenuItem key={option.id} onClick={() => handleSelect(option.id)} className="p-0">
            <button
              className="w-full flex items-center justify-between p-3 hover:bg-accent transition-colors text-left cursor-pointer"
            >
              <span className="text-sm font-medium">{option.label}</span>
              <div className="relative">
                <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center ml-3">
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


export default StatusFilterSelect